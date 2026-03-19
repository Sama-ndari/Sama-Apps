function appAsset(id, file) {
  return "assets/apps/" + id + "/" + file;
}

const GIST_SOURCES = [
  { id: "esama", gistId: "0250417d63c891faf03a52909d6010e4", file: "e_sama_admin_sync.json" },
  { id: "velora", gistId: "b806e5a54d4cf1a24b23ce2bfc4c5116", file: "velora_admin_sync.json" }
];

const APPS = [
  {
    id: "esama",
    name: "E-Sama",
    tagline: "Trilingual Business Management & POS",
    tagline_fr: "Gestion Business Trilingue & POS",
    developer: "Samandari",
    category: "Business",
    price: "paid",
    version: "1.0.0",
    languages: ["English", "Fran\u00e7ais", "Kiswahili"],
    icon: appAsset("esama", "icon.png"),
    screenshots: [
      appAsset("esama", "screenshots/1.png"),
      appAsset("esama", "screenshots/2.png"),
      appAsset("esama", "screenshots/3.png"),
      appAsset("esama", "screenshots/4.png"),
      appAsset("esama", "screenshots/5.png"),
      appAsset("esama", "screenshots/6.png"),
      appAsset("esama", "screenshots/7.png"),
      appAsset("esama", "screenshots/8.png"),
      appAsset("esama", "screenshots/9.png"),
      appAsset("esama", "screenshots/10.png"),
      appAsset("esama", "screenshots/11.png")
    ],
    videoUrl: "https://player.vimeo.com/video/1162754098",
    videoTitle: "Demo: How to add products",
    videoTitle_fr: "Demo: Enregistrement des produits",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1HhG-0U46eTxKDo74Wy1AdXYlABgmqzca",
    trialBadge: "1 month FREE trial",
    trialBadge_fr: "1 mois d\u2019essai GRATUIT",
    shortDesc: "Trilingual app (FR/EN/SW) for all your business types: shop, pharmacy, bar, restaurant, rental and more. Works fully offline.",
    shortDesc_fr: "Application trilingue (FR/EN/SW) pour tous vos business : boutique, pharmacie, bar, resto, location et plus. Fonctionne hors ligne.",
    description: "E-Sama is a trilingual (French, English, Kiswahili) business management app built for merchants in Burundi and East Africa. Whether you run a boutique, alimentation, pharmacy, depot, bar, restaurant, snack, or a rental business (equipment, events, sounds), E-Sama handles it all from your phone. The app works completely offline with no internet needed and lets you track sales, expenses, clients, stock, and profits in real time. Cloud backup to Google Drive keeps your data safe across devices. New users get a free 1-month trial.",
    description_fr: "E-Sama est une application trilingue (Fran\u00e7ais, Anglais, Kiswahili) de gestion pour les commer\u00e7ants au Burundi et en Afrique de l'Est. Que vous g\u00e9riez une boutique, alimentation, pharmacie, d\u00e9p\u00f4t, cabaret, bar, restaurant, snack ou une activit\u00e9 de location (imvutano, \u00e9v\u00e9nements, sons), E-Sama g\u00e8re tout depuis votre t\u00e9l\u00e9phone. L'app fonctionne enti\u00e8rement hors ligne sans internet n\u00e9cessaire et vous permet de suivre ventes, d\u00e9penses, clients, stock et profits en temps r\u00e9el. La sauvegarde cloud sur Google Drive prot\u00e8ge vos donn\u00e9es. Les nouveaux utilisateurs b\u00e9n\u00e9ficient d\u2019un essai gratuit d\u2019un mois.",
    features: [
      "Boutique, Alimentation, Pharmacy, Depot or Bar, Restaurant, Snack or Rental: equipment, events, sounds",
      "Track stock entries and exits by QR code scan, manage multiple price tiers (retail, wholesale, purchase)",
      "Record sales with invoices, track expenses, and see your net profit instantly",
      "Multi-payment: Cash, Mobile Money, Credit, and split payments in one transaction",
      "Manage client debts with WhatsApp reminders and a built-in loyalty points program",
      "Multi-store support: manage several boutiques from a single device",
      "Cloud backup to Google Drive and local backup so you can restore your data anytime",
      "Works fully offline \ud83d\udcf4 No internet required, all data stays encrypted on your phone",
      "Auto-reports: sales summary, inventory valuation, break-even tracking exported to PDF"
    ],
    features_fr: [
      "Boutique, Alimentation, Pharmacie, D\u00e9p\u00f4t ou Bar, Cabaret, Resto, Snack ou Location : imvutano, \u00e9v\u00e9nements, sons",
      "Suivez les entr\u00e9es et sorties de stock par scan QR code, g\u00e9rez plusieurs niveaux de prix (d\u00e9tail, gros, achat)",
      "Enregistrez les ventes avec factures, suivez les d\u00e9penses et visualisez votre b\u00e9n\u00e9fice net instantan\u00e9ment",
      "Multi-paiement : Cash, Mobile Money, Cr\u00e9dit et paiement fractionn\u00e9 en une transaction",
      "G\u00e9rez les dettes clients avec rappels WhatsApp et programme de fid\u00e9lit\u00e9 int\u00e9gr\u00e9",
      "Multi-boutiques : g\u00e9rez plusieurs magasins depuis un seul t\u00e9l\u00e9phone",
      "Sauvegarde cloud sur Google Drive et sauvegarde locale pour restaurer vos donn\u00e9es \u00e0 tout moment",
      "Fonctionne enti\u00e8rement hors ligne \ud83d\udcf4 Pas d\u2019internet n\u00e9cessaire, donn\u00e9es chiffr\u00e9es sur votre t\u00e9l\u00e9phone",
      "Rapports automatiques : r\u00e9sum\u00e9 des ventes, valorisation stock, point mort export\u00e9s en PDF"
    ],
    tiers: [
      { name: "Standard", desc: "1 store, basic POS and inventory", desc_fr: "1 magasin, POS et inventaire de base" },
      { name: "Business", desc: "3 stores, PDF export, cloud backup, WhatsApp reminders", desc_fr: "3 magasins, export PDF, sauvegarde cloud, rappels WhatsApp" },
      { name: "Premium", desc: "Unlimited stores, all analytics, priority support", desc_fr: "Magasins illimit\u00e9s, toutes les analyses, support prioritaire" }
    ]
  },
  {
    id: "velora",
    name: "Velora",
    tagline: "Productivity & Wellness",
    tagline_fr: "Productivit\u00e9 & Bien-\u00eatre",
    developer: "Samandari",
    category: "Productivity",
    price: "paid",
    version: "1.0.0",
    languages: ["English", "Fran\u00e7ais"],
    icon: appAsset("velora", "icon.png"),
    screenshots: [
      appAsset("velora", "screenshots/1.png"),
      appAsset("velora", "screenshots/2.png"),
      appAsset("velora", "screenshots/3.png"),
      appAsset("velora", "screenshots/4.png"),
      appAsset("velora", "screenshots/5.png"),
      appAsset("velora", "screenshots/6.png"),
      appAsset("velora", "screenshots/7.png"),
      appAsset("velora", "screenshots/8.png"),
      appAsset("velora", "screenshots/9.png"),
      appAsset("velora", "screenshots/10.png"),
      appAsset("velora", "screenshots/11.png"),
      appAsset("velora", "screenshots/12.png")
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=1zt4N9ZE8QJntwgVg5m4yga5LgKfoQ_E-",
    shortDesc: "A personal productivity app with habit tracking, goals, smart alarms, expense management, and AI features.",
    shortDesc_fr: "Une app de productivit\u00e9 avec suivi d'habitudes, objectifs, alarmes intelligentes, gestion de d\u00e9penses et fonctions IA.",
    description: "Velora is a personal productivity and wellness app that helps you build better habits, manage your goals, and stay organized. It works entirely offline and includes smart alarms, expense tracking, a debt manager, and an AI-powered assistant. Back up your entire data to Google Drive with one tap and restore it on a new device in seconds.",
    description_fr: "Velora est une application de productivit\u00e9 et bien-\u00eatre qui vous aide \u00e0 construire de meilleures habitudes, g\u00e9rer vos objectifs et rester organis\u00e9. Elle fonctionne enti\u00e8rement hors ligne et inclut des alarmes intelligentes, un suivi de d\u00e9penses, un gestionnaire de dettes et un assistant IA. Sauvegardez toutes vos donn\u00e9es sur Google Drive en un tap et restaurez-les sur un nouvel appareil en quelques secondes.",
    features: [
      "Track daily, weekly, and monthly habits with streaks, a calendar heatmap, and detailed statistics",
      "Create goals with milestones, track your progress, and visualize completion over time",
      "Set smart alarms that work in the background with snooze and custom sounds, even when the app is closed",
      "Log and categorize your expenses, track spending patterns, and keep an eye on your budgets",
      "Access an AI Hub with a voice assistant, life coach, creative muse, and dynamic challenges",
      "Keep track of who owes you and who you owe, with clear payment status tracking",
      "Cloud backup to Google Drive: back up and restore all your data with one tap, even on a new phone",
      "Works completely offline, your data stays private and encrypted on your device"
    ],
    features_fr: [
      "Suivez vos habitudes quotidiennes, hebdomadaires et mensuelles avec s\u00e9ries, heatmap et statistiques d\u00e9taill\u00e9es",
      "Cr\u00e9ez des objectifs avec jalons, suivez votre progression et visualisez l'avancement",
      "Programmez des alarmes intelligentes en arri\u00e8re-plan avec snooze et sons personnalis\u00e9s, m\u00eame app ferm\u00e9e",
      "Enregistrez et cat\u00e9gorisez vos d\u00e9penses, suivez les tendances et surveillez vos budgets",
      "Acc\u00e9dez au Hub IA avec assistant vocal, coach de vie, muse cr\u00e9ative et d\u00e9fis dynamiques",
      "Suivez qui vous doit et \u00e0 qui vous devez, avec un statut de paiement clair",
      "Sauvegarde cloud sur Google Drive : sauvegardez et restaurez toutes vos donn\u00e9es en un tap, m\u00eame sur un nouveau t\u00e9l\u00e9phone",
      "Fonctionne enti\u00e8rement hors ligne, vos donn\u00e9es restent priv\u00e9es et chiffr\u00e9es sur votre appareil"
    ],
    tiers: [
      { name: "Standard", desc: "Full access to habits, goals, alarms, journal, cloud backup", desc_fr: "Acc\u00e8s complet aux habitudes, objectifs, alarmes, journal, sauvegarde cloud" },
      { name: "AI", desc: "Everything in Standard plus AI-powered features and analytics", desc_fr: "Tout le Standard plus les fonctionnalit\u00e9s IA et analyses" }
    ]
  },
  {
    id: "notifspy",
    name: "NotifSpy",
    tagline: "Notification Tracker",
    tagline_fr: "Traqueur de Notifications",
    developer: "Samandari",
    category: "Utility",
    price: "free",
    status: "dev",
    version: "1.0.0",
    languages: ["English"],
    icon: appAsset("notifspy", "icon.png"),
    screenshots: [],
    downloadUrl: null,
    shortDesc: "Captures every notification on your phone silently and lets you recover deleted or dismissed messages.",
    shortDesc_fr: "Capture silencieusement chaque notification sur votre t\u00e9l\u00e9phone et permet de r\u00e9cup\u00e9rer les messages supprim\u00e9s.",
    description: "NotifSpy is an Android app that silently captures every notification on your phone and lets you recover deleted or dismissed messages. Never lose an important message again, even if someone deletes it on WhatsApp or Telegram before you can read it.",
    description_fr: "NotifSpy est une application Android qui capture silencieusement chaque notification sur votre t\u00e9l\u00e9phone et permet de r\u00e9cup\u00e9rer les messages supprim\u00e9s. Ne perdez plus jamais un message important, m\u00eame si quelqu'un le supprime sur WhatsApp ou Telegram avant que vous puissiez le lire.",
    features: [
      "Captures notification content before it gets removed, so you can read deleted WhatsApp and Telegram messages",
      "Browse notifications grouped by app, with dedicated views for messaging apps",
      "Filter within any app by specific contact or conversation to find exactly what you need",
      "Search across all your notifications with counters for captured and deleted messages",
      "Beautiful dark theme optimized for modern phone screens",
      "Notifications are captured in real time, even in the background",
      "All data is stored on your device only, nothing is sent to the cloud"
    ],
    features_fr: [
      "Capture le contenu des notifications avant suppression pour lire les messages WhatsApp et Telegram effac\u00e9s",
      "Parcourez les notifications group\u00e9es par application, avec des vues d\u00e9di\u00e9es pour les apps de messagerie",
      "Filtrez dans n'importe quelle app par contact ou conversation sp\u00e9cifique",
      "Recherchez dans toutes vos notifications avec compteurs de captures et suppressions",
      "Beau th\u00e8me sombre optimis\u00e9 pour les \u00e9crans de t\u00e9l\u00e9phones modernes",
      "Les notifications sont captur\u00e9es en temps r\u00e9el, m\u00eame en arri\u00e8re-plan",
      "Toutes les donn\u00e9es restent sur votre appareil uniquement, rien n'est envoy\u00e9 au cloud"
    ],
    tiers: []
  }
];
