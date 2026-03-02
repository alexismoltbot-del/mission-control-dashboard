# Article Substack — "Comment j'ai cassé le prix de la prospection B2B"

**Date :** 4 février 2026  
**Format :** Article long (2000-3000 mots)  
**Angle :** Analyse de marché + build in public

---

# Comment j'ai cassé le prix de la prospection B2B

## TL;DR

J'en avais marre de payer 300€/mois pour prospecter. Alors j'ai codé mon propre outil en 2 semaines. Voilà comment ça marche, combien ça coûte, et pourquoi le marché de la prospection B2B est mûr pour se faire disrupter.

---

## Le problème : prospecter coûte un bras

Petit calcul rapide.

Pour prospecter efficacement en 2026, un commercial solo a besoin de :

1. **Un outil de ciblage** pour trouver les entreprises  
   → Sales Navigator (LinkedIn) : 80€/mois  
   → Ou Pharow : 140€/mois

2. **Un outil d'enrichissement emails**  
   → Dropcontact : 50€/mois  
   → Ou Hunter : 50€/mois

3. **Un outil d'enrichissement téléphones**  
   → Kaspr : 60€/mois  
   → Ou Datagma : 70€/mois

4. **Un CRM** pour organiser tout ça  
   → HubSpot : 50€/mois (version basique)  
   → Ou Pipedrive : 15€/mois

**Total : 300-400€/mois**

Et encore, je ne compte pas :
- Les outils d'envoi de campagnes (Lemlist, LaGrowthMachine : 60-100€/mois)
- Les outils de scraping (Phantombuster : 50€/mois)
- Les bases de données spécialisées (Societe.com Pro : 100€/mois)

**Coût réel complet : 500-700€/mois**

Pour un solo entrepreneur ou une TPE, c'est énorme.

---

## La vérité derrière les outils de prospection

Voilà ce que j'ai compris en creusant.

**90% des outils de prospection font exactement la même chose** :

1. Ils **scrapent LinkedIn** (Sales Navigator, Apollo, Pharow)
2. Ils **croisent avec des bases publiques** (INSEE, INPI, BODACC)
3. Ils **utilisent les mêmes APIs d'enrichissement** (Dropcontact, Hunter, Kaspr)
4. Ils **te revendent le tout** à 100-300€/mois

Le prix élevé ne reflète pas le coût technique. Il reflète :
- Le marketing (CPL à 50-100€)
- La complexité de l'UX (trop de features inutiles)
- Le positionnement "entreprise" (pricing opaque, devis uniquement)

**Exemple concret : Pharow**

Pharow est l'un des meilleurs outils français. Pricing :
- Plan Essentiel : 139€/mois (engagement mensuel) ou 89€/mois (annuel)
- 1000 crédits/mois (1 crédit = 1 prospect ajouté)
- Enrichissement email inclus (Dropcontact + FullEnrich + Zerobounce)
- Téléphones : abonnement séparé obligatoire (Kaspr, FullEnrich, BetterContact)

**Traduction :**
- Tu paies 139€/mois pour une interface qui te permet de chercher des entreprises
- L'enrichissement email est "inclus" mais limité à 1000 prospects/mois
- Pour les téléphones, tu dois payer un autre outil en plus

**Coût technique réel de Pharow pour 1000 prospects/mois :**
- Scraping LinkedIn : 0€ (data publique)
- Enrichissement INSEE/Pappers : 0€ (API gratuite)
- Enrichissement emails (Dropcontact) : ~60€
- Hosting + infra : ~20€

**Total coût : ~80€**  
**Prix de vente : 139€**  
**Marge : 42%**

Pas mal, mais on peut faire mieux.

---

## Comment j'ai codé mon outil en 2 semaines

### L'insight : Exa.ai

Tout a changé quand j'ai découvert **Exa.ai**.

Exa, c'est une API de recherche sémantique. Contrairement à Google, elle comprend le **langage naturel**.

**Exemple :**

Recherche classique (Google, Sales Navigator) :
```
Secteur : BTP
Région : Île-de-France
Effectif : 20-50
```

Recherche Exa :
```
"Entreprises de BTP 20-50 salariés région parisienne qui recrutent"
```

Exa comprend l'**intention**, pas juste les mots-clés.

Résultat :
- Plus précis
- Plus rapide
- Plus simple pour l'utilisateur

**Pricing Exa :**
- 10$ de crédits gratuits pour démarrer
- 5$/1000 requêtes (mode Fast/Auto/Neural, 1-25 résultats)
- 25$/1000 requêtes (26-100 résultats)

**Traduction : 0,005$ par recherche (0,5 centime).**

C'est dérisoire.

### La stack complète

Voilà ce que j'ai construit :

**1. Frontend : Next.js + Tailwind**
- Interface ultra-simple : 1 prompt, 1 bouton
- Résultats affichés en tableau
- Export CSV en 1 clic

**2. Backend : Next.js API routes**
- Route `/api/search` : appelle Exa.ai
- Route `/api/enrich` : croise avec Pappers + Dropcontact
- Route `/api/export` : génère le CSV

**3. Database : Supabase (Postgres)**
- Stockage des recherches (historique)
- Gestion des crédits utilisateurs
- Système d'authentification

**4. Payments : Stripe**
- Plan Solo : 29€/mois
- Plan Pro : 79€/mois
- Achat de crédits à la carte

**5. Hosting : Vercel**
- 100% serverless
- Coût : 0€ jusqu'à 1000 users
- Auto-scaling

**Temps de dev : 2 semaines**  
**Coût total : 0€** (tout en freemium jusqu'à scale)

### Le flow utilisateur

1. **User tape un prompt en français**  
   Exemple : "Restaurants Lyon 10-50 salariés"

2. **Exa.ai recherche les entreprises**  
   → Trouve 43 résultats en 2 secondes

3. **Pappers enrichit les données**  
   → SIREN, CA, effectif, dirigeant (API gratuite)

4. **Dropcontact trouve les emails**  
   → Emails vérifiés des dirigeants (0,06€/email)

5. **GPT-4 extrait le téléphone depuis le site web**  
   → Scraping + extraction structurée (0,02$/entreprise)

6. **Export CSV en 1 clic**  
   → Colonnes : Nom, SIREN, CA, Effectif, Dirigeant, Email, Téléphone, Site

**Coût total par entreprise enrichie : ~0,12€**

---

## Le business model

### Problème initial : les coûts explosent

Version 1 du pricing :
- 29€/mois
- Recherches illimitées
- Enrichissement illimité

**Calcul :**
- Utilisateur moyen : 50 recherches × 50 entreprises = 2500 entreprises/mois
- Coût opérationnel : 2500 × 0,12€ = 300€
- Marge : -271€ ❌

**Conclusion : économie négative si enrichissement illimité.**

### Solution : système de crédits

Nouveau pricing :

**Plan Solo : 29€/mois**
- Recherches illimitées (coût quasi-nul grâce à Exa)
- Export CSV basique (nom, SIREN, CA, effectif, dirigeant) : GRATUIT
- 100 crédits d'enrichissement inclus
  - 1 crédit = 1 email enrichi (coût 0,10€, vendu 0,15€)
  - 10 crédits = 1 téléphone enrichi (coût 1€, vendu 1,50€)

**Achat de crédits supplémentaires :**
- Pack 100 crédits : 15€
- Pack 500 crédits : 60€
- Pack 1000 crédits : 100€

**Économie unitaire révisée :**
- Abonnement 29€/mois = coûts fixes (Exa + hosting) ~10€ → marge 19€
- Enrichissement email : coût 0,10€, vendu 0,15€ → marge 0,05€
- Enrichissement téléphone : coût 1€, vendu 1,50€ → marge 0,50€

**Marge globale : 60-70%** ✅

---

## Comparaison avec la concurrence

| Outil | Pricing | Recherches | Emails | Téléphones | Marge estimée |
|-------|---------|------------|--------|------------|---------------|
| **Pharow** | 139€/mois | Limité | Inclus (1000/mois) | Abonnement séparé | 40-50% |
| **Sales Navigator** | 80€/mois | Illimité | ❌ Non | ❌ Non | 70-80% |
| **Apollo.io** | 99$/user/mois | Illimité | Limité | Limité | 50-60% |
| **ProspectPilot (moi)** | 29€/mois | Illimité | 100 crédits | 10 crédits | 60-70% |

**Différenciation :**
- **5x moins cher** que Pharow
- **Plus complet** que Sales Navigator (emails/téléphones inclus)
- **Interface ultra-simple** (prompt vs filtres complexes)
- **Transparent** (pricing public, pas de devis)

---

## Taille de marché

### Marché France

**Cibles principales :**

1. **Solopreneurs / freelances commerciaux** : ~500k personnes actives
   - Taux de conversion potentiel : 0,5% = 2 500 clients
   - ARR potentiel : 2 500 × 29€ × 12 = 870k€

2. **TPE/PME avec fonction commerciale** : ~200k entreprises
   - Taux de conversion potentiel : 0,2% = 400 clients
   - ARR potentiel : 400 × 79€ × 12 = 379k€

**Total marché accessible Year 1 : ~1,2M€ ARR**

### Benchmark marché global

- **Pharow** : ~10M€ ARR estimé (source : estimations basées sur équipe + levées)
- **Sales Navigator** : ~1Md$ ARR (LinkedIn)
- **Apollo.io** : ~100M$ ARR (levée récente)
- **ZoomInfo** : ~1,2Md$ ARR (public)

**Conclusion :** Le marché de la prospection B2B = dizaines de milliards de dollars.

Même une toute petite part = business viable.

---

## Go-to-market

### Phase 1 : Early adopters (Mois 1-2)

**Objectif : 50 clients payants**

**Stratégie :**
1. **LinkedIn organique** :
   - Poster le process : "Comment j'ai trouvé 100 prospects en 10 minutes"
   - Démo vidéo : Prompt → Résultats → Export
   - Partager les témoignages des premiers clients

2. **ProductHunt** :
   - Launch avec early bird pricing (19€/mois au lieu de 29€)
   - Lifetime deal pour les 100 premiers (249€ one-time)

3. **Réseau direct** :
   - Entrepreneurs ESSEC (mon réseau de cours)
   - Ex-Free/Iliad (mon ancien réseau pro)
   - Prospects Clawdbot qui n'ont pas signé

**Résultat attendu : 50 clients × 29€ = 1 450€ MRR**

### Phase 2 : Traction (Mois 3-6)

**Objectif : 200 clients payants**

**Leviers :**
1. **SEO agressif** :
   - "Trouver des prospects B2B France"
   - "Alternative Pharow moins chère"
   - "Prospection B2B sans Sales Navigator"

2. **Contenu LinkedIn régulier** :
   - 2x/semaine : cas d'usage, résultats clients
   - Thread "J'ai trouvé X prospects en Y minutes pour [secteur]"

3. **Partenariats affiliés** :
   - Influenceurs prospection B2B (commission 30% first year)
   - Formateurs LinkedIn / Growth

**Résultat attendu : 200 clients × 29€ = 5 800€ MRR**

### Phase 3 : Scale (Mois 6-12)

**Objectif : 500-1000 clients payants**

**Leviers :**
1. **Ads payants** :
   - Google Ads sur mots-clés concurrents
   - LinkedIn Ads (ciblage commerciaux, dirigeants PME)
   - Budget : 2-3k€/mois, CAC cible <100€

2. **Programme ambassador** :
   - Top users deviennent affiliés (40% commission récurrente)

3. **Features avancées** :
   - Détection appels d'offres publics
   - Scoring automatique des prospects
   - Campagnes email intégrées

**Résultat attendu : 500 clients × 29€ = 14 500€ MRR**

---

## Projections financières

### Scénario conservateur (12 mois)

| Mois | Clients | MRR | Coûts Ops | Marge |
|------|---------|-----|-----------|-------|
| M1 | 20 | 580€ | 200€ | 380€ |
| M2 | 50 | 1 450€ | 400€ | 1 050€ |
| M3 | 100 | 2 900€ | 700€ | 2 200€ |
| M6 | 250 | 7 250€ | 1 500€ | 5 750€ |
| M12 | 500 | 14 500€ | 3 000€ | 11 500€ |

**ARR Year 1 : ~174k€**  
**Marge nette : 60-70%**

### Scénario optimiste (12 mois)

| Mois | Clients | MRR | Coûts Ops | Marge |
|------|---------|-----|-----------|-------|
| M3 | 200 | 5 800€ | 1 200€ | 4 600€ |
| M6 | 500 | 14 500€ | 3 000€ | 11 500€ |
| M12 | 1000 | 29 000€ | 6 000€ | 23 000€ |

**ARR Year 1 : ~348k€**  
**Marge nette : 70-80%**

---

## Risques & mitigation

### Risque 1 : Coûts d'enrichissement explosent

**Mitigation :**
- Système de crédits strict (pas d'enrichissement illimité)
- Pattern matching emails maison pour réduire dépendance Dropcontact
- Scraping téléphones gratuit avant API payante

### Risque 2 : Concurrence féroce (Pharow, Sales Navigator)

**Mitigation :**
- Positionnement "simple et accessible" vs "complet et complexe"
- Pricing agressif pour early adopters (19€/mois launch)
- Features différenciantes (AO publics, scoring IA)

### Risque 3 : Dépendance Exa.ai

**Mitigation :**
- Développer scraping maison en parallèle
- Intégrer d'autres sources (Bright Data, Apify)
- Architecture modulaire (facile de swapper Exa)

### Risque 4 : RGPD / légalité prospection

**Mitigation :**
- Disclaimer clair : "Données publiques uniquement"
- Pas de stockage long terme des données persos
- Opt-out facile pour entreprises qui veulent être retirées
- Conformité CNIL (pas de scraping emails persos, uniquement pros)

---

## Conclusion : pourquoi je partage tout ça ?

Parce que je crois à la **transparence radicale**.

Dans le monde du SaaS, tout le monde cache ses cartes :
- Pricing opaque
- Économie unitaire secrète
- Coûts techniques non-divulgués

Résultat : les nouveaux entrants ont peur de se lancer.

**Mon pari :** en partageant tout (stack, pricing, coûts, marges), je crée de la confiance.

Et la confiance, c'est le meilleur marketing.

---

## Prochaines étapes

Si tu veux tester la beta, c'est par ici : [lien]

Les 20 premiers paient 19€/mois au lieu de 29€.

Et si tu veux suivre la construction en public, je poste régulièrement sur LinkedIn : [lien]

Let's build. 🚀

---

**Alexis Bidinot**  
Fondateur ALMAVI  
Ex-DG Iliad/Free, ex-CEO Qiara  
Prof entrepreneuriat ESSEC

---

*Article écrit par Bidi (mon assistant IA) à 3h du matin.  
Oui, je construis avec l'IA. Et j'assume.*
