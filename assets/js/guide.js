var _guideActiveSection = "";
var _guideChapterIds = [];

function guideBuildTocNav(chapters, activeId) {
  var nav = "";
  for (var i = 0; i < chapters.length; i++) {
    var cls = activeId === chapters[i].id ? " active" : "";
    nav += '<button type="button" class="toc-btn' + cls + '" data-target="' + chapters[i].id + '"><span class="toc-num">' + (i + 1) + ".</span>" + chapters[i].title + "</button>";
  }
  return nav;
}

function guideRenderSidebar(g, activeId) {
  var sb = document.getElementById("sidebarToc");
  if (!sb) return;
  sb.innerHTML = '<div class="guide-sidebar-card"><div class="guide-sidebar-header"><h3><i class="bi bi-list"></i> ' + g.toc_title + '</h3><button type="button" onclick="window.print()" aria-label="PDF"><i class="bi bi-download"></i></button></div><nav class="toc-nav">' + guideBuildTocNav(g.chapters, activeId) + "</nav></div>";
}

function guideRenderMobileToc(g, activeId) {
  var mc = document.getElementById("tocModalContent");
  if (!mc) return;
  mc.innerHTML = '<div class="toc-modal-header"><h3>' + g.toc_title + '</h3><button type="button" id="tocModalClose" aria-label="Close"><i class="bi bi-x-lg"></i></button></div><nav class="toc-nav">' + guideBuildTocNav(g.chapters, activeId) + "</nav>";
}

function guideUpdateActiveToc(newId) {
  if (newId === _guideActiveSection) return;
  _guideActiveSection = newId;
  document.querySelectorAll(".toc-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-target") === newId);
  });
}

function guideGetElementPageTop(el) {
  var top = 0;
  while (el) { top += el.offsetTop; el = el.offsetParent; }
  return top;
}

function guideScrollToChapter(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var top = guideGetElementPageTop(el) - 100;
  window.scrollTo({ top: top, behavior: "smooth" });
  document.getElementById("tocModal").classList.remove("open");
}

function guideInitScrollSpy() {
  var ticking = false;
  window.addEventListener("scroll", function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var scrollY = window.scrollY;
      document.getElementById("backTopBtn").classList.toggle("visible", scrollY > 500);
      var pos = scrollY + 150;
      for (var i = _guideChapterIds.length - 1; i >= 0; i--) {
        var chapterEl = document.getElementById(_guideChapterIds[i]);
        if (chapterEl && guideGetElementPageTop(chapterEl) <= pos) {
          guideUpdateActiveToc(_guideChapterIds[i]);
          break;
        }
      }
      ticking = false;
    });
  });
}

function guideInitTocInteractions() {
  document.addEventListener("click", function(e) {
    var btn = e.target.closest(".toc-btn");
    if (btn) { e.preventDefault(); guideScrollToChapter(btn.getAttribute("data-target")); return; }
    if (e.target.closest("#tocFab")) { document.getElementById("tocModal").classList.add("open"); return; }
    if (e.target.closest("#backTopBtn")) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (e.target.closest("#tocModalClose")) { document.getElementById("tocModal").classList.remove("open"); return; }
    if (e.target.id === "tocModal") { document.getElementById("tocModal").classList.remove("open"); }
  });
}

/**
 * Render a guide page.
 * @param {object} opts - { G, icon, langs, backLabel }
 *   G: { en: { title, subtitle, download_pdf, toc_title, chapters }, fr: {...}, ... }
 *   icon: relative path to app icon for the guide header
 *   langs: array of language codes supported, e.g. ["en","fr"] or ["en","fr","sw"]
 *   langLabels: optional map { en:"English", fr:"Français", sw:"Kiswahili" }
 */
function guideRender(opts) {
  var G = opts.G;
  var icon = opts.icon;
  var langs = opts.langs || ["en", "fr"];
  var langLabels = opts.langLabels || { en: "English", fr: "Fran\u00e7ais", sw: "Kiswahili" };

  var bl = document.getElementById("backLabel");
  if (bl && typeof t === "function") bl.textContent = t("back");

  var params = new URLSearchParams(window.location.search);
  var forceLang = params.get("lang");
  if (forceLang && G[forceLang]) setLang(forceLang);

  var lang = getLang();
  if (!G[lang]) lang = "en";
  var g = G[lang];
  var guideEl = document.getElementById("guideContent");
  if (!guideEl) return;

  _guideChapterIds = g.chapters.map(function(ch) { return ch.id; });

  var h = '<div class="guide-meta"><img src="' + icon + '" width="32" height="32" alt="" loading="lazy" decoding="async" /><span>' + g.title + "</span></div>";
  h += "<h1>" + g.title + "</h1>";
  h += '<p style="color:var(--text-muted);margin-bottom:20px">' + g.subtitle + "</p>";

  h += '<div class="lang-tabs">';
  langs.forEach(function(l) {
    var label = langLabels[l] || l.toUpperCase();
    h += '<a href="?lang=' + l + '" class="lang-tab' + (lang === l ? " active" : "") + '">' + label + "</a>";
  });
  h += "</div>";

  h += '<div class="guide-download">';
  h += '<a href="#" onclick="window.print();return false;" class="dl-btn"><i class="bi bi-file-earmark-pdf"></i> ' + g.download_pdf + " (" + lang.toUpperCase() + ")</a>";
  h += "</div>";

  for (var i = 0; i < g.chapters.length; i++) {
    var ch = g.chapters[i];
    h += '<div class="guide-chapter" id="' + ch.id + '">';
    h += '<h2><span class="num">' + (i + 1) + "</span> " + ch.title + "</h2>";
    for (var j = 0; j < ch.sections.length; j++) {
      var s = ch.sections[j];
      h += '<div class="guide-section"><h3>' + s.title + "</h3>" + s.html + "</div>";
    }
    h += "</div>";
  }
  guideEl.innerHTML = h;

  _guideActiveSection = _guideChapterIds[0] || "";
  guideRenderSidebar(g, _guideActiveSection);
  guideRenderMobileToc(g, _guideActiveSection);
}

function guideInit(opts) {
  document.addEventListener("DOMContentLoaded", function() {
    guideRender(opts);
    guideInitScrollSpy();
    guideInitTocInteractions();
  });
}
