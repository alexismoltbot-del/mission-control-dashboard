# 🏛️ Réponse IA aux Appels d'Offres Publics

**Date :** 31 janvier 2026  
**Statut :** Idée Tier 1 — Analyse complète  
**Délai MVP :** 2-3 semaines  
**Potentiel :** ⭐⭐⭐⭐⭐

---

## 📋 Résumé Exécutif

**Pitch :** "Tu uploades ton DCE, tu reçois ton mémoire technique en 2 heures."

**Problème :** Les PME perdent des dizaines d'heures sur chaque appel d'offres, souvent pour ne pas gagner. Le processus est complexe, chronophage, et décourageant.

**Solution :** Un outil IA qui :
1. Analyse automatiquement le DCE (RC, CCTP, CCAP)
2. Identifie les points-clés, critères et pièges
3. Génère un mémoire technique personnalisé
4. Pré-remplit les formulaires administratifs (DC1, DC2, DUME)

**Marché :** 235 Mds€ de marchés publics/an en France. 400K+ entreprises répondent régulièrement.

**Pricing :** 
- Self-service : 99-199€ par AO
- Accompagné : 1 500-2 500€ par AO (avec relecture humaine)

---

## 🎯 Le Problème

### La douleur des PME face aux marchés publics

**Chiffres clés :**
- 62% des titulaires de marchés publics sont des TPE/PME
- Mais elles ne captent que ~25% de la valeur (soit ~60 Mds€/an)
- Pourquoi ? Elles abandonnent face à la complexité

**Les 5 douleurs majeures :**

| Douleur | Impact | Fréquence |
|---------|--------|-----------|
| **Temps de lecture DCE** | 4-8h par dossier | Chaque AO |
| **Rédaction mémoire technique** | 20-40h | Chaque AO |
| **Admin (DC1, DC2, DUME)** | 2-4h | Chaque AO |
| **Veille des AO pertinents** | 5-10h/semaine | Continu |
| **Taux d'échec élevé** | ~80% de perdants | Démotivant |

**Citation parlementaire (Nov 2023) :**
> "La préparation d'une offre de qualité est rendue difficile car les entreprises n'ont pas le temps de rassembler les informations nécessaires pour préparer une proposition compétitive."
> — Question écrite n°07873, Sénatrice Christine Herzog

### Qui souffre le plus ?

1. **PME du BTP** (électriciens, plombiers, maçons, VRD)
   - Marge faible, temps = argent
   - Pas de service commercial dédié
   - Répondent "au feeling"

2. **ESN et Cabinets de conseil**
   - AO techniques complexes (CCTP de 50+ pages)
   - Questionnaires sécurité/RGPD/RSE
   - Concurrence féroce

3. **Services (nettoyage, gardiennage, restauration)**
   - Volumes importants, marges serrées
   - Beaucoup d'AO = besoin d'industrialiser

4. **Formation professionnelle**
   - Marchés Pôle Emploi, Régions, OPCO
   - Très administratifs

---

## 🔍 Analyse de la Concurrence

### France — Les acteurs existants

| Acteur | Positionnement | Cible | Pricing estimé | Forces | Faiblesses |
|--------|---------------|-------|----------------|--------|------------|
| **Tenderbolt** | IA analyse + mémoire | ETI/Grands comptes | Sur devis (élevé) | Tech avancée, ROI x7 | Trop cher pour PME |
| **Tengo** | Veille + analyse + réponse | PME/ETI | Sur devis | UX moderne, clients connus | Pas de prix public |
| **Libel** | Logiciel complet | PME BTP | ~200-500€/mois | Intégré, formation | Interface datée |
| **TenderNow** | Gestion mémoire tech | Tous | Sur devis | Spécialisé | Peu de visibilité |
| **Sendao** | Dépôt dématérialisé | Tous | Service au dossier | Externalisation totale | Pas d'IA |

### International — Références

| Acteur | Marché | Pricing | Notes |
|--------|--------|---------|-------|
| **Loopio** | US/Global | ~$23K/an (mid-size) | Leader RFP, très enterprise |
| **Responsive** | US | Enterprise | Ex-RFPIO |
| **AutoRFP.ai** | US | SaaS | Pure IA |
| **Arphie** | US | SaaS | Moderne, UX focus |

### Gap de marché identifié

> **Il n'existe pas d'offre simple, accessible et IA-native pour les PME françaises.**

Les solutions existantes sont soit :
- ❌ Trop chères (pricing enterprise)
- ❌ Trop complexes (logiciels lourds à adopter)
- ❌ Pas assez intelligentes (pas de vraie IA)
- ❌ Orientées grands comptes

**L'opportunité :** Créer le "ChatGPT des appels d'offres" — simple, rapide, abordable.

---

## 💡 La Solution

### Vision produit

**Nom de travail :** TurboAO, RéponseAO, AO.ai, OffreExpress

**Tagline :** "Ton mémoire technique en 2 heures, pas 2 jours."

### User flow

```
1. UPLOAD
   └─ Dépose ton DCE (PDF ou ZIP)
   
2. ANALYSE (2 min)
   └─ IA extrait : objet, critères, délais, pièces demandées
   └─ Score Go/No-Go automatique
   └─ Points d'attention et risques
   
3. PERSONNALISATION (15 min)
   └─ Questionnaire rapide sur ton entreprise
   └─ Tes références similaires
   └─ Tes certifications, moyens, équipe
   
4. GÉNÉRATION (5 min)
   └─ Mémoire technique adapté au CCTP
   └─ Réponses aux critères de notation
   └─ Formulaires pré-remplis (DC1, DC2, DUME)
   
5. RELECTURE (optionnel)
   └─ Version Premium : relecture humaine en 24h
   
6. EXPORT
   └─ PDF prêt à déposer
   └─ Tous les fichiers organisés
```

### Features clés

| Feature | MVP | V2 | V3 |
|---------|-----|----|----|
| Upload DCE multi-format | ✅ | ✅ | ✅ |
| Analyse automatique | ✅ | ✅ | ✅ |
| Score Go/No-Go | ✅ | ✅ | ✅ |
| Génération mémoire technique | ✅ | ✅ | ✅ |
| Pré-remplissage DC1/DC2 | | ✅ | ✅ |
| Génération DUME | | ✅ | ✅ |
| Base de références client | | ✅ | ✅ |
| Veille AO personnalisée | | | ✅ |
| Intégration Chorus Pro | | | ✅ |
| Multi-utilisateurs équipe | | | ✅ |

### Différenciation

1. **Prix transparent** — Pas de "contactez-nous", prix affichés
2. **Time-to-value < 10 min** — Upload → résultat sans formation
3. **Focus PME** — Pas de features inutiles, juste l'essentiel
4. **IA state-of-the-art** — Claude/GPT-4o, pas des prompts basiques
5. **Option humaine** — Relecture par expert si besoin

---

## 📊 Business Model

### Option A : SaaS Self-Service

| Plan | Prix | Contenu |
|------|------|---------|
| **Découverte** | Gratuit | 1 analyse/mois (sans génération) |
| **Starter** | 99€/AO | Analyse + génération mémoire |
| **Pro** | 299€/mois | 5 AO/mois + base références |
| **Team** | 599€/mois | Illimité + multi-users + API |

**LTV estimée :** 
- Starter ponctuel : 99€
- Pro annuel : 3 588€
- Team annuel : 7 188€

### Option B : Service Accompagné

| Offre | Prix | Contenu |
|-------|------|---------|
| **Express** | 500€ | Analyse + génération brute |
| **Standard** | 1 500€ | + relecture + ajustements |
| **Premium** | 2 500€ | + accompagnement stratégique |
| **Abonnement** | 800€/mois | 2 AO/mois + support prioritaire |

**Comparable :** Consultants AO facturent 2-5K€ par dossier actuellement.

### Option C : Hybride (recommandée pour démarrer)

**Phase 1 (0-20 clients) :** Service accompagné à 1 500€/AO
- Valider le product-market fit
- Collecter des retours qualité
- Générer du CA rapidement
- Affiner l'IA avec des cas réels

**Phase 2 (20-100 clients) :** Lancer le SaaS self-service
- Automatiser ce qui fonctionne
- Prix plus bas, volume plus élevé

---

## 🛠️ Stack Technique MVP

### Architecture

```
┌─────────────────────────────────────────────────┐
│                    Frontend                      │
│         Next.js + Tailwind + Shadcn             │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────┐
│                    Backend                       │
│              Supabase (Auth + DB)               │
│         + Edge Functions (Deno/Node)            │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────┐
│                   IA Layer                       │
│  Claude 3.5 Sonnet (analyse) + GPT-4o (rédac)  │
│            + Embeddings (recherche)             │
└─────────────────────────────────────────────────┘
```

### Services

| Composant | Service | Coût estimé |
|-----------|---------|-------------|
| Auth + DB | Supabase | 25€/mois |
| Hosting | Vercel | 20€/mois |
| PDF parsing | PDF.co ou Unstructured | 50€/mois |
| IA principale | Anthropic API | ~2€/AO analysé |
| IA rédaction | OpenAI API | ~3€/mémoire |
| Storage | Supabase/S3 | 10€/mois |
| **Total fixe** | | **~105€/mois** |
| **Coût variable** | | **~5€/AO** |

### Marge

- Prix de vente : 99€/AO
- Coût IA : 5€/AO
- **Marge brute : 95%** ✅

---

## 📈 Go-To-Market

### Phase 1 : Service (Mois 1-2)

**Objectif :** 10 clients à 1 500€ = 15K€

**Actions :**
1. **LinkedIn** — Posts sur les douleurs AO + témoignages
2. **Réseau direct** — Entrepreneurs PME dans le cercle
3. **CCI/FFB** — Partenariats avec fédérations BTP
4. **Webinaires** — "Comment gagner plus d'AO avec l'IA"

**Cibles prioritaires :**
- PME BTP (20-100 salariés)
- ESN locales
- Entreprises de services (nettoyage, sécurité)

### Phase 2 : SaaS (Mois 3-6)

**Objectif :** 100 utilisateurs actifs

**Actions :**
1. **SEO** — "répondre appel d'offres", "mémoire technique IA"
2. **Product Hunt** — Lancement France
3. **Content** — Blog/YouTube sur les marchés publics
4. **Affiliés** — Experts-comptables, avocats d'affaires

### Phase 3 : Scale (Mois 6+)

- Intégrations (plateformes d'AO, Chorus Pro)
- Expansion européenne (JOUE)
- API pour intégrateurs

---

## 📊 Scoring

| Critère | Note /5 | Commentaire |
|---------|---------|-------------|
| **Douleur client** | ⭐⭐⭐⭐⭐ | Énorme, quantifiable (20-40h/AO) |
| **Taille marché** | ⭐⭐⭐⭐⭐ | 235 Mds€ de marchés, 400K+ entreprises |
| **Concurrence** | ⭐⭐⭐⭐☆ | Existe mais pas de leader PME abordable |
| **Faisabilité MVP** | ⭐⭐⭐⭐☆ | 2-3 semaines avec les bons outils |
| **Marge** | ⭐⭐⭐⭐⭐ | 95% sur le SaaS |
| **Distribution** | ⭐⭐⭐⭐☆ | LinkedIn + réseau + fédérations |
| **Récurrence** | ⭐⭐⭐⭐☆ | PME qui gagnent reviennent |
| **Barrière entrée** | ⭐⭐⭐☆☆ | Moyenne (IA + expertise métier) |
| **Fit personnel** | ⭐⭐⭐⭐☆ | Connais le milieu PME/BTP |
| **Passion** | ⭐⭐⭐☆☆ | Moins sexy que l'IA psy mais rentable |
| **TOTAL** | **42/50** | **GO FORT** |

---

## 🚀 Roadmap MVP (2 semaines)

### Semaine 1 : Core

| Jour | Tâche |
|------|-------|
| J1 | Setup projet (Next.js + Supabase + Auth) |
| J2 | Upload + parsing PDF (Unstructured/PDF.co) |
| J3 | Prompt engineering analyse DCE |
| J4 | UI analyse (points-clés, score, risques) |
| J5 | Questionnaire profil entreprise |

### Semaine 2 : Génération

| Jour | Tâche |
|------|-------|
| J6 | Prompt engineering mémoire technique |
| J7 | Génération structurée par sections |
| J8 | Export PDF + UI review |
| J9 | Paiement Stripe + dashboard |
| J10 | Tests + deploy + landing page |

### Bonus (Semaine 3)

- Pré-remplissage DC1/DC2
- Base de références
- Onboarding email

---

## 💬 Scripts Marketing

### Pitch LinkedIn (problème)

> **Tu passes 40 heures sur un appel d'offres pour le perdre ?**
>
> Les PME françaises laissent des milliards sur la table.
> 
> Pas parce qu'elles sont mauvaises.
> Parce qu'elles n'ont pas le temps de bien répondre.
>
> 62% des titulaires de marchés publics sont des PME...
> Mais elles ne captent que 25% de la valeur.
>
> Le problème ? La rédaction du mémoire technique.
> 20-40h par dossier. Sans garantie de gagner.
>
> Et si une IA pouvait te faire ça en 2 heures ?
>
> Je cherche 10 PME pour tester mon outil.
> Commente "AO" si tu réponds régulièrement aux marchés publics.

### Pitch direct (WhatsApp/DM)

> Salut [Prénom],
>
> Je sais que tu réponds à des AO pour [Entreprise].
>
> Question directe : combien de temps tu passes sur un mémoire technique ?
>
> Je teste un truc qui génère un premier jet en 2h au lieu de 2 jours.
> Tu uploades le DCE, l'IA analyse et rédige.
>
> Si t'es partant pour tester sur ton prochain AO, je te le fais gratuitement.
> En échange tu me dis ce qui marche et ce qui manque.
>
> Ça te dit ?

---

## ⚠️ Risques et Mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Qualité mémoire insuffisante | Moyenne | Élevé | Relecture humaine en option |
| Adoption lente PME | Moyenne | Moyen | Démarrer en service, pas en SaaS |
| Concurrence prix | Faible | Moyen | Focus valeur, pas prix |
| Réglementation IA | Faible | Moyen | Transparence sur l'usage IA |
| Complexité DCE variés | Moyenne | Moyen | Spécialisation par secteur |

---

## 📌 Prochaines Actions

### Cette semaine
1. [ ] Valider l'appétit avec 5 contacts PME/BTP
2. [ ] Créer une landing page simple (waitlist)
3. [ ] Tester l'analyse DCE sur 3 vrais dossiers

### Ce mois
4. [ ] Développer le MVP
5. [ ] Trouver 3 beta-testeurs
6. [ ] Premier client payant

### Ce trimestre
7. [ ] 10 clients à 1 500€ = 15K€
8. [ ] Lancer le SaaS self-service
9. [ ] Premier contenu SEO

---

## 🔗 Ressources

**Plateformes d'AO :**
- BOAMP : https://www.boamp.fr
- JOUE : https://ted.europa.eu
- Place : https://www.marches-publics.gouv.fr
- Maximilien (IDF) : https://marches.maximilien.fr

**Concurrents à suivre :**
- Tenderbolt : https://tenderbolt.ai
- Tengo : https://tengo.cc
- Libel : https://libel.fr

**Documentation juridique :**
- Code de la commande publique
- Guide OECP pour les TPE/PME

---

*Draft créé le 31 janvier 2026 — Session de nuit*
*Prêt pour review par Alexis*
