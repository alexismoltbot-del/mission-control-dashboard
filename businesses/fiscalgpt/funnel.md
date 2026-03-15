# FiscalGPT - Funnel self-serve v1

Updated: 2026-03-09

---

## Funnel cible — chemin par défaut

```
[Traffic] → [Landing] → [Demo / Preuve] → [Paywall / CTA] → [Paiement Stripe] → [Accès produit]
```

### Étape par étape

| # | Étape | Action utilisateur | Notre job |
|---|-------|--------------------|-----------|
| 1 | **Traffic** | Arrive via LinkedIn, Google, Substack | Contenu ciblé sur les questions fiscales fréquentes des dirigeants |
| 2 | **Landing** | Lit la promesse, identifie son problème | Headline = angle 1 de la value prop. CTA unique visible. |
| 3 | **Preuve** | Pose une question gratuite ou lit un exemple réel | 2-3 exemples de réponses FiscalGPT réelles, avec sources BOFiP |
| 4 | **Paywall** | Bute sur la limite ou voit la proposition | "3 questions gratuites, ensuite 19€/mois" — clair, pas caché |
| 5 | **Paiement** | Clique "S'abonner", entre carte | Stripe Checkout, sans friction, RGPD minimal |
| 6 | **Activation** | Pose sa première vraie question | Prompt de bienvenue, pas de setup — interface directe |

---

## Points de friction identifiés

- **Confiance** : le dirigeant veut savoir si la réponse est fiable → ajouter sources BOFiP systématiquement
- **Peur d'erreur** : ne veut pas se faire redresser → ajouter disclaimer clair + recommandation de valider avec son expert-comptable les cas complexes
- **Prix** : 19€/mois est testable, mais inconnu — A/B possible à 9€ vs 19€ vs 29€
- **Accès mobile** : les dirigeants consultent sur téléphone → la landing et le produit doivent être mobile-first

---

## Prérequis techniques (→ TASK-FG-006 pour Victor)

- [ ] Stripe Checkout branche sur le compte de la societe
- [ ] Compteur de questions (pour déclencher le paywall à 3)
- [ ] Authentification légère (email + magic link suffit)
- [ ] Analytics basique : GTM ou Plausible sur la landing

---

## Métriques à suivre (→ TASK-FG-005 pour Leo)

- Visites landing
- Taux clic CTA principal
- Taux démarrage checkout
- Taux paiement
- Taux activation (question posée dans les 10 min post-paiement)

---

## Ce qui n'est PAS dans ce funnel (volontairement)

- Pas de démo commerciale
- Pas de formulaire de capture email avant achat
- Pas de trial 14 jours — trop complexe à opérer solo
