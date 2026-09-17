/**
 * Site availability gate — fetches sama_killswitch.json (≤1s).
 * Checks sites.<key>.enabled only (optional top-level enabled still honored).
 * Fail-open on timeout/error/missing data.
 */
(function () {
  "use strict";

  const SITE_KEY = "apps";
  const GIST_URL =
    "https://gist.githubusercontent.com/Sama-ndari/f8862a3c7b0415485dd35b6d8efd31e2/raw/sama_killswitch.json";
  const TIMEOUT_MS = 1000;
  const LANG_KEY = "sama-lang";
  const THEME_KEY = "sama-theme";
  const SCRIPT_EL = document.currentScript;

  const APP_META = {
    esama: { name: "E-Sama" },
    velora: { name: "Velora" },
    fabwash: { name: "FabWash" },
    notifspy: { name: "NotifSpy" }
  };

  const COPY = {
    en: {
      title: "Store temporarily offline",
      body: "Sama Apps is under maintenance. Come back soon to browse and download.",
      brand: "Sama Apps",
      pill: "Maintenance",
      appTitle: "Temporarily offline",
      appBody: " is under maintenance. Come back soon."
    },
    fr: {
      title: "Store temporairement hors ligne",
      body: "Sama Apps est en maintenance. Revenez bientôt pour parcourir et télécharger.",
      brand: "Sama Apps",
      pill: "Maintenance",
      appTitle: "Temporairement hors ligne",
      appBody: " est en maintenance. Revenez bientôt."
    }
  };

  const GATE_CSS =
    "#sama-access-gate{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;" +
    "padding:24px;font-family:Inter,system-ui,sans-serif;color:#e8ecf4;" +
    "background:radial-gradient(ellipse 80% 60% at 50% 0%,#152038 0%,#0b0f1a 55%)}" +
    "#sama-access-gate[data-theme=light]{color:#1a1f2e;" +
    "background:radial-gradient(ellipse 80% 60% at 50% 0%,#e8eefc 0%,#f4f6fb 55%)}" +
    "#sama-access-gate .gate-card{position:relative;max-width:420px;width:100%;padding:36px 32px 32px;" +
    "border-radius:20px;border:1px solid #24304a;background:rgba(20,25,37,.92);" +
    "box-shadow:0 24px 64px rgba(0,0,0,.45),0 0 0 1px rgba(59,130,246,.08);text-align:center;" +
    "backdrop-filter:blur(12px)}" +
    "#sama-access-gate[data-theme=light] .gate-card{border-color:#d5dced;background:rgba(255,255,255,.94);" +
    "box-shadow:0 24px 64px rgba(37,99,235,.1),0 0 0 1px rgba(37,99,235,.06)}" +
    "#sama-access-gate .gate-mark{display:block;margin:0 auto 18px;width:64px;height:64px;" +
    "object-fit:contain;background:transparent;box-shadow:none;border:0}" +
    "#sama-access-gate .gate-mark--store{border-radius:0;width:72px;height:auto;max-height:72px}" +
    "#sama-access-gate .gate-mark--app{border-radius:16px;object-fit:cover}" +
    "#sama-access-gate .gate-brand{margin:0 0 14px;font-size:.95rem;font-weight:700;letter-spacing:-.01em}" +
    "#sama-access-gate .gate-pill{display:inline-flex;align-items:center;gap:7px;margin-bottom:18px;" +
    "padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.08em;" +
    "text-transform:uppercase;color:#60a5fa;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.28)}" +
    "#sama-access-gate[data-theme=light] .gate-pill{color:#2563eb;background:rgba(37,99,235,.08);" +
    "border-color:rgba(37,99,235,.2)}" +
    "#sama-access-gate .gate-dot{width:7px;height:7px;border-radius:50%;background:#60a5fa;" +
    "box-shadow:0 0 0 0 rgba(96,165,250,.55);animation:samaGatePulse 1.6s ease-out infinite}" +
    "#sama-access-gate h1{font-size:1.45rem;font-weight:800;margin:0 0 10px;line-height:1.25;letter-spacing:-.02em}" +
    "#sama-access-gate .gate-body{margin:0;font-size:.95rem;line-height:1.6;color:#8892a8}" +
    "#sama-access-gate[data-theme=light] .gate-body{color:#5c6578}" +
    "@keyframes samaGatePulse{0%{box-shadow:0 0 0 0 rgba(96,165,250,.55)}70%{box-shadow:0 0 0 8px rgba(96,165,250,0)}100%{box-shadow:0 0 0 0 rgba(96,165,250,0)}}" +
    "@media (prefers-reduced-motion:reduce){#sama-access-gate .gate-dot{animation:none}}";

  const html = document.documentElement;
  html.classList.add("sama-gate-checking");

  function resolveAsset(relFromJsDir) {
    try {
      if (SCRIPT_EL && SCRIPT_EL.src) {
        return new URL(relFromJsDir, SCRIPT_EL.src).href;
      }
    } catch (error) {
      /* keep relative fallback */
    }
    return relFromJsDir;
  }

  function detectAppId() {
    const path = String(window.location.pathname || "").toLowerCase();
    const fromPath = path.match(/\/apps\/([a-z0-9_-]+)(?:\/|$)/);
    if (fromPath && APP_META[fromPath[1]]) return fromPath[1];
    try {
      const id = (new URLSearchParams(window.location.search).get("id") || "").toLowerCase();
      if (APP_META[id]) return id;
    } catch (error) {
      /* ignore bad search params */
    }
    return null;
  }

  function resolveGateContext(lang) {
    const base = COPY[lang] || COPY.en;
    const appId = detectAppId();
    if (appId) {
      const name = APP_META[appId].name;
      return {
        brand: name,
        title: base.appTitle,
        body: name + base.appBody,
        pill: base.pill,
        iconSrc: resolveAsset("../apps/" + appId + "/icon.webp"),
        favSrc: resolveAsset("../apps/" + appId + "/icon.webp"),
        markClass: "gate-mark gate-mark--app"
      };
    }
    return {
      brand: base.brand,
      title: base.title,
      body: base.body,
      pill: base.pill,
      iconSrc: resolveAsset("../img/logo.png"),
      favSrc: resolveAsset("../img/logo.png"),
      markClass: "gate-mark gate-mark--store"
    };
  }

  function ensureFavicon(href) {
    const head = document.head || document.documentElement;
    const stale = document.querySelectorAll(
      'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
    );
    for (let i = 0; i < stale.length; i++) {
      stale[i].parentNode.removeChild(stale[i]);
    }
    const icon = document.createElement("link");
    icon.setAttribute("rel", "icon");
    const mime =
      href.indexOf(".ico") >= 0
        ? "image/x-icon"
        : href.indexOf(".webp") >= 0
          ? "image/webp"
          : "image/png";
    icon.setAttribute("type", mime);
    icon.setAttribute("sizes", "any");
    icon.setAttribute("href", href + (href.indexOf("?") >= 0 ? "&" : "?") + "v=app");
    head.appendChild(icon);
    const apple = document.createElement("link");
    apple.setAttribute("rel", "apple-touch-icon");
    apple.setAttribute("href", href);
    head.appendChild(apple);
  }

  function applyProjectFavicon() {
    ensureFavicon(resolveGateContext(resolveLang()).favSrc);
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function resolveLang() {
    return readStorage(LANG_KEY) === "fr" ? "fr" : "en";
  }

  function isSiteAllowed(data) {
    if (!data || typeof data !== "object") return true;
    if (data.enabled === false) return false;
    const site = data.sites && data.sites[SITE_KEY];
    if (site && site.enabled === false) return false;
    return true;
  }

  function allowAccess() {
    html.classList.remove("sama-gate-checking", "sama-gate-blocked");
    applyProjectFavicon();
  }

  function buildOfflineMarkup(ctx) {
    return (
      "<style>" +
      GATE_CSS +
      "</style>" +
      '<div class="gate-card">' +
      '<img class="' +
      ctx.markClass +
      '" src="' +
      ctx.iconSrc +
      '" width="64" height="64" alt="">' +
      '<p class="gate-brand">' +
      ctx.brand +
      "</p>" +
      '<span class="gate-pill"><span class="gate-dot" aria-hidden="true"></span>' +
      ctx.pill +
      "</span>" +
      '<h1 id="sama-gate-title">' +
      ctx.title +
      "</h1>" +
      '<p class="gate-body">' +
      ctx.body +
      "</p></div>"
    );
  }

  function attachGate(root, fallbackIcon) {
    if (document.getElementById("sama-access-gate")) return;
    document.body.appendChild(root);
    document.body.style.overflow = "hidden";
    const img = root.querySelector(".gate-mark");
    if (img && fallbackIcon) {
      img.addEventListener("error", function onIconError() {
        img.removeEventListener("error", onIconError);
        img.src = fallbackIcon;
      });
    }
  }

  function mountOfflineUi() {
    html.classList.remove("sama-gate-checking");
    html.classList.add("sama-gate-blocked");
    const ctx = resolveGateContext(resolveLang());
    applyProjectFavicon();
    const theme = readStorage(THEME_KEY) === "light" ? "light" : "dark";
    const root = document.createElement("div");
    root.id = "sama-access-gate";
    root.setAttribute("role", "alertdialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "sama-gate-title");
    root.setAttribute("data-theme", theme);
    root.innerHTML = buildOfflineMarkup(ctx);
    const fallback = resolveAsset("../img/logo.png");
    if (document.body) attachGate(root, fallback);
    else document.addEventListener("DOMContentLoaded", function () {
      attachGate(root, fallback);
    });
  }

  function fetchAccessConfig() {
    const controller = new AbortController();
    const timer = setTimeout(function () {
      controller.abort();
    }, TIMEOUT_MS);
    return fetch(GIST_URL + "?t=" + Date.now(), {
      signal: controller.signal,
      cache: "no-store"
    })
      .then(function (response) {
        clearTimeout(timer);
        if (!response.ok) throw new Error("access-gate http " + response.status);
        return response.json();
      })
      .catch(function () {
        clearTimeout(timer);
        return null;
      });
  }

  applyProjectFavicon();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyProjectFavicon);
  } else {
    applyProjectFavicon();
  }
  // Re-assert after parse — HTML may inject store favicon after this script.
  window.setTimeout(applyProjectFavicon, 0);
  window.setTimeout(applyProjectFavicon, 100);

  fetchAccessConfig().then(function (data) {
    if (isSiteAllowed(data)) allowAccess();
    else mountOfflineUi();
  });
})();
