window.JADE_DASHBOARD_DATA = {
  "generatedAt": "2026-03-09T16:01:02.398Z",
  "root": "/Users/alexis/.openclaw/workspace/factory/jade",
  "summary": {
    "snapshot": [
      "Last update: 2026-03-09 17:05 Europe/Paris",
      "Vente Fiat: premiers comparables consolides, bande indicative 11 500 a 13 500 EUR, aucune offre entrante reelle a ce stade",
      "Achat familiale: shortlist amorcee avec 5 candidats concrets (Peugeot 5008, Renault Espace x2, Skoda Kodiaq x2)",
      "Parking Neuilly: shortlist amorcee avec 4 options concretes, meilleures pistes actuelles rue Chauveau et 58 bis boulevard Victor Hugo",
      "Maturite globale: ~45% - architecture stable, collecte reelle demarree, execution encore manuelle"
    ],
    "alerts": [
      "Aucun signal critique actif.",
      "Vigilance: les Kodiaq trouves sont micro-hybrides, pas full hybrid.",
      "Vigilance: l'annonce PAP Poissonniers affiche 100 EUR dans le titre et 120 EUR dans le corps."
    ],
    "nextActions": [
      "Completer le scan des modeles encore vides: Tesla Model Y, VW Tayron, Volvo XC90, Audi Q7, BMW X5, VW Touareg.",
      "Verifier dimensions, acces et disponibilite reelle des parkings rue Chauveau et boulevard Victor Hugo.",
      "Preparer un pack de mise en vente Fiat 500X avec prix cible, photos et arguments de reassurance.",
      "Mettre a jour le dashboard et le board apres chaque run utile."
    ],
    "dashboard": [
      "Build command: `node scripts/build-jade-dashboard.js`",
      "Output: `dashboard/index.html`"
    ]
  },
  "tasks": {
    "NOW": [
      "JD-001 Consolider le dossier de vente Fiat 500X et remonter toute offre > 10 000 EUR",
      "JD-002 Maintenir un shortlist de voitures familiales qui respectent tous les criteres fixes",
      "JD-003 Maintenir un shortlist parking Neuilly compatible SUV entre 100 et 200 EUR / mois",
      "JD-004 Maintenir `shared/state/summary.md` a jour apres chaque run utile",
      "JD-009 Produire un etat des lieux complet du projet voiture pour Alexis: Fiat, familiale, parking, trous actuels, prochaines actions"
    ],
    "IN REVIEW": [
      "Aucun."
    ],
    "NEXT": [
      "JD-005 Formaliser un comparatif simple des meilleures offres voiture retenues",
      "JD-006 Formaliser un comparatif simple des meilleures options parking retenues",
      "JD-007 Preparer les relances email utiles sans jamais envoyer sans validation Alexis",
      "JD-008 Garder le dashboard local coherent avec les fichiers de suivi"
    ]
  },
  "fiat": {
    "vehicle": [
      "Modele : Fiat 500X Cross",
      "Annee : 2019",
      "Kilometrage : 75 900 km",
      "Motorisation : essence 120ch",
      "Plaque : FH151AH"
    ],
    "objective": [
      "Vendre au-dessus de 10 000 EUR"
    ],
    "estimations": [
      "Aramisauto, Fiat 500X 1.0 FireFly Turbo T3 120 BVM6 Cross, 2019, 68 690 km, 12 499 EUR: https://www.aramisauto.com/voitures/fiat/500x/cross/offres/",
      "Autohero, Fiat 500X 1.0 FireFly T T3 Cross, 2019, 97 994 km, 11 990 EUR: https://www.autohero.com/fr/auto/fiat-500-x-2019/",
      "La Centrale, Fiat 500 X (2) 1.3 FIREFLY T T4 150 500X BY HARCOURT DCT, 2019, 85 000 km, 13 990 EUR: https://www.lacentrale.fr/auto-occasion-annonce-87103403963.html",
      "Bande de marche indicative pour un 2019 essence bien tenu: 11 500 a 13 500 EUR. L'objectif > 10 000 EUR parait atteignable si annonce propre et historique clair."
    ],
    "offers": [
      "Aucune offre recue dans ce workspace au 2026-03-09."
    ],
    "relances": [
      "Aucune relance consolidee au 2026-03-09."
    ]
  },
  "topCars": [
    {
      "Rang": "1",
      "Modele": "Peugeot 5008 Hybrid 136 e-DCS6 GT",
      "Annee": "2024",
      "Energie": "Hybride",
      "Prix": "29 990 EUR",
      "Mensualite": "n/a",
      "Lien": "https://www.spoticar.fr/voitures-occasion/peugeot-5008-hybrid-136-e-dcs6-gt-morbihan-pontivy-1203919477",
      "Pourquoi c'est interessant": "34 623 km, budget confortable, dossier concret deja ouvert"
    },
    {
      "Rang": "2",
      "Modele": "Renault Espace 6 full hybrid E-Tech 200 Techno 5pl + Toit Panoramique",
      "Annee": "2024",
      "Energie": "Hybride essence",
      "Prix": "31 499 EUR",
      "Mensualite": "378 EUR/mois",
      "Lien": "https://www.aramisauto.com/voitures/renault/espace-6/techno/rv954169/?vehicleId=954169",
      "Pourquoi c'est interessant": "19 015 km, full hybrid, kilometrage bas, bon compromis familial"
    },
    {
      "Rang": "3",
      "Modele": "Renault Espace 6 Techno 7Pl + Pack City Premium and Driving",
      "Annee": "2024",
      "Energie": "Hybride essence",
      "Prix": "29 999 EUR",
      "Mensualite": "255 EUR/mois",
      "Lien": "https://www.aramisauto.com/voitures/renault/espace/7pl/v345175",
      "Pourquoi c'est interessant": "68 055 km, 7 places, mensualite nette sous plafond"
    },
    {
      "Rang": "4",
      "Modele": "Skoda Kodiaq 1.5 TSI 150 Hybrid DSG7 Selection Surequipee",
      "Annee": "2024",
      "Energie": "Micro-hybride essence",
      "Prix": "34 499 EUR",
      "Mensualite": "411 EUR/mois",
      "Lien": "https://www.aramisauto.com/voitures/skoda/kodiaq/selection/rv971939/?vehicleId=971939",
      "Pourquoi c'est interessant": "2 366 km, quasi neuve, a valider si micro-hybride acceptable"
    },
    {
      "Rang": "5",
      "Modele": "Skoda Kodiaq 1.5 TSI 150 ch Hybrid ACT DSG7 7pl Selection",
      "Annee": "2025",
      "Energie": "Micro-hybride essence",
      "Prix": "40 399 EUR",
      "Mensualite": "358 EUR/mois",
      "Lien": "https://www.aramisauto.com/voitures/skoda/kodiaq/selection/v336482",
      "Pourquoi c'est interessant": "0 km, 7 places, sous le plafond cash et mensuel"
    }
  ],
  "parkingOptions": [
    {
      "Source": "SeLoger",
      "Adresse / zone": "Rue Chauveau, Neuilly-sur-Seine",
      "Prix": "160 EUR / mois",
      "Type": "Parking en sous-sol",
      "Compatibilite SUV": "A verifier",
      "Lien": "https://www.seloger.com/annonces/locations/parking/neuilly-sur-seine-92/ile-de-la-jatte-parc-d-orleans/256935639.htm",
      "Statut": "A prioriser: agence locale sur avenue Achille Peretti, fit geographique probable"
    },
    {
      "Source": "SeLoger",
      "Adresse / zone": "58 bis boulevard Victor Hugo, Neuilly-sur-Seine",
      "Prix": "200 EUR / mois",
      "Type": "Parking en sous-sol securise 13 m2",
      "Compatibilite SUV": "Oui",
      "Lien": "https://www.seloger.com/annonces/locations/parking/neuilly-sur-seine-92/ile-de-la-jatte-parc-d-orleans/25W8EUUT42G2.htm",
      "Statut": "Bon fit SUV, haut de fourchette budget"
    },
    {
      "Source": "PAP",
      "Adresse / zone": "20 rue des Poissonniers, Neuilly-sur-Seine",
      "Prix": "120 EUR / mois",
      "Type": "Place au 1er sous-sol",
      "Compatibilite SUV": "A verifier",
      "Lien": "https://www.pap.fr/annonces/garage-parking-neuilly-sur-seine-92200-r459903122",
      "Statut": "Bien place, mais source incoherente entre 100 EUR et 120 EUR"
    },
    {
      "Source": "PAP",
      "Adresse / zone": "23/25 rue Cino Del Duca, Paris 17 / Porte des Ternes",
      "Prix": "170 EUR / mois",
      "Type": "Place securisee au 1er sous-sol",
      "Compatibilite SUV": "Oui",
      "Lien": "https://www.pap.fr/annonces/garage-parking-paris-17e-75017-r460402171",
      "Statut": "Hors Neuilly strict, mais proche et compatible SUV"
    }
  ],
  "counts": {
    "topCars": 5,
    "parkingOptions": 4
  },
  "cronJobs": [
    {
      "id": "294be926-dcf2-4a4a-bdcd-78e5cc9e2762",
      "name": "🚗 Jade — Digest Decisionnel",
      "schedule": "30 12,20 * * * @ Europe/Paris",
      "delivery": "announce",
      "channel": "whatsapp",
      "nextRunAtMs": 1773084600000,
      "lastRunAtMs": 1773054000113,
      "lastStatus": "ok"
    },
    {
      "id": "ea3f2f7e-93ad-42ef-b77f-8c87e8508f26",
      "name": "🚗 Jade — Scan Achat & Parking",
      "schedule": "0 8,12,16,20 * * * @ Europe/Paris",
      "delivery": "none",
      "channel": "last",
      "nextRunAtMs": 1773082800000,
      "lastRunAtMs": null,
      "lastStatus": "unknown"
    },
    {
      "id": "1fe94d44-08fe-4ee6-b784-70a52344aeda",
      "name": "🚗 Jade — Vente Fiat & Relances",
      "schedule": "30 10,18 * * * @ Europe/Paris",
      "delivery": "none",
      "channel": "last",
      "nextRunAtMs": 1773077400000,
      "lastRunAtMs": null,
      "lastStatus": "unknown"
    }
  ],
  "activity": [
    "Point de vigilance note: les Kodiaq actuellement trouves sont micro-hybrides et doivent etre valides contre le filtre energie.",
    "Premiers comparables Fiat 500X consolides dans `vente-fiat-500x.md`: Aramisauto, Autohero et La Centrale.",
    "Premier semis de donnees reelles dans `parking-recherche.md`: 4 options consolidees via SeLoger et PAP.",
    "Premier semis de donnees reelles dans `voiture-comparatif.md`: 5 candidats concrets identifies via Spoticar et Aramisauto.",
    "Dashboard Jade initialise.",
    "Boucles proactives Jade structurees: scan, relances, digest.",
    "Workspace initialise pour le suivi voiture."
  ],
  "rules": {
    "general": [],
    "fiat": [
      "Oui si offre > 10 000 EUR",
      "Oui si offre proche du seuil avec forte probabilite de conclusion",
      "Oui si une decision humaine est requise",
      "Non si simple bruit ou estimation faible sans suite"
    ]
  },
  "sources": [
    "shared/state/summary.md",
    "shared/context/vente-fiat-500x.md",
    "shared/context/voiture-comparatif.md",
    "shared/context/parking-recherche.md",
    "shared/tasks/board.md",
    "shared/logs/activity-log.md"
  ]
};
