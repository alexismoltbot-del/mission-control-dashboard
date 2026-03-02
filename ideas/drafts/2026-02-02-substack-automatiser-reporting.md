# ✍️ Article Substack — Automatiser son reporting financier

*Draft long format pour accompagner le lancement*

---

## Titre options

1. **"J'ai automatisé mon reporting financier. Voici comment."**
2. **"De 3h à 0h : comment j'ai éliminé mon lundi matin Excel"**
3. **"Le DAF de poche : construire son business review automatique"**
4. **"Pourquoi je ne ferai plus jamais de slides financiers manuellement"**

---

## Article

### Le problème

Chaque lundi matin, même rituel.

J'ouvre Pennylane. Export CSV. Import dans Excel. Mise en forme. Calcul des variations. Copier-coller dans PowerPoint. Vérifier que les chiffres sont cohérents. Ajouter mes commentaires. Exporter en PDF. Envoyer par email.

3 heures. Chaque semaine.

Pas parce que je fais des analyses complexes. Juste parce que je compile des données qui existent déjà dans ma compta, dans un format que mes associés/investisseurs peuvent comprendre.

150h par an. Pour du copier-coller glorifié.

### L'épiphanie

Un mardi soir, fatigué de ce rituel, je me suis posé la question : **pourquoi je fais ça manuellement ?**

Les données sont dans Pennylane. En lecture seule, via API.
Les calculs sont toujours les mêmes. CA, marge, variations, tréso.
Les slides ont toujours le même format. 5-6 slides standards.
Les commentaires suivent une logique. "CA en hausse de X%", "Attention à tel poste".

Tout ça, une machine peut le faire.

### La solution

En une semaine, j'ai construit un prototype :

**Étape 1 : Connexion Pennylane**
OAuth simple. Lecture seule. Je récupère le P&L, le bilan, la trésorerie, les factures.

**Étape 2 : Calcul des KPIs**
CA du mois, CA cumulé, marge brute, position cash, créances clients, dettes fournisseurs. Variations M-1 et M-12.

**Étape 3 : Génération des slides**
Template PowerPoint avec placeholders. Les chiffres s'injectent. Les graphs se génèrent.

**Étape 4 : Commentaires IA**
Claude analyse les variations et génère les points d'attention : "Le CA est en hausse de 12% vs M-1, porté par le client X. Attention : 3 factures impayées depuis plus de 30 jours."

**Étape 5 : Livraison**
Chaque lundi à 7h, je reçois un email avec mon business review attaché. Prêt à forward.

### Le résultat

Lundi 7h02. Mon téléphone vibre. Email : "Votre Business Review - Semaine 5".

J'ouvre. 6 slides. Tout est là.
- Executive summary avec les 3 chiffres clés
- Graph des revenus sur 12 mois glissants
- Évolution des charges par poste
- Position trésorerie et prévision 3 mois
- Alertes : 2 factures en retard, 1 charge anormale
- Recommandations

Temps passé : 0.

J'ai relu en 3 minutes. Ajouté un commentaire perso sur un projet en cours. Envoyé.

### Les détails techniques

Pour ceux que ça intéresse, voici la stack :

**Backend :** Node.js + API Pennylane (GraphQL)
**Génération slides :** pptxgenjs (librairie JS qui génère du PowerPoint)
**Charts :** Chart.js exporté en images
**IA :** Claude API pour les commentaires
**Scheduler :** Cron job simple
**Delivery :** Resend (service d'email transactionnel)

Coût mensuel total : ~10€ (API calls + hosting)

### Pourquoi ça change tout

Ce n'est pas juste du temps gagné. C'est de la charge mentale en moins.

Avant, je procrastinais. "Je ferai le reporting demain." Demain devenait mercredi. Mes associés attendaient.

Maintenant, c'est fait. Automatiquement. Sans y penser.

Et j'ai découvert un effet secondaire : je regarde mes chiffres plus souvent. Parce que c'est facile. Parce qu'ils arrivent tout seuls.

La visibilité sur ma boîte a augmenté. Pas parce que j'ai plus de données. Mais parce que je les consomme réellement.

### Et pour vous ?

Je me suis demandé si ça intéressait d'autres dirigeants.

Les DAF à temps partiel facturent 800-2000€/mois. Une grosse partie de leur temps est passée à... compiler des chiffres. Pas à faire de la stratégie. De la mise en forme.

Et si un outil à 99€/mois faisait cette partie automatiquement ?

Je construis ce produit en public. Si vous passez plus de 2h par semaine sur vos reportings, je cherche des bêta-testeurs.

L'idée : vous connectez votre Pennylane, vous choisissez votre template, et chaque lundi vous recevez votre business review. Prêt à partager.

DM moi sur LinkedIn ou répondez à cet email si ça vous parle.

---

### Épilogue : Ce que j'ai appris

Automatiser mon reporting m'a rappelé une vérité simple :

**Les tâches répétitives et prévisibles n'ont pas besoin d'humains.**

Pas parce que les humains ne sont pas capables. Mais parce que leur temps vaut mieux que ça.

150h/an libérées, c'est 150h pour réfléchir, créer, vendre, recruter. Les trucs qui font vraiment avancer une boîte.

La prochaine fois que vous faites une tâche répétitive, posez-vous la question : "Est-ce que ça pourrait être automatisé ?"

La réponse est probablement oui.

---

## Notes de publication

**Longueur :** ~800 mots — format moyen
**Ton :** Personnel, technique mais accessible
**CTA :** Inscription bêta
**Visuel :** Screenshot d'un vrai slide généré
**Cross-post :** Résumer en post LinkedIn avec lien vers l'article

---

*Draft prêt pour édition et publication*
