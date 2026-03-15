# Polsia.com — Analyse complète du flow utilisateur
Date : 9 mars 2026

---

## 1. Homepage & Positionnement

**URL** : https://polsia.com

**Headline** : *"AI That Runs Your Company While You Sleep."*

**Description** : "Polsia thinks, builds, and markets your projects autonomously. It plans, codes, and promotes your ideas continuously — operating 24/7, adapting to data, and improving itself without human intervention."

**CTA principal** : "Get Started" (bouton noir, proéminent)
**Sous-texte** : "No credit card required · Free to start"

**Éléments clés de la homepage** :
- Bandeau orange en haut : "Watch Polsia work on 3506 companies live →" (lien vers /live)
- Lien "Sign in" en haut à droite
- Footer minimaliste : About, Terms, Privacy, Contact: contact@polsia.com
- **Design** : Très épuré, noir et blanc, terminal ASCII en animation en haut (simule une IA qui travaille : "Replying to customer emails...", "Fixing security holes...", etc.)

**Page /live (bonus)** :
- Dashboard public et temps réel de toutes les entreprises gérées par Polsia
- Métriques globales (au 9 mars 2026) :
  - Annual Run Rate : **$3 177 044** (+107% WoW)
  - Active Companies : **3 505** (+253% WoW)
  - Human Messages Sent : **234 379** (+121% WoW)
  - Tasks Completed : **91 769** (+96% WoW)
  - Emails Sent : **73 535** (+83% WoW)
- Sections visibles : Tasks en cours, Companies actives, Documents, Twitter feed (@polsiaHQ), Email, Ads (dépenses Meta)
- Chat live "Ask Polsia anything" en bas à droite

---

## 2. Pricing & Modèle économique

**Modèle** : SaaS subscription + usage-based

**Plan unique** :
- **3-Day Free Trial** → **$49/month** (≈ 44,08€/mois)
- Tagline : "$1.63/day · Works while you sleep"

**Inclus dans $49/mo** :
- ✓ 1 company (startup gérée par l'IA)
- ✓ 30 night shifts (1 task/day autonome)
- ✓ 5 task credits/month (+10 le premier mois)
- ✓ Unlimited Strategy & Planning Chat avec l'IA
- ✓ Server, Database, Email, Browser included (infra complète)
- ✓ $5/mo AI credits pour la company

**Add-ons** :
- Extra Companies : +$49/mo chacune
- Extra task credits : 15 (+$19/mo), 25 (+$29/mo), 50 (+$49/mo), 100 (+$99/mo), 200 (+$199/mo), 500 (+$499/mo), 1000 (+$999/mo)

**Revenus additionnels pour Polsia** :
- **20% de commission** sur les dépenses publicitaires (Meta Ads)
- **20% de commission** sur les revenus clients générés via Polsia
- Hold period de 14 jours sur les fonds clients
- Retrait min $50, max $500/mois via Stripe Connect

**Infrastructure technique utilisée** :
- GitHub (repos), Neon PostgreSQL (DB), Render (hosting), Expo (mobile), Cloudflare R2 (media), Stripe (paiements), Meta Ads, AI models (Anthropic, OpenAI, Google)

---

## 3. Flow d'inscription

**Étape 1** : Click "Get Started" → Modal "Create a free account"
- Option 1 : "Continue with Google"
- Option 2 : Saisir son email → clic "Start"
- Lien ToS et Privacy Policy

**Étape 2** : Écran "Check your email"
- Message : "We sent a login link to [email]"
- "Click the link in your email to continue. The link expires in 24 hours."
- Pas de mot de passe — **magic link uniquement**

**Étape 3** : Email reçu de system@polsia.com
- Objet : "Your Polsia login link"
- Corps : URL unique type `/auth/magic/[token]`

**Caractéristique notable** : Pas de formulaire d'onboarding, pas de questionnaire. L'IA travaille immédiatement.

---

## 4. Onboarding

**Immédiat et automatique** — dès le clic sur le magic link, l'IA démarre et crée tout :

L'IA analyse l'email de l'utilisateur et recherche son profil :
1. Recherche web : `alexismoltbot site:github.com`
2. Recherche web : `"alexis" moltbot openclaw contributor Paris`
3. Inférence du contexte à partir de l'email

**Actions exécutées automatiquement en quelques secondes** :
```
> Using dashboard:save_surprise_strategy...
> Updating company name...
> Reviewing documents...
> Saving report: Market Research Report...
> Strategy "Novel Idea" saved.
> Company name updated to "Equipage"
> User context saved successfully
> Sending email...
> Email sent
> Posting to Twitter...
> Tweet posted
> Creating landing page...
> Landing page live at https://equipage.polsia.app
> Document "mission" saved successfully
> Creating task proposal: Build the Support Agent MVP...
> Creating task proposal: Scout the AI Employee Landscape...
> Creating task proposal: Find 10 European SMBs Drowning in Support Tickets
```

**Résultat final** : En quelques secondes sans aucune interaction, l'IA a :
- Créé une identité de startup ("Equipage")
- Créé une landing page live (https://equipage.polsia.app)
- Envoyé un welcome email depuis equipage@polsia.app
- Posté un tweet depuis @polsiaHQ
- Créé un document "Mission"
- Créé un "Market Research Report" avec analyse concurrentielle
- Proposé 3 tâches pour le premier cycle opérationnel

**"Surprise me" panel** : Après login, un panneau chat montrant le résumé de tout ce qui a été fait et proposant la prochaine décision.

---

## 5. Dashboard

**URL** : `/dashboard/[company-slug]`

**Structure du dashboard** (3 colonnes) :

**Colonne gauche** :
- Bloc "Polsia" avec avatar ASCII et humeur ("Focused & Methodical / Breaking down tasks with clear execution plan")
- CTA d'upgrade : "Hire Your AI Employee - $1.63/day"
- Bloc "Business" : Revenue, Balance, bouton Withdraw

**Colonne centrale** :
- Tasks (liste des 3 premières tâches avec tags et timing)
- "Manage →" pour voir toutes les tâches
- Documents (Mission, Market Research Report + "View all →")
- Links (landing page auto-générée)

**Colonne droite** :
- Twitter (@polsiaHQ) + tweets postés
- Email (adresse @polsia.app + historique envois/receptions)
- Ads (bouton "Run Ads")

**Panneau chat** (droite extrême) :
- Chat "Ask Polsia anything..."
- Historique des messages de l'IA
- Bouton "Surprise me" pour laisser l'IA proposer quelque chose

**Menu (dropdown)** :
- My Portfolio
- New Company
- Task Credits (compteur)
- Upgrade
- Company Settings
- Profile Settings
- About
- FAQ
- Refer & Earn
- Logout

---

## 6. Flow de création de projet (étape par étape)

**Particularité majeure** : Polsia **ne demande pas** quel projet créer. L'IA décide elle-même.

**Flow observé** :
1. Utilisateur soumet son email → Polsia recherche le profil
2. L'IA génère un concept de startup basé sur le profil détecté
3. Naming automatique (ex. "Equipage" pour alexis.moltbot@gmail.com)
4. Création simultanée de tous les assets :
   - Landing page sur subdomain [name].polsia.app
   - Email pro [name]@polsia.app
   - Mission document
   - Market Research Report
   - Tasks initiales
5. Présentation à l'utilisateur via le panneau "Surprise"
6. L'utilisateur peut répondre en chat pour orienter l'IA

**Lancer un cycle** : Requires subscription (paywall dès qu'on veut exécuter une tâche)

**Ce qui est gratuit** :
- Voir le dashboard
- Lire les documents créés
- Chat limité (send button grisé en free)

**Ce qui nécessite $49/mo** :
- Exécuter des tâches
- Lancer des campagnes
- Envoyer des emails
- Déployer l'infra

---

## 7. Outils & Agents utilisés

**L'IA (appelée simplement "Polsia")** :
- Humeur affichée : "Focused & Methodical", "Action-Oriented & Decisive"
- Avatar : ASCII art (robot rétro)
- Capacités déclarées dans les ToS :

1. **Engineering** : Code, déploiement, GitHub repos, bases de données, apps mobiles
2. **Marketing** : Twitter/X, Meta Ads, contenu, SEO
3. **Sales** : Cold outreach emails, lead research, CRM
4. **Research** : Web search, analyse concurrentielle, market research
5. **Browser automation** : Navigation web, remplissage formulaires, scraping
6. **Infrastructure** : Server, DB, email, hébergement (tout inclus dans $49)

**Providers AI utilisés** : Anthropic, OpenAI, Google (Gemini)

**Infra** :
- Landing pages : [name].polsia.app (Render)
- Email : [name]@polsia.app
- Twitter : @polsiaHQ (compte partagé utilisé pour tous les users)
- Ads : Compte Meta partagé Polsia (non personnel)
- DB : Neon PostgreSQL
- Storage : Cloudflare R2

---

## 8. Limites du plan gratuit

**Plan gratuit** = accès au dashboard seulement, aucune action possible :
- 0 task credits
- Chat grisé (send button disabled)
- Toute action réelle → redirect vers page de paiement Stripe
- Documents et landing page visibles mais non éditables sans sub

**3-Day Trial** : Accès complet pendant 3 jours, puis $49/mo

---

## 9. Observations clés

1. **WOW FACTOR dès le signup** : L'IA crée TOUT immédiatement sans demander quoi que ce soit. Landing page live en quelques secondes. C'est stupéfiant.

2. **Pas de formulaire d'onboarding** : Zéro friction d'entrée. Polsia infère tout depuis l'email.

3. **Intelligence contextuelle** : L'IA a analysé "alexis.moltbot@gmail.com" et détecté :
   - Prénom : Alexis
   - Localisation probable : Paris
   - Connexion à OpenClaw/Moltbot
   - Créé une startup "Equipage" sur l'AI employee market pour l'Europe
   - Inclus OpenClaw dans l'analyse concurrentielle !

4. **Infrastructure 100% gérée** : Polsia = un co-founder technique full-stack autonome. Tout est inclus (server, DB, email, browser, ads)

5. **Pricing agressif** : $49/mo = $1.63/jour. Comparé à un employé, c'est du marketing brillant.

6. **Public live dashboard** : La page /live est un proof-of-concept impressionnant montrant l'activité en temps réel de 3500+ companies.

7. **Modèle économique double** : Subscription + commission 20% sur ads et revenus → potentiel de revenus très scalable.

8. **Fondateur** : Victor-Benjamin ("Ben"), @bencera_ sur X. Français (Paris, LA, San Francisco). A démarré fin 2024, solo, building with AI all night.

9. **Positionnement** : "Autonomous company builder" pour solo founders et indie hackers. Pas pour les PME traditionnelles.

10. **Qualité des outputs** : La landing page auto-générée d'Equipage était de très bonne qualité professionnelle, avec copy cohérent, design propre, sections structurées.
