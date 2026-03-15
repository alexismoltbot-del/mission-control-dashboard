# Jade - Summary

## Snapshot

- Last update: 2026-03-11 12:00 Europe/Paris
- Vente Fiat: dossier enrichi — strategie de prix formalisee (affichage 12 200 EUR, plancher 10 000 EUR), canaux de diffusion identifies (LeBonCoin, La Centrale, AutoScout24), pack annonce structure, relances type prets. Blocage actuel: photos et documents Alexis requis avant toute diffusion. Aucune offre reçue.
- Achat familiale: shortlist 5 candidats actifs. Comparatif décisionnel formalisé → `outputs/comparatif-voiture-decision.md`. Recommandation: Espace 6 E-Tech 200 (31 499 EUR) en #1. Tesla Model Y et VW Tayron eHybrid restent à scanner (accès réseau requis).
- Parking Neuilly: comparatif décisionnel formalisé → `outputs/comparatif-parking-decision.md`. 4 emails de contact prêts → `outputs/jade/outreach/relances-parking-neuilly.md` — validation Alexis requise avant envoi.
- Emails relances: 4 emails parking prêts → `outputs/jade/outreach/relances-parking-neuilly.md` + 3 emails voiture achat prêts → `outputs/jade/outreach/relances-voiture-achat.md` — aucun envoi sans validation Alexis
- Maturite globale: ~60% — comparatifs formalisés, relances prêtes, blocages identifiés

## Approvals en attente

- **APR-001** `shared/tasks/APR-001-kodiaq-hybride.md` — Kodiaq micro-hybride : conserver ou filtrer ? → décision Alexis requise (A/B/C)

## Alerts

- ⚠️ Les Kodiaq en shortlist sont micro-hybrides (MHEV 48V), pas full hybrid ni electriques — a valider avec Alexis si acceptable.
- ⚠️ Rue Poissonniers 120 EUR: incoherence prix titre vs corps — a clarifier avant contact.
- 🔵 Tesla Model Y: candidat prioritaire non encore scanne — pleinement dans les filtres durs.

## Trous prioritaires

- `voiture-comparatif.md` : Tesla Model Y et VW Tayron eHybrid encore sans annonces concretes (scans web a relancer avec acces reseau)
- `parking-recherche.md` : dimensions et acces SUV a confirmer pour rue Chauveau et rue Poissonniers
- `vente-fiat-500x.md` : blocage photos/docs Alexis — diffusion impossible
- Aucune prise de contact qualifiee encore preparee sur parkings

## Next Actions

1. **[BLOQUANT ALEXIS]** Fournir photos vehicule + carnet entretien + facture revision pour diffuser l'annonce Fiat 500X.
2. **[BLOQUANT RESEAU]** Scanner Tesla Model Y occasion 2024 sur Aramisauto, Spoticar, La Centrale — budget cible ~35 000–40 000 EUR. (scan web requis, non disponible en sandbox)
3. **[BLOQUANT RESEAU]** Scanner VW Tayron eHybrid 2024 (version PHEV 272 ch uniquement).
4. Valider avec Alexis: Kodiaq micro-hybride acceptable ou filtre strict full hybrid/electrique ?
5. Confirmer dimensions/hauteur libre parking rue Chauveau avant contact agence.
6. **[BLOQUANT HOST]** JD-008 dashboard — `node scripts/build-jade-dashboard.js` — node non disponible en sandbox, a executer en dehors.

## Dashboard

- Build command: `node scripts/build-jade-dashboard.js`
- Output: `dashboard/index.html`
