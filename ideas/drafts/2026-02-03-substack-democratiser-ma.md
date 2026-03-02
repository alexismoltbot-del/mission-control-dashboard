# La Banque d'Affaires est Morte. Vive l'IA.

**3 février 2026**

---

## Le marché le plus opaque du capitalisme

Il y a quelque chose de profondément injuste dans le monde du M&A.

95% des deals se font entre 0 et 1 milliard de dollars. Des PME. Des startups. Des projets de vie.

Et pourtant, ces entrepreneurs — ceux qui en auraient le plus besoin — n'ont **aucun accès** aux services de banque d'affaires.

Pourquoi ?

**Parce qu'une banque d'affaires classique facture :**
- 50 à 150 000€ de fees
- 3 à 10% du deal en success fee (vente à 2M€ = 60 à 200k€)
- 6 à 18 mois de process

**Résultat :** Si ta boîte vaut moins de 10M€, tu n'existes pas pour eux.

Tu te démerdes. LinkedIn. Bouche-à-oreille. Chance.

---

## J'ai levé 14M€. Ça m'a coûté 6 mois de ma vie.

Pas l'argent. Le temps.

**6 mois à :**
- Organiser 200+ documents pour le dataroom
- Faire et refaire le pitchdeck (30 versions)
- Construire le modèle financier dans Excel
- Chercher les bons investisseurs (stalking LinkedIn)
- Rédiger 100 emails personnalisés
- Suivre qui a répondu, qui relancer, qui ghoste

Et je suis l'un des **chanceux**.

J'avais un réseau. De l'expérience. Un co-fondateur brillant. Des investisseurs existants.

**La majorité des founders ?**
- Pas de réseau
- Pas d'argent pour payer un cabinet
- Pas de temps pour passer 6 mois sur ça
- Résultat : Ils abandonnent. Ou acceptent des deals pourris.

---

## En 2026, c'est inacceptable

L'IA peut faire 80% de ce travail. En 24-48 heures.

Pas "un jour". **Maintenant.**

**Due diligence automatisée :**  
Upload tes docs → Rapport d'audit complet (financier, juridique, tech, commercial, red flags)

**Matching investisseurs :**  
Entre tes critères → Top 20 fonds avec % de fit + emails templates personnalisés

**Datapack professionnel :**  
Questionnaire 20 min → Pitchdeck + exec summary + modèle financier

**Prix : 500 à 2 000€.**

Pas 50 000€. Pas 6 mois.

---

## Pourquoi personne ne l'a fait ?

Bonne question.

Je pense que c'est parce que les gens qui **peuvent** le faire (banques d'affaires, cabinets conseil) n'ont **aucun intérêt** à le faire.

Leur business model repose sur l'opacité, les fees élevés, et le fait que tu n'as pas le choix.

Pourquoi tuer la poule aux œufs d'or ?

**Mais voilà :**
- L'IA est open source
- Les données investisseurs sont scrapables
- Les templates de datapacks sont connus
- Les founders sont prêts à payer pour de la transparence

Il suffit de quelqu'un qui **veut** le faire.

Et ce quelqu'un, c'est moi.

---

## Ce que je construis

### 1. Due Diligence IA (499€)

**Le problème :**  
Préparer une due diligence = organiser 200+ docs (contrats, financiers, RH, tech), analyser les chiffres, identifier les red flags, présenter tout ça proprement.

**Temps classique :** 2-3 mois.  
**Coût avec cabinet :** 30 à 80k€.

**La solution :**  
Tu upload tes documents. L'IA les parse, les catégorise, les analyse.

En 24-48h, tu as :
- Rapport PDF professionnel (style cabinet conseil)
- Executive summary 2 pages
- Détails par catégorie (financier, juridique, tech, commercial)
- Red flags automatiques (risques majeurs)
- Dataroom organisée et prête

**Stack :**  
GPT-4 + Claude Opus pour analyse. Supabase pour stockage. React-PDF pour génération rapport.

**Délai de dev :** 1-2 semaines.

---

### 2. listeinvestisseurs.com (29€/mois)

**Le problème :**  
Trouver les bons investisseurs = cauchemar.

Tu passes des heures sur LinkedIn à stalker des partners.  
Tu scrapes Crunchbase (incomplet).  
Tu paies 1 000$/mois pour Pitchbook (overkill).

Et au final, tu envoies 100 emails. 5 répondent. 1 est pertinent.

**La solution :**  
Une base qualifiée de 500+ investisseurs FR/EU avec :
- Tickets (min/max)
- Stades (Pre-seed, Seed, Series A-C, Growth, Buyout)
- Secteurs de prédilection
- Portfolio actuel + deals récents
- Contacts décisionnaires (partners)
- Taux de réponse moyen (crowdsourcé)

**Matching automatique :**
1. Tu rentres : Stade, montant, secteur, CA, localisation
2. L'IA sort : Top 20 investisseurs avec % de fit
3. Email templates personnalisés par investisseur
4. Tracking qui a ouvert, qui a répondu

**Sources :**  
Scraping Dealroom, Crunchbase, Pitchbook, LinkedIn. Crowdsourcing utilisateurs.

**Pricing :**  
Freemium (5 recherches/mois, top 5 résultats).  
Pro : 29€/mois (illimité, top 20, templates, tracking).

**Délai de dev :** 2-3 semaines.

---

### 3. Datapack Generator (99€)

**Le problème :**  
Faire un pitchdeck pro = 30 itérations.  
Faire un modèle financier = Excel de l'enfer.  
Faire un exec summary = réécrire 20 fois.

**Temps classique :** 100h.  
**Coût avec agence :** 5 à 15k€.

**La solution :**  
Questionnaire guidé (problème, solution, marché, équipe, traction, vision).  
L'IA génère :
- Pitchdeck 12-15 slides (templates Sequoia-style, a16z-style)
- Executive summary 2 pages
- Modèle financier 3 ans (P&L, cash flow, hypothèses, scénarios)
- One-pager (carte de visite du deal)

**Output :**  
PDF pro + fichiers sources éditables.

**Pricing :**  
Freemium (pitchdeck basique).  
Pro : 99€ one-shot (pack complet).  
Premium : 499€ (accompagnement + itérations).

**Délai de dev :** 3-5 jours.

---

## Pourquoi ça peut marcher

### 1. Le marché est énorme

**48,8 milliards de dollars** (M&A advisory mondial).  
**95% des deals < 1 Mds$** (PME/startups).  
**France : 415 deals/trimestre.**

Mais les petits (< 10M€ valorisation) n'ont **aucun accès** aux services.

**C'est ma cible.**

---

### 2. Le timing est parfait

- **IA mature :** GPT-4, Claude analysent des docs à la perfection.
- **Marché M&A en reprise :** +19% en valeur deals Europe 2025.
- **Démocratisation entrepreneuriat :** 1M+ entreprises créées/an en France.
- **Baisse taux intérêt :** Retour de l'appétit investisseurs.

---

### 3. J'ai des unfair advantages

**Vécu :**  
J'ai levé 14M€. J'ai fait le process. Je connais les galères.

**Réseau :**  
Ex-Iliad, ESSEC, écosystème tech/investisseurs.

**Crédibilité :**  
Founder qui a vraiment fait des M&A, pas un consultant qui raconte.

**Enseignement ESSEC :**  
Accès direct à 200+ futurs entrepreneurs/an.

---

### 4. Le moat est défendable

**Réseau effet :**  
Plus d'utilisateurs = meilleure data investisseurs = meilleur matching.

**Data propriétaire :**  
Benchmarks sectoriels anonymisés (personne d'autre n'a ça).

**Marque :**  
Devenir LA référence M&A pour PME/startups FR.

**Intégrations :**  
Pennylane, GitHub, DocuSign, etc. Switching cost.

---

## Le plan

### Phase 1 : Due Diligence IA (Mois 1-2)

**Pourquoi commencer par là :**
- Pain le plus fort et universel
- One-shot = cash immédiat
- Prouve la tech (IA analyse docs)
- Build in public facile (avant/après datarooms)

**Distribution :**
- LinkedIn : Posts "J'ai audité 50 startups en 2 jours avec l'IA" + démo live
- Product Hunt : Lancement
- Communautés : Koudetat, The Family, Station F
- Partenaires : Incubateurs (10% revshare pour référer)

**Objectif :** 20 clients payants à 499€ = **10k€** MRR.

---

### Phase 2 : listeinvestisseurs.com (Mois 2-3)

**Pourquoi ensuite :**
- Synergique (tu as ton audit → maintenant trouve des investisseurs)
- SaaS récurrent
- Valeur claire et immédiate

**Distribution :**
- SEO : "investisseurs seed France", "trouver business angels Paris"
- LinkedIn : Posts levées de fonds, conseils, insider tips
- Partenariats : Notaires, avocats M&A, experts-comptables (affiliation)
- Contenu : Newsletter "Deal Flow Hebdo" (deals de la semaine)

**Objectif :** 100 users payants à 29€ = **2,9k€** MRR.

---

### Phase 3 : Datapack Generator (Mois 3-4)

**Pourquoi en dernier :**
- Complète l'écosystème (audit → matching → docs)
- Upsell naturel des deux autres produits
- Forte viralité (pitchdecks partagés avec watermark)

**Distribution :**
- Viralité : "Made with [Product]" sur decks
- LinkedIn : Avant/Après pitchdecks
- Partenariats : Conseils en levée de fonds, formations

**Objectif :** 50 clients à 99€ = **5k€** one-shot/mois.

---

## Projections 6 mois

| Produit | Prix | Target Mois 6 | Revenus |
|---------|------|---------------|---------|
| Due Diligence IA | 499€ | 40/mois | 19 960€ |
| listeinvestisseurs.com | 29€/mois | 200 users | 5 800€ |
| Datapack Generator | 99€ | 100/mois | 9 900€ |
| **TOTAL** | | | **35 660€/mois** |

**ARR après 6 mois :** ~430k€.

**Marge brute :** 95% (SaaS pur).  
**Breakeven :** Mois 2-3.

---

## Les risques

### 1. Réglementation (conseil en investissement)

**Risque :** En France, conseils perso en investissement = régulé (AMF).

**Mitigation :**
- Positioning : Outil d'information, pas de conseil.
- Disclaimer clair : "Pas de conseil financier, consulter un professionnel."
- Pas de recommandations d'achat/vente, juste matching data-driven.
- Modèle : Pitchbook, Crunchbase (info publique).

---

### 2. Qualité data investisseurs

**Risque :** Base obsolète = pas de valeur.

**Mitigation :**
- Scraping automatisé hebdomadaire.
- Crowdsourcing : Users signalent erreurs/mises à jour.
- Partenariat avec fonds pour data officielle.
- Commencer par top 100 fonds (qualité > quantité).

---

### 3. Concurrence banques d'affaires

**Risque :** Les gros cabinets descendent en milieu de marché.

**Mitigation :**
- Eux = 50-150k€. Moi = 500-2000€. Marchés différents.
- Positionnement : L'assistant qui prépare AVANT de voir le banquier.
- Vitesse : 24-48h vs 6-18 mois.
- Transparence : Prix fixes vs opaques.

---

### 4. Adoption lente

**Risque :** Les entrepreneurs n'ont pas confiance en l'IA pour ça.

**Mitigation :**
- Freemium agressif (essaie gratuit, paie si utile).
- Build in public : Montrer les coulisses, la tech, les résultats.
- Testimonials : Alexis = premier client (audite tes propres sociétés).
- Garantie : "Pas satisfait, remboursé 100%."

---

## Ce que je veux prouver

**Que la banque d'affaires peut être :**
- Accessible (500€, pas 50k€)
- Rapide (48h, pas 6 mois)
- Transparente (prix fixes, process clair)
- Efficace (IA fait 80% du taf)

**Que les "petits" méritent autant que les "gros".**

Une startup qui lève 500k€ a autant besoin d'un bon datapack qu'une boîte qui lève 50M€.

Une PME qui se vend 3M€ mérite autant de professionnalisme qu'une qui se vend 300M€.

**L'IA rend ça possible.**

Et je vais le prouver.

---

## Prochaines étapes

**Cette semaine :**  
Interviewer 10 founders qui ont levé/vendu récemment.

**Questions :**
1. Quel a été le plus chiant dans le process ?
2. Combien t'as payé en conseil/services ?
3. Si un outil à 500€ avait pu faire 80% du taf, tu l'aurais pris ?

Si 8/10 disent "putain oui" → GO.

**Semaine 3-4 :**  
MVP Due Diligence IA (upload docs, parsing, analyse GPT-4, rapport PDF).

**Semaine 5-6 :**  
MVP listeinvestisseurs.com (DB 100 fonds, search, matching).

**Semaine 7-8 :**  
Launch (landing page, Stripe, LinkedIn posts, Product Hunt).

**Objectif :** 10 early adopters payants.

---

## Pourquoi je partage ça

Parce que je crois en la transparence.

Parce que je crois que partager = attirer les bonnes personnes.

Parce que si quelqu'un d'autre veut le faire avant moi, tant mieux. Le monde aura cet outil plus vite.

**Si t'as levé/vendu récemment :**  
Écris-moi. Je t'offre un audit gratuit en échange de 30 min de ton temps.

**Si tu veux suivre :**  
Je partagerai tout en public. Le code. Les metrics. Les learnings.

**Si tu penses que c'est une connerie :**  
Dis-moi pourquoi. Je veux comprendre.

---

## La vraie raison

J'aurais adoré avoir cet outil quand je levais pour Qiara.

6 mois de ma vie. Des centaines d'heures. Une charge mentale énorme.

**Juste pour organiser des docs et trouver des contacts.**

En 2026, personne ne devrait avoir à passer par là.

Les founders doivent builder. Pas faire du PowerPoint.

Alors je construis l'outil que j'aurais voulu avoir.

Pour que les 10 000 prochains entrepreneurs qui lèvent ou vendent passent 6 mois à créer de la valeur.

Pas 6 mois à chercher des investisseurs sur LinkedIn.

---

**Alexis**  
Founder @ ALMAVI  
Ancien CEO Qiara (14M€ levés)  
Prof ESSEC  
Builder compulsif

---

*PS : Si tu veux être early adopter (ou juste discuter), écris-moi sur [LinkedIn](https://linkedin.com/in/alexisbidinot) ou [alex@almavi.fr](mailto:alex@almavi.fr).*

*Je prends 10 calls cette semaine.*

🚀
