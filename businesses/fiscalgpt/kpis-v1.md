# FiscalGPT — KPIs Minimaux v1
> FG-005 | Léo | Mars 2026

---

## 1. Les 5 métriques clés (J1)

| # | Métrique | Définition |
|---|----------|------------|
| 1 | **Taux de conversion LP → essai** | % visiteurs landing page qui démarrent un essai/démo |
| 2 | **Taux d'activation** | % essais qui posent ≥3 questions (signal d'usage réel) |
| 3 | **Taux de conversion essai → payant** | % utilisateurs actifs qui passent à l'abonnement |
| 4 | **MRR** | Revenus récurrents mensuels (€) |
| 5 | **Churn mensuel** | % abonnés perdus sur le mois |

> Tout le reste (pages vues, sessions, clics) est du vanity. Ces 5 chiffres racontent l'histoire de l'argent.

---

## 2. Valeurs cibles — 30 premiers jours

| Métrique | Cible J30 | Logique |
|----------|-----------|---------|
| LP → essai | **≥ 8%** | Benchmark SaaS B2B : 5-15%. En dessous de 5% = copywriting à revoir |
| Activation | **≥ 40%** | Si < 40%, le produit ne convainc pas au premier usage |
| Essai → payant | **≥ 15%** | Benchmark product-led B2B early-stage : 10-25% |
| MRR | **≥ 500€** | ~20 clients à 25€/mois. Validation minimale du modèle |
| Churn | **< 10%/mois** | Au-delà : rétention cassée, inutile de scaler |

---

## 3. Outil de tracking recommandé : **Plausible Analytics**

**Pourquoi Plausible et pas GA4 ?**
- Setup en 30 min (vraiment)
- Pas de cookie banner (RGPD natif — crucial pour un produit fiscal)
- Dashboard lisible en 10 sec, pas en 10 min
- 9€/mois — pas de friction pour une validation

**Installation en 30 min :**

```bash
# 1. Créer un compte sur plausible.io (2 min)
# 2. Ajouter le domaine fiscalgpt.fr

# 3. Coller ce snippet dans le <head> de la landing page
<script defer data-domain="fiscalgpt.fr" src="https://plausible.io/js/script.js"></script>

# 4. Définir les goals custom (5 min dans l'interface Plausible) :
#    - Goal "essai_started"   → déclenché au clic "Démarrer l'essai"
#    - Goal "question_asked"  → déclenché à la 3ème question posée
#    - Goal "checkout_opened" → déclenché à l'ouverture du paiement
#    - Goal "payment_success" → déclenché après confirmation Stripe
```

**Pour le MRR et churn** : Stripe dashboard suffit. Pas besoin d'outil supplémentaire à J1.

---

## 4. Dashboard hebdo (10 min max)

> Chaque lundi matin, regarder ces 4 cases :

| Quoi | Où regarder | Temps |
|------|-------------|-------|
| Trafic → essais (conversion LP) | Plausible > Goals > `essai_started` | 2 min |
| Activation (≥3 questions) | Plausible > Goals > `question_asked` | 2 min |
| Nouveaux payants + MRR | Stripe > Dashboard | 3 min |
| Churn (annulations semaine) | Stripe > Subscriptions > Canceled | 1 min |

**Format compte-rendu rapide (optionnel) :**
```
Semaine X :
- LP→essai : X% (cible 8%)
- Activation : X% (cible 40%)
- Nouveaux payants : X
- MRR : X€
- Churns : X
→ Action : [une chose à faire cette semaine]
```

---

## 5. Signaux d'alarme → action immédiate

| Signal | Seuil | Action |
|--------|-------|--------|
| LP → essai **< 3%** | Pendant 7 jours | Retravailler headline + CTA de la landing page |
| Activation **< 20%** | Sur 20 essais | Revoir onboarding — ajouter une question d'exemple au chargement |
| Essai → payant **< 5%** | Sur 20 activations | Appeler/contacter 5 utilisateurs qui n'ont pas converti |
| Churn **> 20%/mois** | 2 mois consécutifs | Stop acquisition, focus rétention — interviews clients |
| MRR **= 0€** à J30 | — | Remettre en question le pricing ou le modèle d'accès |

---

*Mise à jour prévue : FG-010 après 30 jours de données réelles.*
