var _lightboxKeyHandler = null;

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initLangToggle();

  if (typeof APPS !== "undefined") {
    renderPage();
  }
});

function renderPage() {
  if (document.getElementById("appDetail")) {
    renderDetailPage();
  } else {
    renderHomePage();
  }
}

function initTheme() {
  var saved = getTheme();
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  document.getElementById("themeToggle").addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.innerHTML = theme === "dark"
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
}

function initLangToggle() {
  var btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.textContent = getLang().toUpperCase();

  btn.addEventListener("click", function () {
    var next = getLang() === "en" ? "fr" : "en";
    setLang(next);
    btn.textContent = next.toUpperCase();
    document.documentElement.lang = next;
    renderPage();
  });
}

function applyCommonI18n() {
  var footerRights = document.getElementById("footerRights");
  var footerBuilt = document.getElementById("footerBuilt");
  if (footerRights) footerRights.textContent = "\u00a9 " + new Date().getFullYear() + " Sama Apps. " + t("footer_rights");
  if (footerBuilt) footerBuilt.textContent = t("footer_built");
}

function priceLabel(app) {
  return app.price === "free" ? t("free") : t("paid");
}

function priceBadgeClass(app) {
  return app.price === "free" ? "badge--free" : "badge--paid";
}

function categoryLabel(cat) {
  var map = { Business: "business", Productivity: "productivity", Utility: "utility" };
  return t(map[cat] || cat.toLowerCase());
}

/* ===== LIVE VERSIONS (from remote config Gists) ===== */
var _liveVersions = {};

function fetchLiveVersion(appId, callback) {
  if (typeof REMOTE_CONFIGS === "undefined") return;
  if (_liveVersions[appId]) { callback(_liveVersions[appId]); return; }

  var cfg = REMOTE_CONFIGS.find(function (c) { return c.id === appId; });
  if (!cfg) return;

  fetch(cfg.url + "?t=" + Date.now())
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (data && data.latest_version) {
        _liveVersions[appId] = data.latest_version;
        callback(data.latest_version);
      }
    })
    .catch(function () {});
}

/* ===== USER STATS ===== */
var _userCounts = {};
var _userCountsLoaded = false;

function fetchUserStats(callback) {
  if (typeof GIST_SOURCES === "undefined") return;

  if (_userCountsLoaded) {
    if (callback) callback(_userCounts);
    return;
  }

  var promises = GIST_SOURCES.map(function (src) {
    var url = "https://api.github.com/gists/" + src.gistId;
    return fetch(url)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (gist) {
        if (!gist || !gist.files || !gist.files[src.file]) return { id: src.id, count: 0 };
        try {
          var data = JSON.parse(gist.files[src.file].content);
          return { id: src.id, count: Array.isArray(data) ? data.length : 0 };
        } catch (_) { return { id: src.id, count: 0 }; }
      })
      .catch(function () { return { id: src.id, count: 0 }; });
  });

  Promise.all(promises).then(function (results) {
    results.forEach(function (r) { _userCounts[r.id] = r.count; });
    _userCountsLoaded = true;
    if (callback) callback(_userCounts);
  });
}

function renderStatsBanner(counts) {
  var banner = document.getElementById("statsBanner");
  var bannerText = document.getElementById("statsBannerText");
  if (!banner || !bannerText) return;

  var total = 0;
  for (var k in counts) total += counts[k];
  if (total > 0) {
    bannerText.textContent = t("trusted_by").replace("{count}", total);
    banner.hidden = false;
  }
}

function userBadgeHtml(appId) {
  var count = _userCounts[appId];
  if (!count || count <= 0) return "";
  return '<span class="app-card__users"><i class="bi bi-people-fill"></i> ' + count + ' ' + t("users") + '</span>';
}

/* ===== SHARED HELPERS ===== */
function statusBadgeHtml(app) {
  if (app.status === "dev") return '<span class="badge badge--dev"><i class="bi bi-lock-fill"></i> ' + t("in_development") + '</span>';
  if (app.status === "sold") return '<span class="badge badge--sold"><i class="bi bi-check-circle-fill"></i> ' + t("deployed") + '</span>';
  return "";
}

function appIconHtml(app, prefix) {
  if (app.status === "dev") {
    return '<div class="' + prefix + '__icon-wrap ' + prefix + '__icon-wrap--dev"><img class="' + prefix + '__icon" src="' + app.icon + '" alt="' + app.name + '" /><i class="bi bi-lock-fill ' + prefix + '__lock"></i></div>';
  }
  return '<img class="' + prefix + '__icon" src="' + app.icon + '" alt="' + app.name + '" />';
}

/* ===== HOME PAGE ===== */
function renderHomePage() {
  applyCommonI18n();
  renderStatsBanner(_userCounts);

  var heroTitle = document.getElementById("heroTitle");
  var heroSubtitle = document.getElementById("heroSubtitle");
  var searchInput = document.getElementById("searchInput");
  var searchInputMobile = document.getElementById("searchInputMobile");
  var filtersEl = document.getElementById("filters");
  var grid = document.getElementById("appGrid");
  var emptyState = document.getElementById("emptyState");

  if (heroTitle) heroTitle.innerHTML = t("hero_title");
  if (heroSubtitle) heroSubtitle.textContent = t("hero_subtitle");
  if (searchInput) searchInput.placeholder = t("search_placeholder");
  if (searchInputMobile) searchInputMobile.placeholder = t("search_placeholder");
  if (emptyState) emptyState.textContent = t("no_apps");

  var categories = ["all", "Business", "Productivity", "Utility"];
  var catLabels = {
    all: t("all"),
    Business: t("business"),
    Productivity: t("productivity"),
    Utility: t("utility")
  };

  if (filtersEl) {
    filtersEl.innerHTML = categories.map(function (c, i) {
      var cls = i === 0 ? "filter-btn active" : "filter-btn";
      return '<button class="' + cls + '" data-filter="' + c + '">' + catLabels[c] + "</button>";
    }).join("");
  }

  var activeFilter = "all";

  function getSearchQuery() {
    if (searchInput && searchInput.value.trim()) return searchInput.value.toLowerCase().trim();
    if (searchInputMobile && searchInputMobile.value.trim()) return searchInputMobile.value.toLowerCase().trim();
    return "";
  }

  function renderCards() {
    var query = getSearchQuery();
    var filtered = APPS.filter(function (app) {
      var matchFilter = activeFilter === "all" || app.category === activeFilter;
      var name = app.name.toLowerCase();
      var tagline = tApp(app, "tagline").toLowerCase();
      var desc = tApp(app, "shortDesc").toLowerCase();
      var matchQuery = !query || name.indexOf(query) !== -1 || tagline.indexOf(query) !== -1 || desc.indexOf(query) !== -1;
      return matchFilter && matchQuery;
    });

    if (grid) {
      grid.innerHTML = filtered.map(function (app) {
        var statusBadge = statusBadgeHtml(app);
        var iconHtml = appIconHtml(app, "app-card");
        return '<a href="app.html?id=' + app.id + '" class="app-card">' +
          userBadgeHtml(app.id) +
          iconHtml +
          '<div class="app-card__body">' +
            '<h3 class="app-card__name">' + app.name + '</h3>' +
            '<p class="app-card__tagline">' + tApp(app, "tagline") + '</p>' +
            '<p class="app-card__desc">' + tApp(app, "shortDesc") + '</p>' +
            '<div class="app-card__meta">' +
              '<span class="badge badge--category">' + categoryLabel(app.category) + '</span>' +
              '<span class="badge ' + priceBadgeClass(app) + '">' + priceLabel(app) + '</span>' +
              statusBadge +
            '</div>' +
          '</div>' +
        '</a>';
      }).join("");
    }

    if (emptyState) emptyState.hidden = filtered.length > 0;
  }

  if (filtersEl) {
    filtersEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filtersEl.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderCards();
    });
  }

  var timer;
  function onSearchInput() {
    clearTimeout(timer);
    timer = setTimeout(renderCards, 200);
  }

  if (searchInput) searchInput.addEventListener("input", onSearchInput);
  if (searchInputMobile) searchInputMobile.addEventListener("input", onSearchInput);

  renderCards();

  if (!_userCountsLoaded) {
    fetchUserStats(function (counts) {
      renderStatsBanner(counts);
      renderCards();
    });
  }
}

function normalizeVideos(app) {
  if (app.videos && app.videos.length > 0) return app.videos;
  if (app.videoUrl) {
    return [{ url: app.videoUrl, title: app.videoTitle || "", title_fr: app.videoTitle_fr || "" }];
  }
  return [];
}

/* ===== DETAIL PAGE ===== */
function renderDetailPage() {
  applyCommonI18n();

  var backLink = document.getElementById("backLink");
  if (backLink) {
    var span = backLink.querySelector("span");
    if (span) span.textContent = t("back");
  }

  var params = new URLSearchParams(window.location.search);
  var appId = params.get("id");
  var app = null;

  for (var i = 0; i < APPS.length; i++) {
    if (APPS[i].id === appId) { app = APPS[i]; break; }
  }

  var detail = document.getElementById("appDetail");

  if (!app) {
    if (detail) {
      detail.innerHTML =
        '<div class="container" style="text-align:center;padding:80px 0;">' +
          '<h2>' + t("app_not_found") + '</h2>' +
          '<p style="color:var(--text-muted);margin:12px 0 24px;">' + t("app_not_found_desc") + '</p>' +
          '<a href="index.html" class="btn btn--primary"><i class="bi bi-arrow-left"></i> ' + t("back_to_store") + '</a>' +
        '</div>';
    }
    return;
  }

  document.title = app.name + " | Sama Apps";

  renderHero(app);
  initCopyLink(app);
  renderMedia(app);
  renderContent(app);
  renderDetailSidebar(app);
  initLightbox(app);
}

function renderHero(app) {
  var downloadBtn = app.downloadUrl
    ? '<a href="' + app.downloadUrl + '" target="_blank" class="btn btn--primary"><i class="bi bi-download"></i> ' + t("download_apk") + '</a>'
    : "";
  var baseUrl = window.location.origin + window.location.pathname.replace("app.html", "");
  var shareUrl = baseUrl + "apps/" + app.id + "/";
  var shareBtn = '<button class="btn btn--share" id="copyLinkBtn" data-url="' + shareUrl + '"><i class="bi bi-link-45deg"></i> ' + t("copy_link") + '</button>';
  var statusBadge = statusBadgeHtml(app);
  var heroIconHtml = appIconHtml(app, "app-hero");

  var heroEl = document.getElementById("appHero");
  if (heroEl) {
    heroEl.innerHTML =
      heroIconHtml +
      '<div class="app-hero__info">' +
        '<h1 class="app-hero__name">' + app.name + '</h1>' +
        '<p class="app-hero__tagline">' + tApp(app, "tagline") + '</p>' +
        '<div class="app-hero__badges">' +
          '<span class="badge badge--category">' + categoryLabel(app.category) + '</span>' +
          '<span class="badge ' + priceBadgeClass(app) + '">' + priceLabel(app) + '</span>' +
          statusBadge +
        '</div>' +
        '<div class="app-hero__actions">' + downloadBtn + shareBtn + '</div>' +
      '</div>';
  }
}

function initCopyLink() {
  var copyBtn = document.getElementById("copyLinkBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", function () {
    var url = copyBtn.dataset.url;
    navigator.clipboard.writeText(url).then(function () {
      copyBtn.innerHTML = '<i class="bi bi-check-lg"></i> ' + t("copied");
      setTimeout(function () {
        copyBtn.innerHTML = '<i class="bi bi-link-45deg"></i> ' + t("copy_link");
      }, 2000);
    });
  });
}

function renderMedia(app) {
  var trialBanner = document.getElementById("trialBanner");
  if (trialBanner && (app.trialBadge || app.trialBadge_fr)) {
    var trialText = (getLang() === "fr" && app.trialBadge_fr) ? app.trialBadge_fr : (app.trialBadge || "");
    if (trialText) {
      trialBanner.hidden = false;
      trialBanner.innerHTML = '<span class="trial-icon">🎁</span><span class="trial-text">' + trialText + '</span>';
    }
  }

  var videosSection = document.getElementById("videosSection");
  var videoList = normalizeVideos(app);
  if (videosSection && videoList.length > 0) {
    videosSection.hidden = false;
    videosSection.innerHTML = videoList.map(function (v, idx) {
      var vTitle = (getLang() === "fr" && v.title_fr) ? v.title_fr : (v.title || t("video_demo"));
      var vimeoId = v.url.replace("https://player.vimeo.com/video/", "").split("?")[0];
      var fsLabel = t("video_fullscreen");
      return '<div class="app-video">' +
        '<div class="app-video__header">' +
          '<h3>' + t("video_demo") + " " + (idx + 1) + ": " + vTitle + '</h3>' +
          '<a href="https://vimeo.com/' + vimeoId + '" target="_blank" rel="noopener" class="btn-fullscreen">' +
            '<i class="bi bi-fullscreen"></i> <span>' + fsLabel + '</span>' +
          '</a>' +
        '</div>' +
        '<div class="video-wrapper">' +
          '<iframe src="' + v.url + '?title=0&byline=0&portrait=0&color=4CAF50&playsinline=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; web-share" allowfullscreen webkitallowfullscreen mozallowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy" title="' + vTitle + '"></iframe>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  if (app.screenshots && app.screenshots.length > 0) {
    var ssSection = document.getElementById("screenshotsSection");
    var ssTitle = document.getElementById("screenshotsTitle");
    var ssTrack = document.getElementById("screenshotsTrack");
    if (ssSection && ssTrack) {
      if (ssTitle) ssTitle.textContent = t("screenshots");
      ssSection.hidden = false;
      ssTrack.innerHTML = app.screenshots.map(function (src, idx) {
        return '<div class="screenshot-item" data-index="' + idx + '"><img src="' + src + '" alt="' + app.name + ' ' + (idx + 1) + '" loading="lazy" /></div>';
      }).join("");
    }
  }
}

function renderContent(app) {
  var aboutTitle = document.getElementById("aboutTitle");
  var appDesc = document.getElementById("appDescription");
  if (aboutTitle) aboutTitle.textContent = t("about");
  if (appDesc) appDesc.textContent = tApp(app, "description");

  var featTitle = document.getElementById("featuresTitle");
  var featList = document.getElementById("featuresList");
  if (featTitle) featTitle.textContent = t("features");
  if (featList) {
    var features = tApp(app, "features");
    featList.innerHTML = features.map(function (f) {
      return '<li><span>' + f + '</span></li>';
    }).join("");
  }
}

function renderDetailSidebar(app) {
  var sidebarInfo = document.getElementById("sidebarInfo");
  if (sidebarInfo) {
    sidebarInfo.innerHTML =
      '<h4>' + t("information") + '</h4>' +
      '<div class="sidebar-row"><span class="sidebar-row__label">' + t("developer") + '</span><span class="sidebar-row__value">' + app.developer + '</span></div>' +
      '<div class="sidebar-row"><span class="sidebar-row__label">' + t("version") + '</span><span class="sidebar-row__value" id="sidebarVersion">' + app.version + '</span></div>' +
      '<div class="sidebar-row"><span class="sidebar-row__label">' + t("category") + '</span><span class="sidebar-row__value">' + categoryLabel(app.category) + '</span></div>' +
      '<div class="sidebar-row"><span class="sidebar-row__label">' + t("price") + '</span><span class="sidebar-row__value">' + priceLabel(app) + '</span></div>' +
      '<div class="sidebar-row"><span class="sidebar-row__label">' + t("languages") + '</span><span class="sidebar-row__value">' + app.languages.join(", ") + '</span></div>' +
      '<div class="sidebar-row" id="sidebarUsers" hidden><span class="sidebar-row__label">' + t("active_users") + '</span><span class="sidebar-row__value" id="sidebarUsersCount"></span></div>';
  }

  fetchUserStats(function (counts) {
    var count = counts[app.id];
    if (count && count > 0) {
      var row = document.getElementById("sidebarUsers");
      var val = document.getElementById("sidebarUsersCount");
      if (row && val) {
        val.innerHTML = '<span class="user-count-value"><i class="bi bi-people-fill"></i> ' + count + '</span>';
        row.hidden = false;
      }
      var badges = document.querySelector(".app-hero__badges");
      if (badges && !badges.querySelector(".badge--users")) {
        var badge = document.createElement("span");
        badge.className = "badge badge--users";
        badge.innerHTML = '<i class="bi bi-people-fill"></i> ' + t("used_by").replace("{count}", count);
        badges.appendChild(badge);
      }
    }
  });

  fetchLiveVersion(app.id, function (version) {
    var el = document.getElementById("sidebarVersion");
    if (el) el.textContent = version;
  });

  if (app.tiers && app.tiers.length > 0) {
    var tiersEl = document.getElementById("sidebarTiers");
    if (tiersEl) {
      tiersEl.hidden = false;
      var lang = getLang();
      tiersEl.innerHTML = '<h4>' + t("subscription_tiers") + '</h4>' +
        app.tiers.map(function (tier) {
          var desc = (lang === "fr" && tier.desc_fr) ? tier.desc_fr : tier.desc;
          return '<div class="tier-item"><div class="tier-item__name">' + tier.name + '</div><div class="tier-item__desc">' + desc + '</div></div>';
        }).join("");
    }
  }

  if (app.legal) {
    var legalEl = document.getElementById("sidebarLegal");
    if (legalEl) {
      legalEl.hidden = false;
      legalEl.innerHTML =
        '<a href="legal.html?id=' + app.id + '&page=privacy" class="legal-link"><i class="bi bi-shield-lock"></i> ' + t("privacy_policy") + '</a>' +
        '<a href="legal.html?id=' + app.id + '&page=terms" class="legal-link"><i class="bi bi-file-earmark-text"></i> ' + t("terms_of_service") + '</a>' +
        '<a href="apps/' + app.id + '/guide.html" class="legal-link"><i class="bi bi-book"></i> ' + t("user_guide") + '</a>';
    }
  }
}

function initLightbox(app) {
  if (!app.screenshots || app.screenshots.length === 0) return;

  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var currentIdx = 0;

  function openLb(i) {
    currentIdx = i;
    lbImg.src = app.screenshots[currentIdx];
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLb() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function navLb(dir) {
    currentIdx = (currentIdx + dir + app.screenshots.length) % app.screenshots.length;
    lbImg.src = app.screenshots[currentIdx];
  }

  document.querySelectorAll(".screenshot-item").forEach(function (el) {
    el.addEventListener("click", function () {
      openLb(parseInt(el.dataset.index, 10));
    });
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLb);
  document.getElementById("lightboxPrev").addEventListener("click", function () { navLb(-1); });
  document.getElementById("lightboxNext").addEventListener("click", function () { navLb(1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });

  if (_lightboxKeyHandler) document.removeEventListener("keydown", _lightboxKeyHandler);
  _lightboxKeyHandler = function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") navLb(-1);
    if (e.key === "ArrowRight") navLb(1);
  };
  document.addEventListener("keydown", _lightboxKeyHandler);
}
