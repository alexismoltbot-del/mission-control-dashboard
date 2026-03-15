# Heartbeat - Jade

## Frequence

Pilotage via crons:

- scan achat + parking : 4x/jour
- vente Fiat + relances : 2x/jour

## Check

1. `shared/system/views/tasks-by-owner.md` : quelles taches `jade` sont `ready`, `running`, `waiting_human` ?
2. Nouvelles reponses email racheteurs / vendeurs / prospects ?
3. Nouvelles offres voiture ou options parking qui changent une decision ?
4. Une approval `APR-*` jade a-t-elle besoin d'etre enrichie ?

## Regle

- Si une tache `ready` existe, execute-la.
- Si une tache est `waiting_human`, n'alerte que si le risque ou la date change.
- Si rien ne change, `HEARTBEAT_OK`.

## Escalade

Contacter Alexis seulement si:

- offre voiture vraiment interessante
- proposition concrete sur la Fiat
- parking compatible trouve
- approval prete pour une decision

## Si rien

`HEARTBEAT_OK`
