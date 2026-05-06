function appAsset(id, file) {
  return "assets/apps/" + id + "/" + file;
}

const GIST_SOURCES = [
  { id: "esama", gistId: "0250417d63c891faf03a52909d6010e4", file: "e_sama_admin_sync.json" },
  { id: "velora", gistId: "b806e5a54d4cf1a24b23ce2bfc4c5116", file: "velora_admin_sync.json" }
];

const REMOTE_CONFIGS = [
  { id: "esama", url: "https://gist.githubusercontent.com/Sama-ndari/d37c77064385b9600f7c946830a7aa5f/raw/e_sama_config.json" },
  { id: "velora", url: "https://gist.githubusercontent.com/Sama-ndari/55d00b35530e4695d35cde0edcc6e5d5/raw/velora_config.json" }
];

const APPS = [
  {
    id: "fabwash",
    name: "FabWash",
    tagline: "Carwash Management System",
    tagline_fr: "Système de Gestion de Carwash",
    developer: "StarK",
    category: "Business",
    price: "paid",
    status: "sold",
    version: "1.0.0",
    languages: ["Français", "English"],
    icon: appAsset("fabwash", "icon.webp"),
    screenshots: [
      appAsset("fabwash", "screenshots/fabwash-login.webp"),
      appAsset("fabwash", "screenshots/fabwash-dashboard.webp"),
      appAsset("fabwash", "screenshots/fabwash-vehicle-list.webp"),
      appAsset("fabwash", "screenshots/fabwash-registration.webp"),
      appAsset("fabwash", "screenshots/fabwash-invoice.webp"),
      appAsset("fabwash", "screenshots/fabwash-expenses.webp"),
      appAsset("fabwash", "screenshots/fabwash-employees.webp"),
      appAsset("fabwash", "screenshots/fabwash-reports.webp"),
      appAsset("fabwash", "screenshots/fabwash-loyalty.webp"),
      appAsset("fabwash", "screenshots/fabwash-client-detail.webp"),
      appAsset("fabwash", "screenshots/fabwash-settings.webp")
    ],
    videos: [],
    downloadUrl: null,
    trialBadge: "Contact us for pricing",
    trialBadge_fr: "Contactez-nous pour le prix",
    shortDesc: "Digital management system for carwash businesses: vehicle registration, invoices, expense tracking, salary calculation, loyalty program and cloud sync.",
    shortDesc_fr: "Système de gestion digital pour carwash : enregistrement véhicules, factures, suivi dépenses, calcul salaires, programme fidélité et synchronisation cloud.",
    description: "FabWash is a complete management app built for carwash businesses in Burundi and East Africa. Register vehicles in a 4-step flow, generate PDF invoices instantly, track daily expenses, auto-calculate washer salaries based on commissions, and reward loyal customers with a built-in loyalty program. The app works offline-first with Hive local storage and syncs to Firebase Firestore when online. Admin and cashier roles with PIN authentication keep operations secure. Configurable pricing, service types, and salary percentages adapt to any carwash setup.",
    description_fr: "FabWash est une application complète de gestion pour les carwash au Burundi et en Afrique de l'Est. Enregistrez les véhicules en 4 étapes, générez des factures PDF instantanément, suivez les dépenses quotidiennes, calculez automatiquement les salaires des laveurs basés sur les commissions, et récompensez les clients fidèles avec un programme de fidélité intégré. L'app fonctionne hors ligne avec Hive et se synchronise sur Firebase Firestore quand le réseau est disponible. Les rôles admin et caissier avec authentification PIN sécurisent les opérations. Prix, types de service et pourcentages de salaire sont configurables pour s'adapter à tout carwash.",
    features: [
      "4-step vehicle registration: plate number (auto-suggest loyalty), vehicle type, wash type with instant pricing, washer assignment",
      "PDF invoice generation with company logo, thermal POS receipt format for Bluetooth printers",
      "Daily expense tracking with categories: ration, washer salary, cashier salary, infrastructure, other",
      "Auto salary calculation: each washer earns a configurable percentage (default 30%) of their daily revenue",
      "Loyalty program: free wash after every 10 visits (configurable), tracked automatically by plate number",
      "Daily reports: total vehicles, revenue, expenses, salaries, net amount, per-washer breakdown, shareable via WhatsApp",
      "Cloud sync via Firebase Firestore with offline-first Hive storage, sync indicator in app bar",
      "Admin dashboard with configurable pricing grid, salary percentages, and loyalty thresholds",
      "Bilingual interface (French / English) with locale-aware formatting and cashier language selection"
    ],
    features_fr: [
      "Enregistrement véhicule en 4 étapes : plaque (auto-suggestion fidélité), type véhicule, type lavage avec prix, affectation laveur",
      "Génération de factures PDF avec logo, format reçu thermique POS pour imprimantes Bluetooth",
      "Suivi des dépenses quotidiennes par catégorie : ration, salaire laveur, salaire caissier, infrastructure, autre",
      "Calcul automatique des salaires : chaque laveur gagne un pourcentage configurable (défaut 30%) de son revenu quotidien",
      "Programme fidélité : lavage gratuit tous les 10 passages (configurable), suivi automatique par plaque",
      "Rapports quotidiens : total véhicules, revenus, dépenses, salaires, montant net, détail par laveur, partageable via WhatsApp",
      "Synchronisation cloud via Firebase Firestore avec stockage local Hive hors ligne, indicateur de sync dans la barre",
      "Dashboard admin avec grille de prix configurable, pourcentages de salaire et seuils de fidélité",
      "Interface bilingue (Français / Anglais) avec formatage adapté à la locale et sélection de langue caissier"
    ],
    tiers: [
      { name: "Single Station", desc: "1 carwash station, full POS, invoices, reports, Firebase sync", desc_fr: "1 station carwash, POS complet, factures, rapports, sync Firebase" },
      { name: "Multi-Station", desc: "Unlimited stations, consolidated reports, employee transfers, priority support", desc_fr: "Stations illimitées, rapports consolidés, transfert employés, support prioritaire" }
    ],
    legal: {
      developer: "StarK",
      email: "cezaremardini10@gmail.com",
      effectiveDate: "2026-04-25",
      dataLocal: [
        "Vehicle registration records (plate number, type, wash type, date)",
        "Employee information (name, PIN hash, role)",
        "Invoice and expense records",
        "Client loyalty tracking data",
        "App configuration and preferences"
      ],
      dataLocal_fr: [
        "Registres d'enregistrement des véhicules (plaque, type, type de lavage, date)",
        "Informations des employés (nom, hash PIN, rôle)",
        "Registres de factures et de dépenses",
        "Données de suivi de fidélité clients",
        "Configuration et préférences de l'application"
      ],
      dataCloud: [
        "All local data synced to Firebase Firestore (with automatic sync when online)"
      ],
      dataCloud_fr: [
        "Toutes les données locales synchronisées sur Firebase Firestore (synchronisation automatique en ligne)"
      ],
      thirdParty: [
        { name: "Firebase Firestore", purpose: "Cloud sync and backup", purpose_fr: "Synchronisation cloud et sauvegarde" },
        { name: "Firebase Auth", purpose: "Project authentication", purpose_fr: "Authentification du projet" }
      ],
      noAnalytics: true,
      noAds: true,
      country: "Burundi",
      privacyExtra: [
        { title: "PIN Authentication", title_fr: "Authentification par PIN",
          desc: "FabWash uses PIN codes for admin and cashier login. PINs are hashed using SHA-256 before storage. The admin PIN is stored in the app configuration, not transmitted externally.",
          desc_fr: "FabWash utilise des codes PIN pour la connexion admin et caissier. Les PIN sont hachés en SHA-256 avant stockage. Le PIN admin est stocké dans la configuration de l'app, non transmis à l'extérieur." },
        { title: "Cloud Sync", title_fr: "Synchronisation cloud",
          desc: "When online, FabWash automatically syncs data to Firebase Firestore. You can also manually push or pull data from Settings. All transfers are encrypted via HTTPS.",
          desc_fr: "Lorsqu'il est en ligne, FabWash synchronise automatiquement les données sur Firebase Firestore. Vous pouvez aussi pousser ou tirer les données manuellement depuis les Paramètres. Tous les transferts sont chiffrés via HTTPS." },
        { title: "Backup & Restore", title_fr: "Sauvegarde et restauration",
          desc: "FabWash supports local JSON backup and restore as a fallback. Backup files are stored on your device at a location you choose.",
          desc_fr: "FabWash supporte la sauvegarde et restauration locale en JSON comme solution de secours. Les fichiers de sauvegarde sont stockés sur votre appareil à l'emplacement de votre choix." }
      ],
      termsExtra: [
        { title: "Cloud Sync", title_fr: "Synchronisation cloud",
          desc: "Cloud sync stores your carwash data on Firebase Firestore. You are responsible for securing access to the Firebase project. FabWash is not liable for data loss due to Firebase service issues.",
          desc_fr: "La synchronisation cloud stocke vos données de carwash sur Firebase Firestore. Vous êtes responsable de la sécurisation de l'accès au projet Firebase. FabWash n'est pas responsable de la perte de données due à des problèmes de service Firebase." },
        { title: "Business Data", title_fr: "Données commerciales",
          desc: "All business data (vehicles, invoices, expenses, salaries) entered into FabWash remains your property. We do not access, sell, or share this data.",
          desc_fr: "Toutes les données commerciales (véhicules, factures, dépenses, salaires) saisies dans FabWash restent votre propriété. Nous n'accédons pas, ne vendons pas et ne partageons pas ces données." }
      ]
    }
  },
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
    icon: appAsset("esama", "icon.webp"),
    screenshots: [
      appAsset("esama", "screenshots/esama-splash.webp"),
      appAsset("esama", "screenshots/esama-store-types.webp"),
      appAsset("esama", "screenshots/esama-dashboard.webp"),
      appAsset("esama", "screenshots/esama-pos.webp"),
      appAsset("esama", "screenshots/esama-cart.webp"),
      appAsset("esama", "screenshots/esama-inventory.webp"),
      appAsset("esama", "screenshots/esama-inventory-list.webp"),
      appAsset("esama", "screenshots/esama-expenses.webp"),
      appAsset("esama", "screenshots/esama-clients.webp"),
      appAsset("esama", "screenshots/esama-reports.webp"),
      appAsset("esama", "screenshots/esama-crm.webp"),
      appAsset("esama", "screenshots/esama-sales-history.webp"),
      appAsset("esama", "screenshots/esama-rental-dashboard.webp"),
      appAsset("esama", "screenshots/esama-rental-cart.webp"),
      appAsset("esama", "screenshots/esama-rental-catalogue.webp"),
      appAsset("esama", "screenshots/esama-rental-locations.webp"),
      appAsset("esama", "screenshots/esama-restaurant-menu.webp"),
      appAsset("esama", "screenshots/esama-restaurant-order.webp"),
      appAsset("esama", "screenshots/esama-restaurant-ingredients.webp"),
      appAsset("esama", "screenshots/esama-restaurant-menu-manage.webp"),
      appAsset("esama", "screenshots/esama-multistore.webp"),
      appAsset("esama", "screenshots/esama-cloud-backup.webp"),
      appAsset("esama", "screenshots/esama-settings.webp"),
      appAsset("esama", "screenshots/esama-notification-settings.webp"),
      appAsset("esama", "screenshots/esama-notifications.webp"),
      appAsset("esama", "screenshots/esama-bluetooth-printer.webp"),
      appAsset("esama", "screenshots/esama-license-activate.webp"),
      appAsset("esama", "screenshots/esama-license-buy.webp"),
      appAsset("esama", "screenshots/esama-about.webp"),
      appAsset("esama", "screenshots/esama-settings-delete.webp")
    ],
    videos: [
      {
        url: "https://player.vimeo.com/video/1176175794",
        title: "Manage stock without internet",
        title_fr: "Gérer son stock sans internet"
      },
      {
        url: "https://player.vimeo.com/video/1162754098",
        title: "How to add products",
        title_fr: "Enregistrement des produits"
      }
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=1HhG-0U46eTxKDo74Wy1AdXYlABgmqzca",
    trialBadge: "1 week FREE trial",
    trialBadge_fr: "1 semaine d\u2019essai GRATUIT",
    shortDesc: "Trilingual app (FR/EN/SW) for all your business types: shop, pharmacy, bar, restaurant, rental and more. Works fully offline.",
    shortDesc_fr: "Application trilingue (FR/EN/SW) pour tous vos business : boutique, pharmacie, bar, resto, location et plus. Fonctionne hors ligne.",
    description: "E-Sama is a trilingual (French, English, Kiswahili) business management app built for merchants in Burundi and East Africa. Whether you run a boutique, alimentation, pharmacy, depot, bar, restaurant, snack, or a rental business (equipment, events, sounds), E-Sama handles it all from your phone. The app works completely offline with no internet needed and lets you track sales, expenses, clients, stock, and profits in real time. Cloud backup to Google Drive keeps your data safe across devices. New users get a free 1-week trial.",
    description_fr: "E-Sama est une application trilingue (Fran\u00e7ais, Anglais, Kiswahili) de gestion pour les commer\u00e7ants au Burundi et en Afrique de l'Est. Que vous g\u00e9riez une boutique, alimentation, pharmacie, d\u00e9p\u00f4t, cabaret, bar, restaurant, snack ou une activit\u00e9 de location (imvutano, \u00e9v\u00e9nements, sons), E-Sama g\u00e8re tout depuis votre t\u00e9l\u00e9phone. L'app fonctionne enti\u00e8rement hors ligne sans internet n\u00e9cessaire et vous permet de suivre ventes, d\u00e9penses, clients, stock et profits en temps r\u00e9el. La sauvegarde cloud sur Google Drive prot\u00e8ge vos donn\u00e9es. Les nouveaux utilisateurs b\u00e9n\u00e9ficient d\u2019un essai gratuit d\u2019une semaine.",
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
    ],
    legal: {
      developer: "Samandari",
      email: "cezaremardini10@gmail.com",
      effectiveDate: "2026-03-20",
      dataLocal: [
        "Sales, purchases, and inventory records",
        "Client and supplier information",
        "Expense and profit reports",
        "App preferences and settings"
      ],
      dataLocal_fr: [
        "Ventes, achats et registres d\u2019inventaire",
        "Informations clients et fournisseurs",
        "Rapports de d\u00e9penses et b\u00e9n\u00e9fices",
        "Pr\u00e9f\u00e9rences et param\u00e8tres de l\u2019application"
      ],
      dataLocal_sw: [
        "Mauzo, manunuzi na rekodi za hesabu",
        "Taarifa za wateja na wasambazaji",
        "Ripoti za gharama na faida",
        "Mapendeleo na mipangilio ya programu"
      ],
      dataCloud: [
        "Backup data synced to Google Drive (with explicit user consent)"
      ],
      dataCloud_fr: [
        "Donn\u00e9es de sauvegarde synchronis\u00e9es sur Google Drive (avec consentement explicite)"
      ],
      dataCloud_sw: [
        "Data ya hifadhi iliyolingana na Google Drive (kwa idhini ya mtumiaji)"
      ],
      thirdParty: [
        { name: "Google Drive API", purpose: "Cloud backup", purpose_fr: "Sauvegarde cloud", purpose_sw: "Hifadhi ya wingu" },
        { name: "Google Sign-In", purpose: "Authentication for cloud backup", purpose_fr: "Authentification pour la sauvegarde cloud", purpose_sw: "Uthibitishaji wa hifadhi ya wingu" },
        { name: "Google Gemini AI", purpose: "AI-powered features (optional)", purpose_fr: "Fonctionnalit\u00e9s IA (optionnel)", purpose_sw: "Vipengele vya AI (hiari)" }
      ],
      noAnalytics: true,
      noAds: true,
      country: "Burundi",
      privacyExtra: [
        { title: "Device Identification", title_fr: "Identification de l\u2019appareil", title_sw: "Utambulisho wa Kifaa",
          desc: "We collect your device ID solely for license verification purposes. This ID is not linked to any personal information.",
          desc_fr: "Nous collectons l\u2019identifiant de votre appareil uniquement \u00e0 des fins de v\u00e9rification de licence. Cet identifiant n\u2019est li\u00e9 \u00e0 aucune information personnelle.",
          desc_sw: "Tunakusanya kitambulisho cha kifaa chako kwa madhumuni ya uthibitishaji wa leseni pekee. Kitambulisho hiki hakiunganishwi na taarifa yoyote ya kibinafsi." },
        { title: "Remote Configuration", title_fr: "Configuration \u00e0 distance", title_sw: "Usanidi wa Mbali",
          desc: "We use a remote configuration service to manage app updates, communicate important messages, and enforce license compliance.",
          desc_fr: "Nous utilisons un service de configuration \u00e0 distance pour g\u00e9rer les mises \u00e0 jour, communiquer des messages importants et assurer la conformit\u00e9 des licences.",
          desc_sw: "Tunatumia huduma ya usanidi wa mbali kusimamia masasisho ya programu, kuwasiliana ujumbe muhimu, na kuhakikisha utiifu wa leseni." },
        { title: "Storage Access", title_fr: "Acc\u00e8s au stockage", title_sw: "Ufikiaji wa Hifadhi",
          desc: "E-Sama requests storage access to export and import business data backups to a location you choose on your device. This allows you to transfer data between devices or recover data in case of device loss. No files outside the app\u2019s backup folder are accessed or modified.",
          desc_fr: "E-Sama demande l\u2019acc\u00e8s au stockage pour exporter et importer des sauvegardes de donn\u00e9es commerciales vers un emplacement que vous choisissez sur votre appareil. Cela vous permet de transf\u00e9rer des donn\u00e9es entre appareils ou de r\u00e9cup\u00e9rer des donn\u00e9es en cas de perte d\u2019appareil. Aucun fichier en dehors du dossier de sauvegarde n\u2019est consult\u00e9 ou modifi\u00e9.",
          desc_sw: "E-Sama inaomba ufikiaji wa hifadhi ili kusafirisha na kuleta nakala za data za biashara kwenye eneo unalochagua kwenye kifaa chako. Hii inakuruhusu kuhamisha data kati ya vifaa au kurejesha data ikiwa kifaa kimepotea. Hakuna faili nje ya folda ya nakala inayofikiwa au kubadilishwa." },
        { title: "Bluetooth Printing", title_fr: "Impression Bluetooth", title_sw: "Uchapishaji wa Bluetooth",
          desc: "If you connect a Bluetooth thermal printer, the app uses the Bluetooth permission solely to discover and communicate with your printer. No data is sent to any external server through this connection.",
          desc_fr: "Si vous connectez une imprimante thermique Bluetooth, l\u2019application utilise la permission Bluetooth uniquement pour d\u00e9couvrir et communiquer avec votre imprimante. Aucune donn\u00e9e n\u2019est envoy\u00e9e \u00e0 un serveur externe via cette connexion.",
          desc_sw: "Ukiunganisha printa ya Bluetooth ya joto, programu hutumia ruhusa ya Bluetooth tu kutambua na kuwasiliana na printa yako. Hakuna data inayotumwa kwa seva yoyote ya nje kupitia muunganisho huu." },
        { title: "Biometric Authentication", title_fr: "Authentification biom\u00e9trique", title_sw: "Uthibitishaji wa Kibayometriki",
          desc: "E-Sama supports fingerprint or face unlock for app security. Your biometric data is processed entirely by your device\u2019s hardware and is never accessed or stored by the app.",
          desc_fr: "E-Sama prend en charge le d\u00e9verrouillage par empreinte digitale ou reconnaissance faciale pour la s\u00e9curit\u00e9 de l\u2019app. Vos donn\u00e9es biom\u00e9triques sont trait\u00e9es enti\u00e8rement par le mat\u00e9riel de votre appareil et ne sont jamais consult\u00e9es ou stock\u00e9es par l\u2019application.",
          desc_sw: "E-Sama inasaidia kufungua kwa alama ya kidole au uso kwa usalama wa programu. Data yako ya kibayometriki inashughulikiwa kabisa na vifaa vya kifaa chako na haifikiwi au kuhifadhiwa na programu." }
      ],
      termsExtra: [
        { title: "Payments", title_fr: "Paiements", title_sw: "Malipo",
          desc: "All payments are non-refundable once a license key has been generated and delivered.",
          desc_fr: "Tous les paiements sont non remboursables une fois qu\u2019une cl\u00e9 de licence a \u00e9t\u00e9 g\u00e9n\u00e9r\u00e9e et livr\u00e9e.",
          desc_sw: "Malipo yote hayarudishwi mara ufunguo wa leseni ukishatolewa na kupokelewa." },
        { title: "Cloud Backup", title_fr: "Sauvegarde cloud", title_sw: "Hifadhi ya Wingu",
          desc: "Cloud backup stores your data on Google Drive using your Google account. You are responsible for the security of your Google account. E-Sama is not liable for data loss or unauthorized access to your Google Drive.",
          desc_fr: "La sauvegarde cloud stocke vos donn\u00e9es sur Google Drive via votre compte Google. Vous \u00eates responsable de la s\u00e9curit\u00e9 de votre compte Google. E-Sama n\u2019est pas responsable de la perte de donn\u00e9es ou de l\u2019acc\u00e8s non autoris\u00e9 \u00e0 votre Google Drive.",
          desc_sw: "Hifadhi ya wingu inahifadhi data yako kwenye Google Drive kupitia akaunti yako ya Google. Unawajibika kwa usalama wa akaunti yako ya Google. E-Sama haiwajibiki kwa upotezaji wa data au ufikiaji usioruhusiwa." },
        { title: "Storage Access", title_fr: "Acc\u00e8s au stockage", title_sw: "Ufikiaji wa Hifadhi",
          desc: "E-Sama requires access to device storage to export and import local backups. This permission is used only for backup and restore operations initiated by you. The app does not access, read, or modify any files outside its own backup folder.",
          desc_fr: "E-Sama n\u00e9cessite l\u2019acc\u00e8s au stockage de l\u2019appareil pour exporter et importer des sauvegardes locales. Cette permission n\u2019est utilis\u00e9e que pour les op\u00e9rations de sauvegarde et restauration que vous initiez. L\u2019application n\u2019acc\u00e8de, ne lit ni ne modifie aucun fichier en dehors de son propre dossier de sauvegarde.",
          desc_sw: "E-Sama inahitaji ufikiaji wa hifadhi ya kifaa ili kusafirisha na kuleta nakala za hifadhi za ndani. Ruhusa hii inatumika tu kwa shughuli za kuhifadhi na kurejesha unazozindua wewe. Programu haifikii, haisomi wala haibadilishi faili yoyote nje ya folda yake ya nakala." }
      ]
    }
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
    icon: appAsset("velora", "icon.webp"),
    screenshots: [
      appAsset("velora", "screenshots/velora-splash.webp"),
      appAsset("velora", "screenshots/velora-dashboard.webp"),
      appAsset("velora", "screenshots/velora-tasks.webp"),
      appAsset("velora", "screenshots/velora-tasks-fab.webp"),
      appAsset("velora", "screenshots/velora-expenses.webp"),
      appAsset("velora", "screenshots/velora-debts.webp"),
      appAsset("velora", "screenshots/velora-habits.webp"),
      appAsset("velora", "screenshots/velora-goals.webp"),
      appAsset("velora", "screenshots/velora-journal.webp"),
      appAsset("velora", "screenshots/velora-notes.webp"),
      appAsset("velora", "screenshots/velora-water.webp"),
      appAsset("velora", "screenshots/velora-ai-hub.webp"),
      appAsset("velora", "screenshots/velora-calendar.webp"),
      appAsset("velora", "screenshots/velora-pomodoro.webp"),
      appAsset("velora", "screenshots/velora-analytics.webp"),
      appAsset("velora", "screenshots/velora-search.webp"),
      appAsset("velora", "screenshots/velora-contacts.webp"),
      appAsset("velora", "screenshots/velora-notifications.webp"),
      appAsset("velora", "screenshots/velora-backup.webp"),
      appAsset("velora", "screenshots/velora-settings.webp"),
      appAsset("velora", "screenshots/velora-lockscreen.webp"),
      appAsset("velora", "screenshots/velora-license-activate.webp"),
      appAsset("velora", "screenshots/velora-license-buy.webp"),
      appAsset("velora", "screenshots/velora-widget.webp")
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
    ],
    legal: {
      developer: "Samandari",
      email: "cezaremardini10@gmail.com",
      effectiveDate: "2026-03-20",
      dataLocal: [
        "Tasks, habits, goals, and journal entries",
        "Expenses, budgets, and debt records",
        "Alarm and notification settings",
        "App preferences and settings"
      ],
      dataLocal_fr: [
        "T\u00e2ches, habitudes, objectifs et entr\u00e9es de journal",
        "D\u00e9penses, budgets et registres de dettes",
        "Param\u00e8tres d\u2019alarmes et de notifications",
        "Pr\u00e9f\u00e9rences et param\u00e8tres de l\u2019application"
      ],
      dataCloud: [
        "Backup data synced to Google Drive (with explicit user consent)"
      ],
      dataCloud_fr: [
        "Donn\u00e9es de sauvegarde synchronis\u00e9es sur Google Drive (avec consentement explicite)"
      ],
      thirdParty: [
        { name: "Google Drive API", purpose: "Cloud backup", purpose_fr: "Sauvegarde cloud" },
        { name: "Google Sign-In", purpose: "Authentication for cloud backup", purpose_fr: "Authentification pour la sauvegarde cloud" },
        { name: "Google Gemini AI", purpose: "AI-powered features (optional)", purpose_fr: "Fonctionnalit\u00e9s IA (optionnel)" }
      ],
      noAnalytics: true,
      noAds: true,
      country: "Burundi",
      privacyExtra: [
        { title: "Email Features", title_fr: "Fonctionnalit\u00e9s e-mail",
          desc: "If you configure email reports, emails are sent using your provided SMTP credentials. Your email address and credentials are only stored locally on your device.",
          desc_fr: "Si vous configurez les rapports par e-mail, les e-mails sont envoy\u00e9s avec vos identifiants SMTP. Votre adresse e-mail et vos identifiants sont uniquement stock\u00e9s localement sur votre appareil." },
        { title: "AI Features", title_fr: "Fonctionnalit\u00e9s IA",
          desc: "When using AI features (Life Coach, Creative Muse, etc.), your data may be sent to a third-party AI API for processing. This data is not stored or used for training by the provider.",
          desc_fr: "Lors de l\u2019utilisation des fonctionnalit\u00e9s IA (Coach de vie, Muse cr\u00e9ative, etc.), vos donn\u00e9es peuvent \u00eatre envoy\u00e9es \u00e0 une API IA tierce pour traitement. Ces donn\u00e9es ne sont ni stock\u00e9es ni utilis\u00e9es pour l\u2019entra\u00eenement par le fournisseur." },
        { title: "Device Identification", title_fr: "Identification de l\u2019appareil",
          desc: "We collect your device ID solely for license verification purposes. This ID is not linked to any personal information.",
          desc_fr: "Nous collectons l\u2019identifiant de votre appareil uniquement \u00e0 des fins de v\u00e9rification de licence. Cet identifiant n\u2019est li\u00e9 \u00e0 aucune information personnelle." },
        { title: "Remote Configuration", title_fr: "Configuration \u00e0 distance",
          desc: "We use a remote configuration service to manage app updates, communicate important messages, and enforce license compliance.",
          desc_fr: "Nous utilisons un service de configuration \u00e0 distance pour g\u00e9rer les mises \u00e0 jour, communiquer des messages importants et assurer la conformit\u00e9 des licences." },
        { title: "Biometric Authentication", title_fr: "Authentification biom\u00e9trique",
          desc: "Velora supports fingerprint or face unlock for app security. Your biometric data is processed entirely by your device\u2019s hardware and is never accessed or stored by the app.",
          desc_fr: "Velora prend en charge le d\u00e9verrouillage par empreinte digitale ou reconnaissance faciale pour la s\u00e9curit\u00e9 de l\u2019app. Vos donn\u00e9es biom\u00e9triques sont trait\u00e9es enti\u00e8rement par le mat\u00e9riel de votre appareil et ne sont jamais consult\u00e9es ou stock\u00e9es par l\u2019application." },
        { title: "Alarms & Notifications", title_fr: "Alarmes et notifications",
          desc: "Velora uses the exact alarm and notification permissions to deliver reminders, habit alerts, and smart alarms you configure. These permissions are used only for features you explicitly enable.",
          desc_fr: "Velora utilise les permissions d\u2019alarme exacte et de notification pour d\u00e9livrer les rappels, alertes d\u2019habitudes et alarmes intelligentes que vous configurez. Ces permissions ne sont utilis\u00e9es que pour les fonctionnalit\u00e9s que vous activez explicitement." }
      ],
      termsExtra: [
        { title: "AI Disclaimer", title_fr: "Avertissement IA",
          desc: "The AI features (Life Coach, therapist mode, creative challenges) are NOT a substitute for professional medical or psychological advice. They are designed for personal reflection and productivity purposes only.",
          desc_fr: "Les fonctionnalit\u00e9s IA (Coach de vie, mode th\u00e9rapeute, d\u00e9fis cr\u00e9atifs) ne sont PAS un substitut \u00e0 un avis m\u00e9dical ou psychologique professionnel. Elles sont con\u00e7ues uniquement \u00e0 des fins de r\u00e9flexion personnelle et de productivit\u00e9." },
        { title: "Cloud Backup", title_fr: "Sauvegarde cloud",
          desc: "Cloud backup stores your data on Google Drive using your Google account. You are responsible for the security of your Google account. Velora is not liable for data loss or unauthorized access to your Google Drive.",
          desc_fr: "La sauvegarde cloud stocke vos donn\u00e9es sur Google Drive via votre compte Google. Vous \u00eates responsable de la s\u00e9curit\u00e9 de votre compte Google. Velora n\u2019est pas responsable de la perte de donn\u00e9es ou de l\u2019acc\u00e8s non autoris\u00e9 \u00e0 votre Google Drive." }
      ]
    }
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
    icon: appAsset("notifspy", "icon.webp"),
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
    tiers: [],
    legal: {
      developer: "Samandari",
      email: "cezaremardini10@gmail.com",
      effectiveDate: "2026-03-22",
      dataLocal: [
        "Notification content captured from other apps on your device",
        "App name, sender/contact name, timestamp, and notification text",
        "App preferences and settings"
      ],
      dataLocal_fr: [
        "Contenu des notifications captur\u00e9es depuis d\u2019autres applications",
        "Nom de l\u2019application, nom de l\u2019exp\u00e9diteur, horodatage et texte de la notification",
        "Pr\u00e9f\u00e9rences et param\u00e8tres de l\u2019application"
      ],
      dataCloud: [],
      thirdParty: [],
      noAnalytics: true,
      noAds: true,
      noCloud: true,
      country: "Burundi",
      privacyExtra: [
        { title: "Notification Listener Permission", title_fr: "Permission d\u2019\u00e9coute des notifications",
          desc: "NotifSpy requires the Android Notification Listener permission to function. This permission allows the App to read notifications as they appear. The captured data is stored exclusively on your device.",
          desc_fr: "NotifSpy n\u00e9cessite la permission d\u2019\u00e9coute des notifications Android pour fonctionner. Cette permission permet \u00e0 l\u2019application de lire les notifications \u00e0 leur apparition. Les donn\u00e9es captur\u00e9es sont stock\u00e9es exclusivement sur votre appareil." }
      ],
      termsExtra: [
        { title: "Permissions", title_fr: "Permissions",
          desc: "NotifSpy requires the Android Notification Listener permission to function. This permission is used solely to capture notifications for display within the App. You can revoke this permission at any time through your device settings.",
          desc_fr: "NotifSpy n\u00e9cessite la permission d\u2019\u00e9coute des notifications Android. Cette permission est utilis\u00e9e uniquement pour capturer les notifications et les afficher dans l\u2019application. Vous pouvez r\u00e9voquer cette permission \u00e0 tout moment dans les param\u00e8tres de votre appareil." }
      ]
    }
  }
];
