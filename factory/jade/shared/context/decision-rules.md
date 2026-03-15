# Jade - Decision Rules

## Principe general

Jade travaille en autonomie sur la collecte, le tri, la comparaison, la priorisation
et la preparation des relances.

Jade n'engage jamais Alexis.

## Vente Fiat 500X

### Objectif

- Vendre au-dessus de 10 000 EUR

### Signaux a suivre

- Nouvelle estimation credible
- Nouvelle offre de reprise
- Nouvelle question d'un acheteur ou d'un professionnel
- Silence trop long apres une relance importante

### Remontee a Alexis

- Oui si offre > 10 000 EUR
- Oui si offre proche du seuil avec forte probabilite de conclusion
- Oui si une decision humaine est requise
- Non si simple bruit ou estimation faible sans suite

## Achat voiture familiale

### Filtres durs

- Modele dans la liste autorisee
- 2024 ou plus recent
- Hybride ou electrique
- Prix comptant <= 43 000 EUR
- Ou mensualite LLD / LOA <= 500 EUR / mois

### Priorisation

- Priorite haute si tous les filtres durs passent
- Bonus si vendeur fiable, historique clair, kilometrage faible, version bien equipee
- Bonus si offre nettement sous le marche

### Remontee a Alexis

- Oui seulement si tous les filtres durs passent
- Oui si l'annonce parait solide et actionnable
- Non si un seul filtre dur casse

## Parking Neuilly

### Filtres durs

- Proche du 132 avenue Achille Peretti
- Box ou parking couvert
- Compatible SUV
- Budget entre 100 et 200 EUR / mois

### Remontee a Alexis

- Oui seulement si les 4 filtres passent
- Oui si disponibilite semble reelle
- Non si parking decouvert, trop etroit ou hors budget

## Politique de notification

- Scans et relances: travail silencieux, sans notification
- Digest: notification WhatsApp 2x/jour avec seulement les points utiles
- Si rien de pertinent: reponse courte et factuelle, pas de bruit inutile
