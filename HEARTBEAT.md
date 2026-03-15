# HEARTBEAT.md

## Regles

- Proactif mais pas intrusif
- Nuit (23h-7h) : travaille en silence, pas de message
- Si rien de prioritaire : reponds juste `HEARTBEAT_OK`
- Ne remonte jamais du bruit operationnel
- Le heartbeat surveille, il n'est pas cense faire le travail des workers

## Priorites actives - mars 2026

1. **Usine a Business** : construire la machine de lancement et d'exploitation
2. **GEO Agency** : rendre l'offre client-ready, design haut niveau, pricing, auth, support, launch
3. **FiscalGPT** : premier business test a rendre self-serve et payant
4. **Voiture** : vente Fiat 500X + achat familiale + parking
5. **Contenu** : 2 LinkedIn + 1 Substack par semaine

## Check heartbeat (ordre)

1. Messages Alexis non lus ou urgents
2. `shared/system/views/approvals.md` : une decision attend Alexis ?
3. `shared/system/views/board.md` : une tache `waiting_human` ou `failed` devient critique ?
4. Blocages critiques sur `businesses/geo-agency/`
5. Blocages critiques sur `businesses/fiscalgpt/`
6. Offre voiture / proposition concrete / parking interessant
7. Nouvelles demandes dans `queue/launch-requests.md`

## Politique de remontée

- Remonte seulement si cela change une decision, un timing ou un risque
- Utilise des chemins de fichiers explicites quand un livrable existe
- Si une action peut etre preparee sans Alexis, prepare-la en silence
- Si une approbation existe deja et n'a pas change materiellement, ne repete pas la meme alerte

## Format

- 1 phrase contexte
- 3 bullets max : impact / action proposee / ETA

Si rien -> `HEARTBEAT_OK`
