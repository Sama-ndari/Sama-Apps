#!/usr/bin/env node
/**
 * Writes apps/<id>/privacy.html and apps/<id>/terms.html as fully static pages
 * (text in the HTML, no redirect, no JavaScript, no access gate) from
 * LEGAL_FULL in assets/js/legal-full.js.
 *
 * Why: Google's OAuth branding check reads the raw privacy-policy URL without
 * running JavaScript, so the redirect stubs looked empty to it.
 *
 * Usage: node scripts/generate-static-legal.js [appId ...]   (default: esama)
 * Re-run after every change to legal-full.js for those apps.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://apps.samandari.dev";
const LANG = "en";
const PAGES = {
  privacy: { title: "Privacy Policy", other: "terms" },
  terms: { title: "Terms of Service", other: "privacy" },
};
const LANGUAGE_NAMES = { en: "English", fr: "Français", sw: "Kiswahili" };

/** Loads APPS and LEGAL_FULL exactly as the browser sees them. */
function loadSiteData() {
  const context = {};
  vm.createContext(context);
  const read = (file) => fs.readFileSync(path.join(ROOT, "assets/js", file), "utf8");
  vm.runInContext(`${read("apps.js")}\n;this.APPS = APPS;`, context);
  vm.runInContext(`${read("legal-full.js")}\n;this.LEGAL_FULL = LEGAL_FULL;`, context);
  return { apps: context.APPS, legalFull: context.LEGAL_FULL };
}

/** Escapes bare ampersands / angle brackets but keeps the curated <a> links. */
function escapeText(text) {
  return text
    .replace(/&(?![a-z#0-9]+;)/gi, "&amp;")
    .replace(/<(?!\/?a[\s>])/g, "&lt;");
}

/** Same block rules as legal.html: blank line = paragraph, "•" lines = list. */
function formatContent(text) {
  return text.split("\n\n").map((block) => {
    const lines = block.split("\n").filter((line) => line.trim() !== "");
    const isList = lines.length > 0 && lines.every((line) => line.trim().startsWith("•"));
    if (!isList) return `<p>${escapeText(block).replace(/\n/g, "<br />")}</p>`;
    const items = lines.map((line) => `<li><span>${escapeText(line.replace(/^\s*•\s*/, ""))}</span></li>`);
    return `<ul>${items.join("")}</ul>`;
  }).join("\n");
}

function renderSections(doc) {
  return doc.sections.map((section) => [
    '<div class="legal-section">',
    `<h2>${escapeText(section.title[LANG] || section.title.en)}</h2>`,
    formatContent(section.content[LANG] || section.content.en),
    "</div>",
  ].join("\n")).join("\n");
}

function renderLanguageLinks(app, page, doc) {
  const langs = Object.keys(doc.intro).filter((lang) => lang !== LANG);
  if (langs.length === 0) return "";
  const links = langs.map((lang) =>
    `<a href="../../legal.html?id=${app.id}&amp;page=${page}&amp;lang=${lang}">${LANGUAGE_NAMES[lang] || lang}</a>`);
  return `<p class="legal-intro">Also available in: ${links.join(" · ")}</p>`;
}

function renderHead(app, page) {
  const title = `${PAGES[page].title} • ${app.name}`;
  return [
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `  <title>${escapeText(title)}</title>`,
    `  <meta name="description" content="${escapeText(title)} — ${escapeText(app.tagline)}" />`,
    `  <link rel="canonical" href="${SITE_URL}/apps/${app.id}/${page}.html" />`,
    '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />',
    '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />',
    '  <link rel="stylesheet" href="../../assets/css/base.css" />',
    '  <link rel="stylesheet" href="../../assets/css/components.css" />',
    '  <link rel="stylesheet" href="../../assets/css/legal.css" />',
    '  <link rel="stylesheet" href="../../assets/css/legal-page.css" />',
    "</head>",
  ].join("\n");
}

function renderHeader(app) {
  return `  <header class="header">
    <div class="container header__inner">
      <a href="../../index.html" class="header__logo">
        <img src="../../assets/img/logo.webp" alt="Sama Apps" class="header__logo-img" />
        <span>Sama Apps</span>
      </a>
      <nav class="header__nav">
        <a href="../../app.html?id=${app.id}" class="header__link header__link--back">
          <i class="bi bi-arrow-left"></i> <span>Back to ${escapeText(app.name)}</span>
        </a>
      </nav>
    </div>
  </header>`;
}

function renderMain(app, page, doc) {
  const otherPage = PAGES[page].other;
  return `  <main>
    <div class="legal-content">
      <div class="legal-meta">
        <div class="app-badge"><img src="../../${app.icon}" alt="${app.name}" /><span>${escapeText(app.name)}</span></div><br />
        <span>Effective date: ${app.legal.effectiveDate}</span>
      </div>
      <div class="legal-tabs">
        <a href="${page}.html" class="legal-tab active">${PAGES[page].title}</a>
        <a href="${otherPage}.html" class="legal-tab">${PAGES[otherPage].title}</a>
      </div>
      <h1>${PAGES[page].title}</h1>
      <p class="legal-intro">${escapeText(doc.intro[LANG] || doc.intro.en)}</p>
      ${renderLanguageLinks(app, page, doc)}
${renderSections(doc)}
    </div>
  </main>`;
}

function renderPage(app, page, doc) {
  const generatedNote = "<!-- Generated by scripts/generate-static-legal.js from assets/js/legal-full.js — do not edit by hand. -->";
  return `<!DOCTYPE html>
${generatedNote}
<html lang="${LANG}" data-theme="dark">
${renderHead(app, page)}
<body>
${renderHeader(app)}
${renderMain(app, page, doc)}
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__credit">Built by <a href="https://www.samandari.dev/" target="_blank" rel="noopener noreferrer">Samandari</a></p>
    </div>
  </footer>
</body>
</html>
`;
}

function main(appIds) {
  const { apps, legalFull } = loadSiteData();
  for (const appId of appIds) {
    const app = apps.find((candidate) => candidate.id === appId);
    if (!app || !legalFull[appId]) {
      throw new Error(`No APPS entry or LEGAL_FULL text for app id "${appId}"`);
    }
    for (const page of Object.keys(PAGES)) {
      const out = path.join(ROOT, "apps", appId, `${page}.html`);
      fs.writeFileSync(out, renderPage(app, page, legalFull[appId][page]));
      process.stdout.write(`wrote ${path.relative(ROOT, out)}\n`);
    }
  }
}

main(process.argv.length > 2 ? process.argv.slice(2) : ["esama"]);
