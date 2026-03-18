const I18N = {
  en: {
    hero_title: 'Quality apps,<br />built by <span class="hero__accent">indie devs</span>.',
    hero_subtitle: "Discover Android apps crafted with care. Download directly, no Play Store needed.",
    search_placeholder: "Search apps...",
    all: "All",
    business: "Business",
    productivity: "Productivity",
    utility: "Utility",
    no_apps: "No apps found.",
    screenshots: "Screenshots",
    about: "About this app",
    features: "Features",
    information: "Information",
    developer: "Developer",
    version: "Version",
    category: "Category",
    price: "Price",
    languages: "Languages",
    subscription_tiers: "Subscription Tiers",
    download_apk: "Download APK",
    back: "Back",
    footer_rights: "All apps are property of their respective developers.",
    footer_built: "Built by",
    free: "Free",
    paid: "Paid",
    app_not_found: "App not found",
    app_not_found_desc: "The app you're looking for doesn't exist.",
    back_to_store: "Back to store",
    in_development: "In Development",
    coming_soon: "Coming Soon",
    video_demo: "Demo Video",
    free_trial: "Free Trial",
    video_fullscreen: "Fullscreen",
    copy_link: "Copy Link",
    copied: "Copied!",
    trusted_by: "Trusted by {count} users across our apps",
    users: "users",
    used_by: "{count} active users",
    active_users: "Active Users"
  },
  fr: {
    hero_title: 'Des apps de qualit\u00e9,<br />par des <span class="hero__accent">devs ind\u00e9pendants</span>.',
    hero_subtitle: "D\u00e9couvrez des applications Android soign\u00e9es. T\u00e9l\u00e9chargez directement, pas besoin du Play Store.",
    search_placeholder: "Rechercher...",
    all: "Tout",
    business: "Business",
    productivity: "Productivit\u00e9",
    utility: "Utilitaire",
    no_apps: "Aucune application trouv\u00e9e.",
    screenshots: "Captures d'\u00e9cran",
    about: "\u00c0 propos",
    features: "Fonctionnalit\u00e9s",
    information: "Informations",
    developer: "D\u00e9veloppeur",
    version: "Version",
    category: "Cat\u00e9gorie",
    price: "Prix",
    languages: "Langues",
    subscription_tiers: "Abonnements",
    download_apk: "T\u00e9l\u00e9charger l'APK",
    back: "Retour",
    footer_rights: "Toutes les applications appartiennent \u00e0 leurs d\u00e9veloppeurs respectifs.",
    footer_built: "Cr\u00e9\u00e9 par",
    free: "Gratuit",
    paid: "Payant",
    app_not_found: "Application introuvable",
    app_not_found_desc: "L'application que vous cherchez n'existe pas.",
    back_to_store: "Retour au store",
    in_development: "En d\u00e9veloppement",
    coming_soon: "Bient\u00f4t disponible",
    video_demo: "Vid\u00e9o de d\u00e9mo",
    free_trial: "Essai gratuit",
    video_fullscreen: "Plein \u00e9cran",
    copy_link: "Copier le lien",
    copied: "Copi\u00e9 !",
    trusted_by: "Utilis\u00e9 par {count} utilisateurs sur nos apps",
    users: "utilisateurs",
    used_by: "{count} utilisateurs actifs",
    active_users: "Utilisateurs actifs"
  }
};

function safeStorage(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (_) {
    return null;
  }
}

let _lang = "en";
let _theme = "dark";

function getLang() {
  return safeStorage("sama-lang") || _lang;
}

function setLang(lang) {
  _lang = lang;
  safeStorage("sama-lang", lang);
}

function getTheme() {
  return safeStorage("sama-theme") || _theme;
}

function setTheme(theme) {
  _theme = theme;
  safeStorage("sama-theme", theme);
}

function t(key) {
  const lang = getLang();
  return I18N[lang]?.[key] || I18N.en[key] || key;
}

function tApp(app, field) {
  const lang = getLang();
  if (lang === "fr" && app[field + "_fr"]) {
    return app[field + "_fr"];
  }
  return app[field];
}
