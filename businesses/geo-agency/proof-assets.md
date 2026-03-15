# GEO Agency — Proof Assets

> **Owner:** Anna  
> **Last updated:** 2026-03-15  
> **Status:** ready for review — no fake claims, all assets buildable without existing clients

---

## Règle de base

Aucune invention. Aucun client fictif. Aucun témoignage fabriqué.

Si aucun client réel n'est disponible pour la phase de lancement, chaque asset
doit être soit :
- **explicitement labellisé** comme exemple ou simulation, ou
- **fondé sur le travail réel d'Alexis** (analyses publiées, audits internes)

---

## Asset 1 — Sample audit excerpt (recommandé pour le lancement)

### Format
PDF ou image haute résolution, 3–5 pages d'un audit réel floutées ou anonymisées.

### Contenu suggéré
- Page de couverture avec logo [PLACEHOLDER CLIENT] et date
- Score global AI visibility (ex: 34/100)
- Tableau des 4 dimensions : Indexabilité, Clarté d'entité, Citabilité, Signaux de confiance
- Une page de recommandations prioritaires (top 5 actions)
- Une page "opportunités détectées" avec exemples de requêtes cibles

### Label à afficher sur le site
> "Exemple de livrable — basé sur un audit réel, client anonymisé."

### Valeur conversion
Montre le niveau de détail et de rigueur avant achat. Réduit le risque perçu.

### Effort de production
2–3 heures. Alexis peut produire un audit sur son propre site ou un site partenaire
et en extraire les slides pertinentes.

---

## Asset 2 — Score card visuelle (quick win)

### Format
Image statique ou carte SVG intégrée dans la page.

### Contenu
Une scorecard fictive mais réaliste avec :
- Nom de domaine masqué (ex: "b2b-saas-example.com")
- Score par dimension avec barre de progression
- Verdict : "Invisible to AI search — 3 critical gaps found"

### Label à afficher sur le site
> "Exemple de diagnostic automatique — simulation basée sur un site réel anonymisé."

### Valeur conversion
Donne au visiteur une image mentale de ce qu'il recevra. L'ancre sur le résultat,
pas sur le processus.

### Effort de production
Victor peut générer en 1h avec un composant HTML/CSS basique.

---

## Asset 3 — Analyse de cas publics (zero client nécessaire)

### Format
Section "Case study" ou article blog court. Peut vivre en dehors du paywall.

### Approche
Prendre 2–3 entreprises connues (ex: Doctolib, Lemlist, une boutique e-commerce)
et analyser publiquement leur état de GEO readiness :
- Qu'est-ce que ChatGPT dit quand on cherche leur catégorie ?
- Est-ce qu'elles sont citées ? Pourquoi ?
- Quel serait le premier gap à corriger ?

### Label à afficher sur le site
> "Analyse indépendante — ces entreprises ne sont pas clientes."

### Valeur conversion
Démontre la compétence d'Alexis sans avoir besoin d'un mandat. Très fort pour
le trafic organique et LinkedIn.

### Effort de production
3–4 heures par analyse. Peut devenir du contenu Substack ou LinkedIn en parallèle.

---

## Asset 4 — Témoignage fondateur (différé)

### Format
Citation courte + photo + titre.

### Condition d'utilisation
Uniquement quand un premier client réel a validé le résultat d'un audit complet.

### Ce qu'on capture
- "Ce que j'avais avant l'audit / Ce que j'ai après"
- Un changement mesurable (trafic, citations AI, position dans les réponses)
- Autorisation écrite d'Alexis pour publication

### Fallback pour le lancement
Si aucun client au jour J, remplacer par :
> "Premier audit lancé le [date] — résultats publiés sur Substack."
Crédible, honnête, et crée une attente.

---

## Recommandation pour le lancement

| Asset | Priorité | Effort | Bloquant |
|---|---|---|---|
| Sample audit excerpt (floutée) | P1 | 2–3h | Non |
| Score card visuelle | P1 | 1h (Victor) | Non |
| Analyse de cas publics | P2 | 3–4h | Non |
| Témoignage client | P3 | — | Oui (besoin d'un client) |

**Pour lancer proprement sans client :** Asset 1 + Asset 2 suffisent.
Asset 3 peut accompagner le lancement contenu sur LinkedIn/Substack.

---

## Intégration dans le site

### Section recommandée : "Ce que vous recevrez"

Placer entre les cartes de services et le pricing. Objectif : montrer la
livrabilité avant que l'acheteur arrive au prix.

**Structure suggérée :**
1. Titre : "À quoi ressemble un audit GEO ?"
2. Image : sample audit (Asset 1) avec label d'anonymisation
3. Points clés : 5 éléments qui composent le rapport
4. Score card visuelle (Asset 2) à droite ou en dessous
5. Lien : "Voir un exemple complet" → PDF téléchargeable ou page dédiée

---

## Notes pour Victor

- Tous les placeholders doivent être explicitement labellisés `[PLACEHOLDER]` dans le code
- Le PDF sample audit peut être hébergé en accès direct (pas de gate) pour maximiser la confiance
- La score card peut être un composant réutilisable pour une future feature "free audit checker"
