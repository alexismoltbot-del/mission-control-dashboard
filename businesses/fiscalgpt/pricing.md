# FiscalGPT — Hypothèse de pricing self-serve v1

Updated: 2026-03-11
Owner: franck → main (review)

---

## Hypothèse centrale

> **Plan unique à 19€/mois** avec 3 questions gratuites avant activation.

---

## Grille de pricing

| Plan | Prix | Accès | Cible |
|------|------|-------|-------|
| **Gratuit** | 0€ | 3 questions | Acquisition, découverte |
| **Solo** | 19€/mois | Illimité | Dirigeant PME, freelance |
| **Cabinet** _(futur)_ | ~79€/mois | Multi-users + export | Expert-comptable, cabinet |

---

## Rationale

### Pourquoi 19€/mois ?

- Référentiel psychologique : moins d'un repas d'affaires, moins d'une heure d'expert-comptable (≈90€/h)
- En dessous du seuil de validation hiérarchique dans une PME (achat impulsif / CB perso possible)
- Comparable aux outils SaaS d'usage quotidien : Notion (10€), ChatGPT Plus (20$)
- Margin brute >95% sur ce type de produit → le prix bas est acceptable pour l'acquisition

### Pourquoi un plan unique d'abord ?

- Évite la paralysie du choix à l'achat (règle du funnel self-serve)
- Permet de tester la valeur perçue avant de segmenter
- Simplifie la stack Stripe en phase 1

### Pourquoi 3 questions gratuites ?

- Assez pour prouver la valeur sur un vrai problème
- Pas assez pour substituer à un abonnement
- Déclencheur psychologique clair : "tu as utilisé ta 3ème question — continue pour 19€"

---

## Trade-offs et risques

| Risque | Probabilité | Mitigation |
|--------|-------------|------------|
| 19€ perçu comme cher vs. ChatGPT | Moyenne | Mettre en avant la spécialisation fiscale française + sources BOFiP → justification du premium |
| Taux de conversion libre-to-payant trop faible (<2%) | Moyenne | A/B test 9€ vs 19€ à partir de 200 visites landing |
| Churn élevé si valeur pas ressentie à J+7 | Élevée | Ajouter un "exemple de réponse sauvée" dans l'onboarding |
| Pas de plan annuel → perd le LTV | Faible | Ajouter option annuelle (190€ = 2 mois offerts) une fois le produit validé |

---

## A/B test recommandé (dès 200 visites)

- **Variant A** : 9€/mois (prix d'entrée bas, volume)
- **Variant B** : 19€/mois (prix de référence)
- **Variant C** : 29€/mois (test élasticité vers le haut)

Critère de succès : taux de paiement × ARPU. Pas juste le volume d'abonnés.

---

## Prochaine étape

- Victor branche Stripe avec le plan Solo à 19€/mois → TASK-FG-006
- Leo suit le taux clic CTA, checkout, paiement → TASK-FG-005
- Si <2% conversion à 30 jours → déclencher A/B test
