#!/usr/bin/env python3
"""Crée la page Notion 🏭 Usine à Business — Toutes les idées pour Alexis."""
import json
import requests
import time
import sys

NOTION_KEY = "ntn_Y88956521525zC350AAPbSgRT0XmxoPpz7inJOrztWUeDu"
PARENT_ID = "31821238-e138-81eb-9798-d3ea73071eea"

headers = {
    "Authorization": f"Bearer {NOTION_KEY}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

# ── helpers ────────────────────────────────────────────────────────────────

def rt(content, bold=False, italic=False, color="default"):
    return {
        "type": "text",
        "text": {"content": str(content)[:2000]},
        "annotations": {"bold": bold, "italic": italic, "color": color,
                        "strikethrough": False, "underline": False, "code": False}
    }

def h1(content):
    return {"object":"block","type":"heading_1","heading_1":{"rich_text":[rt(content)],"color":"default"}}

def h2(content):
    return {"object":"block","type":"heading_2","heading_2":{"rich_text":[rt(content)],"color":"default"}}

def h3(content):
    return {"object":"block","type":"heading_3","heading_3":{"rich_text":[rt(content)],"color":"default"}}

def p(content="", bold=False, italic=False):
    if not content:
        return {"object":"block","type":"paragraph","paragraph":{"rich_text":[]}}
    return {"object":"block","type":"paragraph","paragraph":{"rich_text":[rt(content,bold=bold,italic=italic)]}}

def p2(parts):
    """Paragraph with multiple rich text parts: list of (text, bold, italic)"""
    rich = [rt(t, bold=b, italic=i) for t,b,i in parts]
    return {"object":"block","type":"paragraph","paragraph":{"rich_text":rich}}

def bl(content):
    return {"object":"block","type":"bulleted_list_item","bulleted_list_item":{"rich_text":[rt(content)]}}

def nl(content):
    return {"object":"block","type":"numbered_list_item","numbered_list_item":{"rich_text":[rt(content)]}}

def div():
    return {"object":"block","type":"divider","divider":{}}

def callout(content, emoji="💡"):
    return {"object":"block","type":"callout","callout":{"rich_text":[rt(content)],"icon":{"type":"emoji","emoji":emoji}}}

def quote(content):
    return {"object":"block","type":"quote","quote":{"rich_text":[rt(content)]}}

def table_row(cells):
    """cells: list of str"""
    return {
        "type": "table_row",
        "table_row": {
            "cells": [[rt(c)] for c in cells]
        }
    }

def table(header_row, data_rows):
    """Create a table block with header and data rows."""
    children = [table_row(header_row)] + [table_row(r) for r in data_rows]
    return {
        "object": "block",
        "type": "table",
        "table": {
            "table_width": len(header_row),
            "has_column_header": True,
            "has_row_header": False,
            "children": children
        }
    }

def create_page(children):
    resp = requests.post(
        "https://api.notion.com/v1/pages",
        headers=headers,
        json={
            "parent": {"page_id": PARENT_ID},
            "icon": {"type": "emoji", "emoji": "🏭"},
            "properties": {
                "title": {"title": [{"text": {"content": "🏭 Usine à Business — Toutes les idées"}}]}
            },
            "children": children
        }
    )
    data = resp.json()
    if resp.status_code != 200:
        print("ERROR creating page:", json.dumps(data, indent=2))
        sys.exit(1)
    return data["id"]

def append(block_id, children):
    """Append children to a block, chunked at 90 per call."""
    for i in range(0, len(children), 90):
        chunk = children[i:i+90]
        resp = requests.patch(
            f"https://api.notion.com/v1/blocks/{block_id}/children",
            headers=headers,
            json={"children": chunk}
        )
        data = resp.json()
        if resp.status_code != 200:
            print(f"ERROR appending chunk {i//90}:", json.dumps(data, indent=2))
            sys.exit(1)
        time.sleep(0.4)
    return True

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 1 — RÉSUMÉ EXÉCUTIF
# ══════════════════════════════════════════════════════════════════════════════

section1 = [
    h1("📊 Section 1 — Résumé exécutif"),
    div(),
    callout("35 idées analysées • 4 ans de runway • 410k€ cash • Build solo avec IA • Ex-DG Iliad, fondateur Qiara (14M€ levés)", "🎯"),
    p(),
    h2("Nombre total d'idées"),
    p("35 idées distinctes identifiées entre 2019 et 2026, dans 7 catégories. Des nano-projets weekends aux grandes thèses de venture."),
    p(),
    h2("🏆 Top 5 recommandées (avec justification)"),
    p(),
    p2([("1. 🧾 FiscalGPT Paywall", True, False), (" — Le plus évident. Base de 14 000 articles déjà prête, 1 000 questions posées sans paywall. C'est du CA qui attend. TurboTax à la française. Score : 21/25", False, False)]),
    p2([("2. 🗂️ Administratif AI (Office Manager in house)", True, False), (" — Douleur n°1 d'Alexis : courrier, URSSAF, mutuelle, contrats perso. Contexte famille (3 enfants). Market = toutes les familles + PME. Score : 21/25", False, False)]),
    p2([("3. 📊 Business Review AI", True, False), (" — Vécu Qiara (2-3h chaque lundi), 200 CEOs ont répondu au post LinkedIn sur les slides. Pain validé. MVP réalisable en 2 semaines. Score : 20/25", False, False)]),
    p2([("4. 👴 Silver Economy / Safe@home", True, False), (" — Passion déclarée, stack proche de Qiara (IoT+IA), mégatrend 30 ans, modèle B2B2C mutuelles/collectivités. Nécessite partenaires. Score : 20/25", False, False)]),
    p2([("5. 🏭 Clawdbot PME / SaaS Automation", True, False), (" — Assets déjà là (6 agents opérationnels), marché 1M+ PME françaises, positionnement unique. Score : 19/25", False, False)]),
    p(),
    h2("⚡ Matrice Effort / Impact"),
    p("Lecture : Effort = temps pour MVP solo avec IA | Impact = MRR potentiel à 6 mois"),
    table(
        ["Idée", "Effort", "Impact", "Quadrant"],
        [
            ["FiscalGPT Paywall", "Faible (2 sem)", "Fort (10-30k MRR)", "🟢 Quick Win"],
            ["Administratif AI", "Moyen (1-2 mois)", "Fort (5-20k MRR)", "🟢 Strategic"],
            ["Business Review AI", "Faible (2-3 sem)", "Moyen (5-15k MRR)", "🟢 Quick Win"],
            ["Silver Economy", "Très fort (6 mois+)", "Très fort (50k+ MRR)", "🔵 Big Bet"],
            ["Clawdbot PME", "Moyen (1 mois)", "Fort (10-30k MRR)", "🟢 Strategic"],
            ["Agent Formaliste", "Moyen (1-2 mois)", "Fort (5-20k MRR)", "🟢 Strategic"],
            ["Mental Health AI", "Fort (3 mois+)", "Très fort (50k+ MRR)", "🔵 Big Bet"],
            ["AI Contract Checker", "Faible (2 sem)", "Moyen (5-15k MRR)", "🟢 Quick Win"],
            ["Formation IA présentiel", "Très faible (3 j)", "Faible (3-5k MRR)", "🟡 Side Income"],
            ["Tableau amortissement.fr", "Très faible (1 j)", "Très faible (<1k MRR)", "⚪ Fun/Vitrine"],
            ["GTA/Eurecia concurrent", "Très fort (6 mois)", "Moyen", "🔴 Avoid"],
            ["M&A AI", "Fort (3 mois)", "Moyen", "⚠️ Long shot"],
        ]
    ),
    p(),
]

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 2 — LES 5 PRIORITÉS D'ALEXIS
# ══════════════════════════════════════════════════════════════════════════════

section2 = [
    div(),
    h1("🎯 Section 2 — Les 5 priorités d'Alexis (analyse détaillée)"),
    div(),

    # ── PRIORITÉ 1 ───────────────────────────────────────────────
    h2("🗂️ Priorité 1 — Automatisation Administratif (perso + petits pros)"),
    p(),
    p2([("📌 Problème résolu :", True, False), (" L'administratif français est un enfer — courrier postal, URSSAF, mutuelle, CAF, impôts, contrats de prestataires. Une famille avec enfants passe 5-10h/mois à gérer ça. Les PME sans secrétaire administrative : idem.", False, False)]),
    p2([("💡 Solution :", True, False), (" Un agent IA 'Office Manager in house' — tu lui donnes accès à ta boîte mail, ton scanner, tes comptes Ameli/mutuelle/banque. Il trie, résume, priorise et propose les actions (valider en 1 clic). Il envoie les courriers via API La Poste. Il gère les résiliations, les relances, les échéances.", False, False)]),
    p2([("🇫🇷 Taille de marché :", True, False), (" 30M de foyers imposables + 1,5M de TPE/PME sans assistante. Willingness to pay : 30-100€/mois (équivalent d'une assistante 2h). TAM France : 500M€+", False, False)]),
    p2([("⚔️ Concurrents :", True, False), (" Papiers.fr (très limité), Airmail AI (US), Notion AI (générique). Pas de concurrent direct verticalisé sur l'admin français.", False, False)]),
    p2([("🏗️ Assets d'Alexis :", True, False), (" Clawdbot opérationnel (WhatsApp → actions), 6 agents IA déjà actifs, vécu perso fort (3 enfants, holding, Qiara), réseau PME.", False, False)]),
    p2([("⏱️ Temps MVP :", True, False), (" 3-4 semaines (scanner courrier → IA → to-do → 1 clic)", False, False)]),
    p2([("💰 MRR potentiel 6 mois :", True, False), (" 5-20k€ (500-2000 users × 10-30€/mois)", False, False)]),
    p2([("⭐ Score /10 :", True, False), (" 8.5/10 (faisabilité forte, douleur vécue, assets existants)", False, False)]),
    p2([("🚀 Prochaine action :", True, False), (" Lister les 5 tâches admin qui prennent le plus de temps à Alexis chaque mois → prototype en Clawdbot → tester 30 jours → trouver 3 bêta-utilisateurs PME.", False, False)]),
    p(),

    # ── PRIORITÉ 2 ───────────────────────────────────────────────
    h2("🧾 Priorité 2 — Automatisation Fiscalité (FiscalGPT)"),
    p(),
    p2([("📌 Problème résolu :", True, False), (" La fiscalité française est illisible pour 95% des dirigeants et contribuables. Comprendre les montages légaux, optimiser sa rémunération dirigeant, savoir ce qu'on peut déduire : ça nécessite un expert-comptable ou un fiscaliste à 300€/h. Chaque foyer fait 1-3h de réflexion fiscale par an sans aide.", False, False)]),
    p2([("💡 Solution :", True, False), (" FiscalGPT avec paywall. Étendre la base documentaire (14 000 articles CGI + jurisprudences + BOFiP), ajouter le calcul de rémunération dirigeant optimale, la simulation IS/IR, la déclaration d'impôts guidée. Modèle : freemium (5 questions gratuites) puis 29-49€/mois ou 50€/déclaration.", False, False)]),
    p2([("🇫🇷 Taille de marché :", True, False), (" 16.5M de foyers imposables. 1% = 165k users × 50€ = 8.25M€ CA. 500k TPE/PME qui paient 1-3k€/an d'expert-comptable pour la partie fiscale.", False, False)]),
    p2([("⚔️ Concurrents :", True, False), (" TurboTax (pas en France), Pocketlaw, impots.gouv (nul pour les conseils), experts-comptables classiques. Aucun concurrent IA direct validé en France.", False, False)]),
    p2([("🏗️ Assets d'Alexis :", True, False), (" FiscalGPT déjà opérationnel avec 14 000 articles, 1 000 questions posées via LinkedIn (validation), audience LinkedIn qualifiée (dirigeants PME).", False, False)]),
    p2([("⏱️ Temps MVP :", True, False), (" 2 semaines (ajouter paywall Stripe + simulateur rémunération dirigeant)", False, False)]),
    p2([("💰 MRR potentiel 6 mois :", True, False), (" 10-30k€ (500-1500 abonnés × 20-30€/mois)", False, False)]),
    p2([("⭐ Score /10 :", True, False), (" 8.5/10 (asset existant, marché validé par usage, risque réglementaire maîtrisable avec disclaimer)", False, False)]),
    p2([("🚀 Prochaine action :", True, False), (" Ajouter paywall Stripe + 5 questions gratuites → post LinkedIn 'FiscalGPT passe en payant le [date]' → cibler 50 abonnés semaine 1.", False, False)]),
    p(),

    # ── PRIORITÉ 3 ───────────────────────────────────────────────
    h2("⚖️ Priorité 3 — Automatisation Formalisme / Démarches Légales"),
    p(),
    p2([("📌 Problème résolu :", True, False), (" Les formalités légales (création de société, modifications statutaires, dépôts AGO/AGE, fusions, cessions de parts) coûtent 500-5000€ chez LegalVision ou un avocat d'affaires — pour du travail 80% administratif et répétitif. Les PME/TPE galèrent et payent trop cher.", False, False)]),
    p2([("💡 Solution :", True, False), (" Un agent IA formaliste : tu décris ton opération juridique (ex: 'je veux céder 30% de mes parts'), l'IA génère tous les documents nécessaires (PV d'AG, contrat de cession, formulaires Infogreffe/INPI), vérifie la cohérence légale, et t'accompagne étape par étape. LegalVision à 1/10e du prix.", False, False)]),
    p2([("🇫🇷 Taille de marché :", True, False), (" 900k créations d'entreprises/an en France + 300k modifications/an + 50k cessions/an. LegalVision fait 30M€+ de CA. TAM France : 200-500M€.", False, False)]),
    p2([("⚔️ Concurrents :", True, False), (" LegalVision (cher, peu IA), Legalstart, Captain Contrat, Shine (limité). Aucun pure player IA formaliste en France.", False, False)]),
    p2([("🏗️ Assets d'Alexis :", True, False), (" Vécu formalisme Qiara (douleur vécue), réseau avocats d'affaires, compréhension du marché PME, capacité build IA.", False, False)]),
    p2([("⏱️ Temps MVP :", True, False), (" 4-6 semaines (commencer par 3 cas d'usage : création SASU, cession de parts, PV d'AG)", False, False)]),
    p2([("💰 MRR potentiel 6 mois :", True, False), (" 5-15k€ (usage à l'acte : 49-299€/dossier × 50-100 dossiers/mois)", False, False)]),
    p2([("⭐ Score /10 :", True, False), (" 7.5/10 (marché clair, faisabilité forte, mais besoin de validation juridique pour ne pas engager sa responsabilité)", False, False)]),
    p2([("🚀 Prochaine action :", True, False), (" Mapper les 10 formalités les plus fréquentes → choisir la plus simple (ex: création SASU) → build MVP en 2 semaines → tester avec 5 entrepreneurs ESSEC.", False, False)]),
    p(),

    # ── PRIORITÉ 4 ───────────────────────────────────────────────
    h2("🏠 Priorité 4 — Recherche Opportunités Immobilières (Marchand de Biens)"),
    p(),
    p2([("📌 Problème résolu :", True, False), (" Identifier les bonnes opportunités pour un marchand de biens (biens sous-évalués, successions, vendeurs pressés, biens à rénover) est un travail de fourmi fait manuellement par les pros. Les données sont dispersées (DVF, Pappers pour les SCI, réseaux notaires, agences).", False, False)]),
    p2([("💡 Solution :", True, False), (" Un agent IA de sourcing immobilier : agrège DVF (données de valeurs foncières), annonces Seloger/LeBonCoin, données Pappers sur les SCI en difficulté, annonces légales (liquidations judiciaires), signaux notaires. Génère une alerte quotidienne des meilleures opportunités avec analyse automatique de rentabilité.", False, False)]),
    p2([("🇫🇷 Taille de marché :", True, False), (" 15 000 marchands de biens professionnels en France + 50 000 investisseurs actifs. Willingness to pay : 200-500€/mois. TAM : 30-100M€.", False, False)]),
    p2([("⚔️ Concurrents :", True, False), (" Masteos (liquidé), Beanstock, Investir-Immo, outils artisanaux Excel. Aucun agent IA spécialisé marchand de biens.", False, False)]),
    p2([("🏗️ Assets d'Alexis :", True, False), (" Frère (Adri) avec expertise immobilière et équipes terrain, réseau, capital disponible pour tester des deals.", False, False)]),
    p2([("⏱️ Temps MVP :", True, False), (" 4-6 semaines (scraping DVF + LeBonCoin + alertes auto + analyse rentabilité)", False, False)]),
    p2([("💰 MRR potentiel 6 mois :", True, False), (" 3-10k€ (50-100 users × 99-200€/mois) + rentabilité des deals eux-mêmes", False, False)]),
    p2([("⭐ Score /10 :", True, False), (" 7/10 (asset frère fort, marché niche mais clair, faisabilité technique bonne — risque : ticket d'entrée élevé pour valider l'usage)", False, False)]),
    p2([("🚀 Prochaine action :", True, False), (" Session stratégie avec Adri → définir les critères d'opportunité parfaite → build alerte DVF automatique en 1 semaine → tester sur 3 marchés (Paris IDF, Lyon, Bordeaux).", False, False)]),
    p(),

    # ── PRIORITÉ 5 ───────────────────────────────────────────────
    h2("🤖 Priorité 5 — SaaS / Service Automation PME"),
    p(),
    p2([("📌 Problème résolu :", True, False), (" Les PME françaises (10-200 salariés) perdent des heures sur des tâches répétitives : relances clients, reporting, support, admin RH, prospection. Elles n'ont pas les ressources pour embaucher des spécialistes. L'IA peut faire 70% du travail pour 1/10e du prix.", False, False)]),
    p2([("💡 Solution :", True, False), (" Clawdbot pour PME — un pack d'agents IA pré-configurés livré clé en main sur le WhatsApp du dirigeant. Skills : relances impayés, reporting hebdo, onboarding employé, support client, prospection. Setup 800€ + 300€/mois. 'Je t'automatise ta boîte depuis WhatsApp.'", False, False)]),
    p2([("🇫🇷 Taille de marché :", True, False), (" 1,5M de PME en France. 1% = 15 000 clients × 300€/mois = 4,5M€ MRR. TAM réaliste à 5 ans : 50-200M€.", False, False)]),
    p2([("⚔️ Concurrents :", True, False), (" Make.com/Zapier (trop technique), SSII classiques (trop cher), freelances IA (pas packagé). Clawdbot = unfair advantage car déjà opérationnel.", False, False)]),
    p2([("🏗️ Assets d'Alexis :", True, False), (" Clawdbot opérationnel, 6 agents actifs, vécu CEO 15 ans, réseau de dirigeants PME, ESSEC (accès à 2000+ entrepreneurs).", False, False)]),
    p2([("⏱️ Temps MVP :", True, False), (" 2-3 semaines (packager 5 skills existants + landing page + 3 clients bêta)", False, False)]),
    p2([("💰 MRR potentiel 6 mois :", True, False), (" 10-30k€ (30-100 clients × 300€/mois)", False, False)]),
    p2([("⭐ Score /10 :", True, False), (" 8/10 (assets maximaux, marché validé par demande entrante, seul risque = scalabilité opérationnelle)", False, False)]),
    p2([("🚀 Prochaine action :", True, False), (" Identifier 3 potes entrepreneurs → installer Clawdbot → configurer 3 skills métier spécifiques → documenter → pricing → 1er post LinkedIn.", False, False)]),
    p(),
]

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 3 — TOUTES LES AUTRES IDÉES PAR CATÉGORIE
# ══════════════════════════════════════════════════════════════════════════════

section3 = [
    div(),
    h1("📁 Section 3 — Toutes les autres idées (classées par catégorie)"),
    callout("Format : Nom | Description | Douleur | Délai MVP | Verdict", "📌"),
    p(),

    # 💰 Finance & Compta
    h2("💰 Finance & Compta"),
    p(),
    p2([("📊 Business Review AI / FinCockpit", True, False), (" — Génère automatiquement la revue hebdo d'un SaaS (KPIs, diagnostic, slides). Vécu Qiara : 2-3h chaque lundi. 200 CEOs ont répondu au post LinkedIn. | Douleur : Très forte | MVP : 2-3 sem | ", False, False), ("✅ Priorité haute", True, False)]),
    p2([("🗣️ ExpliqueMaCompta / Je fais parler ta compta", True, False), (" — Drop un PDF de compta, l'IA génère graphiques + chat pour poser des questions. Porte d'entrée vers des outils plus avancés. | Douleur : Forte | MVP : 1-2 sem | ", False, False), ("✅ Quick win", True, False)]),
    p2([("💹 Valorisation de société", True, False), (" — Drop tes data (comptes, banque, Stripe) → valeur indicative + questionnaire (secteur, concentration client, récurrence). À intégrer à ExpliqueMaCompta. | Douleur : Forte | MVP : 1-2 sem | ", False, False), ("✅ À greffer", True, False)]),
    p2([("🎯 CFO AI / Cockpit Dirigeant", True, False), (" — Dashboard mensuel cash + prévisions 3 mois + arbitrages (salaire, dividendes, recrutement). Douleur CEO solo : charge mentale + solitude + risque. | Douleur : Très forte | MVP : Déjà dans BRAI | ", False, False), ("🔄 En cours", True, False)]),
    p2([("📈 Investor Reporting Tool", True, False), (" — Comme Business Review mais formate le reporting investisseur prêt à copier-coller en mail. 40h de travail → 2 clics. | Douleur : Forte (founders) | MVP : 3-5 j | ", False, False), ("✅ Tu connais le pain", True, False)]),
    p2([("⭐ NPS + Review Generator", True, False), (" — Outil ultra-simple de collecte NPS pour SaaS <3M ARR. Setup 5 min. Suivi Google Sheet + analyse LLM. Vécu Qiara : très cher à mettre en place. | Douleur : Moyenne | MVP : 1-2 j | ", False, False), ("✅ Ship vite, valide vite", True, False)]),
    p2([("💸 Recouvrement automatisé des impayés", True, False), (" — Agent IA qui détecte les impayés, génère les relances progressives (mail → LRAR → mise en demeure), automatise avec API La Poste. | Douleur : Forte | MVP : 2 sem | ", False, False), ("✅ Vertical clair", True, False)]),
    p2([("📐 Tableau amortissement.fr", True, False), (" — Refaire tableauamortissement.org en mode stylé : projections graphiques + API taux actuels + comparateur scénarios + export PDF/Excel. 1 journée de build. | Douleur : Faible | MVP : 1 j | ", False, False), ("🔄 Vitrine/SEO", True, False)]),
    p2([("🔍 FinCockpit simplifié", True, False), (" — Un outil tout simple qui réconcilie/compare ton YTD par rapport à ton Business Plan. Interface de pilotage pour dirigeants. | Douleur : Forte | MVP : 1 sem | ", False, False), ("🔄 À merger avec BRAI", True, False)]),
    p2([("🏦 Simulateur rémunération dirigeant", True, False), (" — Calculette avec toutes les options : IS/IR, dividendes, charges sociales, MEP. Outil complémentaire à FiscalGPT. | Douleur : Forte | MVP : 1 sem | ", False, False), ("✅ Ajouter à FiscalGPT", True, False)]),
    p(),

    # ⚖️ Juridique & Contrats
    h2("⚖️ Juridique & Contrats"),
    p(),
    p2([("📋 AI Contract Checker / Navigator", True, False), (" — Analyse et résume tous tes contrats : parties, montants, échéances, préavis, clauses clés, risques. Benchmark marché + suggestions renégociation. Douleur Qiara : contrats et PO dans tous les sens. | Douleur : Très forte | MVP : 1-2 sem | ", False, False), ("✅ Pain réel (vécu Qiara)", True, False)]),
    p2([("🏦 M&A AI / Banque d'affaires virtuelle", True, False), (" — Agent IA pour les deals : due diligence, datapack, pitchdeck, matching acheteurs/vendeurs. Outil 1: listedvisseurs.com (base VC/PE/BA). Outil 2: datapack auto. Outil 3: pitchdeck. | Douleur : Forte | MVP : 2 mois | ", False, False), ("⚠️ Scope large, commencer par outil 1", True, False)]),
    p2([("🔒 Compliance RGPD / ESG", True, False), (" — Audit de conformité automatisé. Cabinet d'avocats demandait 10k€ pour ça. Obligation légale. Tsunami réglementaire PME/ETI. | Douleur : Forte | MVP : 3-4 sem | ", False, False), ("⚠️ Vérifier taille marché", True, False)]),
    p2([("🤝 AI Analyse Pactes d'associés", True, False), (" — Analyse + recommandations sur les pactes d'associés. Rendre accessible ce que font les avocats d'affaires à 500€/h. | Douleur : Forte | MVP : 2 sem | ", False, False), ("⚠️ Niche mais forte douleur", True, False)]),
    p2([("🔄 Résiliation Universelle", True, False), (" — Automatiser toutes les demandes de résiliation avec API La Poste (LRAr auto). Résilier.com existe mais très basique. | Douleur : Moyenne | MVP : 1-2 sem | ", False, False), ("⚠️ Marché étroit", True, False)]),
    p(),

    # 📈 Sales & Marketing
    h2("📈 Sales & Marketing"),
    p(),
    p2([("🔍 Outil Prospection Exa API", True, False), (" — Décrire les sociétés ciblées → génère liste complète (Pappers, mails, tels, appels d'offres publics). Copier Apollo.io / Cognism pour le marché français. | Douleur : Forte | MVP : 2-3 sem | ", False, False), ("✅ Marché clair", True, False)]),
    p2([("🚀 GTM Generator", True, False), (" — Tu donnes ton produit → l'IA gère tout le lancement : CP, journalistes ciblés, ProductHunt, Reddit, réseaux sociaux, formulaire de prise de RDV. | Douleur : Forte | MVP : 3-4 sem | ", False, False), ("⚠️ Scope large", True, False)]),
    p2([("📰 Journalistes.fr / Agent RP", True, False), (" — Base de tous les journalistes français enrichie (sujets, derniers articles, mail, X, LinkedIn). Agent qui génère le pitch personnalisé pour chaque journaliste. | Douleur : Forte | MVP : 3-4 sem | ", False, False), ("⚠️ Niche B2B RP", True, False)]),
    p2([("💼 LinkedIn AI Contenu + Prospection", True, False), (" — Automatiser la création de contenus LinkedIn + la prospection ciblée. Cloner le style de l'utilisateur avec fine-tuning. | Douleur : Forte | MVP : 2-3 sem | ", False, False), ("🔄 Compétitif mais fort marché", True, False)]),
    p2([("📄 Réponse Appels d'Offres Publics", True, False), (" — Injecter base documentaire entreprise → auto-remplissage des AO publics (BOAMP) avec niveau de confiance. 20-40h de travail → 80% automatisé. 2-5k€ par AO. | Douleur : Très forte | MVP : 3-4 sem | ", False, False), ("✅ ROI immédiat pour clients", True, False)]),
    p2([("🏗️ Machine à vendre BTP", True, False), (" — Agents IA + UGC + influenceurs + SEO pour générer du volume qualifié pour les artisans (plombiers, électriciens). Distribution : démarchage direct. | Douleur : Forte | MVP : 1-2 mois | ", False, False), ("⚠️ Bof marché très fragmenté", True, False)]),
    p2([("🚗 Agent Vente Voiture", True, False), (" — 20 photos + plaque → crée comptes + demande estimations sur toutes plateformes → top 3 + organisation vente. | Douleur : Moyenne | MVP : 2-3 sem | ", False, False), ("⚠️ B2C, marché étroit", True, False)]),
    p(),

    # 🏠 Immobilier
    h2("🏠 Immobilier"),
    p(),
    p2([("🤖 AI Marketplace Immobilière", True, False), (" — IA sur toute la chaîne immo française : estimation, visite virtuelle, négociation auto, notaire simplifié. 200Mds€/an de transactions. | Douleur : Forte | MVP : 3-6 mois | ", False, False), ("⚠️ Très ambitieux, fort capital", True, False)]),
    p2([("🔎 Rachat de Société Generator", True, False), (" — Interface d'agrégation des sociétés à vendre avec filtres + enrichissement Pappers + analyse business + score attractivité. Comme Pappers mais pour le M&A. | Douleur : Forte | MVP : 1-2 mois | ", False, False), ("⚠️ Marché niche mais clair", True, False)]),
    p2([("🏘️ Inversion Process Immobilier", True, False), (" — Les acheteurs publient leur requête, les vendeurs/agences viennent à eux. Ne plus chercher l'offre mais la demande. + Visites virtuelles 360°. | Douleur : Moyenne | MVP : 2-3 mois | ", False, False), ("❌ Existe déjà sous plusieurs formes", True, False)]),
    p2([("🏡 Pacaso France (Co-ownership)", True, False), (" — Vendre des maisons secondaires en co-propriété (Pacaso US = 1Mds$ en 1 an). Gérer légal, maintenance, déco. | Douleur : Forte | MVP : 6 mois+ | ", False, False), ("⚠️ Très réglementé en France", True, False)]),
    p(),

    # 🧠 Santé mentale & Coaching
    h2("🧠 Santé mentale & Coaching"),
    p(),
    p2([("🫂 Mental Health AI / Clarity", True, False), (" — Coach psy IA 24/7, mémoire parfaite, sans jugement, disponible à 3h du matin. B2C abonnement + B2B2C via mutuelles/employeurs (comme Alan). Spring Health, Lyra Health au US. | Douleur : Très forte | MVP : 3 mois | ", False, False), ("🔄 Passion forte d'Alexis, mais long terme", True, False)]),
    p2([("👴 Silver Economy / Safe@home / EVA", True, False), (" — Assistant vocal + capteurs pour maintien à domicile des seniors. B2B2C via mutuelles/collectivités. Stack proche de Qiara. Mégatrend 30 ans. | Douleur : Très forte | MVP : 4-6 mois | ", False, False), ("🔄 Big bet, passion forte", True, False)]),
    p2([("👶 App Coaching Parents (nouveau-né)", True, False), (" — IA coaching pour les parents qui viennent d'avoir un bébé. Répondre aux mille questions des nouveaux parents 24/7. | Douleur : Forte | MVP : 3-4 sem | ", False, False), ("⚠️ B2C dur à monétiser", True, False)]),
    p2([("🎯 Purpose Finder / Coaching Orientation", True, False), (" — Aider les gens à trouver leur vocation et leur voie. Productiser l'accompagnement. Mission de vie déclarée d'Alexis. | Douleur : Forte | MVP : 1-2 mois | ", False, False), ("⚠️ Compétitif, dur à monétiser seul", True, False)]),
    p2([("🧘 Copilote CEO (Clarity IA)", True, False), (" — Coach mental IA pour fondateurs. Journaling guidé, gestion dilemmes stratégiques, charge mentale. Decision Coach : pose un dilemme → 3 options + reco. | Douleur : Forte | MVP : 2-3 sem | ", False, False), ("✅ Forte demande prouvée (confs d'Alexis)", True, False)]),
    p(),

    # 🎓 Formation
    h2("🎓 Formation"),
    p(),
    p2([("🏫 Formation IA Présentiel (cadres 35-60)", True, False), (" — Workshops pratiques 2 jours à 500€ (vibe coding, Claude, Gemini, agents). Éligible CPF. Forte demande, marché ignoré avec pouvoir d'achat. Duplicable mensuellement. | Douleur : Forte | MVP : 3 jours | ", False, False), ("✅ Revenu immédiat, zéro risque", True, False)]),
    p2([("📹 Formation Vidéo Scalable (Mister IA style)", True, False), (" — Contenus vidéos 'Entreprendre avec l'IA'. Cf Mister IA (800k€/mois), Christopher Wangen, Marc Lou. Être organisme de formation (Qualiopi). | Douleur : Forte | MVP : 1 mois | ", False, False), ("⚠️ Long terme, beaucoup de contenu à créer", True, False)]),
    p2([("📚 Ebook 'Tout ce que je sais'", True, False), (" — Écrire un ebook avec tout le savoir d'Alexis (entrepreneuriat, IA, management, life lessons). | Douleur : N/A | MVP : 2-3 mois | ", False, False), ("🔄 Bon pour personal brand", True, False)]),
    p2([("👥 LinkedIn 4h cours présentiel", True, False), (" — 15 personnes mini × 300€ HT. Partager tout ce qu'il sait. En présentiel. Quick win immédiat. | Douleur : N/A | MVP : 2 sem | ", False, False), ("✅ Quick revenue, zéro effort", True, False)]),
    p(),

    # 🔧 Outils divers
    h2("🔧 Outils divers"),
    p(),
    p2([("🏭 AI Workers Factory", True, False), (" — Plateforme qui crée des 'employés AI' complets (personnalité, compétences, mémoire, travail en équipe). Le Adecco du 21e siècle. | Douleur : Forte | MVP : 2-3 mois | ", False, False), ("⚠️ Très compétitif (Lindy.ai, etc.)", True, False)]),
    p2([("📹 Prompt → Animation Vidéo (Remotion)", True, False), (" — Lovable pour générer des animations vidéo de présentation produits. Forte demande sur X. Agent inspect PR → motion design → Remotion → publish. | Douleur : Forte | MVP : 1-2 mois | ", False, False), ("⚠️ Runway, Kling déjà là", True, False)]),
    p2([("🎬 UGC Studio PME (Kling API)", True, False), (" — Studio vidéo marketing ultra-ciblé pour PME via nouvelle API Kling. UGC quali à prix accessible. | Douleur : Moyenne | MVP : 3-4 sem | ", False, False), ("⚠️ Service, pas SaaS", True, False)]),
    p2([("🔍 Société.com en mode prompt", True, False), (" — Prompter librement sur toutes les données publiques des sociétés françaises (Pappers/INSEE). 'Quel était le CA de AMB SARL il y a 2 ans ?' | Douleur : Forte | MVP : 3-4 sem | ", False, False), ("✅ Tech simple, usage business fort", True, False)]),
    p2([("🧠 Context Graphs / Mémoire décisionnelle", True, False), (" — Business Review AI devient mémoire cumulative : 12 mois d'analyses passées → contexte pour recommandations. 'Systems of decision' vs 'systems of record'. | Douleur : Forte | MVP : Extension BRAI | ", False, False), ("🔄 V3+ de BRAI", True, False)]),
    p2([("🏢 DRH IA pour PME", True, False), (" — Ton DRH IA : licenciement, onboarding, conventions collectives, benchmark salaires, entretiens annuels. Pour 1M+ PME sans RH. | Douleur : Forte | MVP : 3-4 sem | ", False, False), ("🔄 Fort marché, mais attention au juridique", True, False)]),
    p2([("📤 Export Slack Outil", True, False), (" — Outil d'export Slack qui marche (pas Backupery). Vécu fin Qiara. Basé sur Slackdump open source. | Douleur : Forte | MVP : 1 sem | ", False, False), ("⚠️ Niche, marché limité", True, False)]),
    p2([("📉 GTA / Gestion Temps et Activités", True, False), (" — Outil moderne de GTA à la demande d'Anne Duperron. Concurrent Eurecia. Nécessite API SILAE. | Douleur : Moyenne | MVP : 3-6 mois | ", False, False), ("❌ Trop de concurrents, trop complexe", True, False)]),
    p2([("🌡️ Thermostat Hôtel Hack", True, False), (" — SW pour override le thermostat des hôtels. Idée Patrick Collison. | Douleur : Faible | MVP : 1 sem | ", False, False), ("❌ Fun mais pas de marché", True, False)]),
    p2([("🎰 SaaS Flipping", True, False), (" — Racheter des SaaS vieillissants sous-valorisés → rebuild avec IA → repositionner → revendre. 'House flipping du logiciel'. | Douleur : N/A | MVP : 6 mois+ | ", False, False), ("🔄 Bon modèle mais capital et deal flow nécessaires", True, False)]),
    p2([("💡 Business Idea Generator", True, False), (" — Génère des idées de business avec filtres (B2B/B2C, investissement, compétences, pays). TAM, concurrents, Twitter/Reddit insights, début de BP. | Douleur : Faible | MVP : 3-4 sem | ", False, False), ("⚠️ Amusant mais marché très limité", True, False)]),
    p(),
]

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 4 — TABLEAU DE SCORING
# ══════════════════════════════════════════════════════════════════════════════

scoring_header = ["Idée", "Douleur /5", "Marché /5", "Faisabilité /5", "Assets /5", "Passion /5", "Total /25", "Verdict"]
scoring_data = [
    # Priorités
    ["🗂️ Administratif AI",          "5", "5", "4", "3", "4", "21", "✅"],
    ["🧾 FiscalGPT Paywall",          "5", "4", "4", "5", "3", "21", "✅"],
    ["⚖️ Agent Formaliste",           "4", "4", "4", "2", "3", "17", "✅"],
    ["🏠 Immo Marchand de biens",     "4", "4", "3", "3", "4", "18", "🔄"],
    ["🤖 Clawdbot PME",               "4", "4", "4", "4", "3", "19", "✅"],
    # Finance & Compta
    ["📊 Business Review AI",         "5", "3", "4", "4", "4", "20", "✅"],
    ["🗣️ ExpliqueMaCompta",           "4", "3", "5", "4", "3", "19", "✅"],
    ["💹 Valorisation société",       "4", "3", "4", "3", "3", "17", "✅"],
    ["📈 Investor Reporting",         "4", "2", "5", "4", "3", "18", "✅"],
    ["⭐ NPS Generator",              "3", "3", "5", "3", "2", "16", "🔄"],
    ["💸 Recouvrement impayés",       "4", "3", "4", "2", "2", "15", "✅"],
    ["📐 Tableau amortissement.fr",   "2", "3", "5", "2", "1", "13", "🔄"],
    ["🎯 Simulateur rémunération",    "4", "3", "5", "4", "3", "19", "✅"],
    # Juridique
    ["📋 AI Contract Checker",        "5", "4", "4", "2", "3", "18", "✅"],
    ["🏦 M&A AI",                     "4", "2", "3", "2", "4", "15", "⚠️"],
    ["🔒 Compliance RGPD",            "4", "3", "3", "1", "2", "13", "⚠️"],
    ["🔄 Résiliation Universelle",    "3", "3", "4", "1", "2", "13", "⚠️"],
    # Sales & Marketing
    ["🔍 Prospection Exa API",        "4", "3", "5", "2", "2", "16", "⚠️"],
    ["🚀 GTM Generator",              "4", "3", "4", "2", "3", "16", "⚠️"],
    ["📰 Journalistes.fr (RP)",       "3", "2", "4", "1", "2", "12", "⚠️"],
    ["💼 LinkedIn AI",                "3", "3", "4", "3", "3", "16", "🔄"],
    ["📄 Réponse AO publics",         "4", "3", "4", "2", "2", "15", "⚠️"],
    # Immobilier
    ["🤖 AI Marketplace Immo",        "3", "5", "2", "1", "3", "14", "⚠️"],
    ["🔎 Rachat société Generator",   "4", "2", "3", "2", "4", "15", "⚠️"],
    # Santé mentale
    ["🫂 Mental Health AI",           "5", "5", "3", "1", "5", "19", "🔄"],
    ["👴 Silver Economy / EVA",       "5", "5", "2", "3", "5", "20", "🔄"],
    ["🧘 Copilote CEO / Clarity",     "5", "3", "4", "3", "4", "19", "✅"],
    ["👶 Coaching Parents bébé",      "4", "3", "3", "1", "3", "14", "⚠️"],
    # Formation
    ["🏫 Formation IA présentiel",    "3", "3", "5", "4", "3", "18", "✅"],
    ["📹 Formation vidéo scalable",   "3", "4", "3", "3", "3", "16", "⚠️"],
    # Outils divers
    ["🏭 AI Workers Factory",         "3", "4", "3", "3", "3", "16", "⚠️"],
    ["🔍 Société.com en prompt",      "3", "4", "4", "2", "2", "15", "✅"],
    ["🧠 Context Graphs (BRAI)",      "4", "3", "3", "3", "4", "17", "🔄"],
    ["🏢 DRH IA PME",                 "4", "4", "4", "2", "2", "16", "🔄"],
    ["📤 Export Slack",               "3", "2", "4", "2", "1", "12", "⚠️"],
    ["🎰 SaaS Flipping",              "4", "3", "3", "3", "3", "16", "🔄"],
]

section4 = [
    div(),
    h1("📊 Section 4 — Tableau de scoring complet"),
    callout("35 idées scorées sur 5 critères : Douleur client, Taille de marché, Faisabilité solo IA, Assets existants d'Alexis, Passion déclarée. Chaque critère /5 → Total /25", "🎯"),
    p(),
    table(scoring_header, scoring_data),
    p(),
    h2("🏅 Légende des verdicts"),
    p2([("✅ GO", True, False), (" — Lancer maintenant ou dans les 60 jours", False, False)]),
    p2([("🔄 WATCH", True, False), (" — Bonnes bases mais timing ou ressources à valider", False, False)]),
    p2([("⚠️ BACKLOG", True, False), (" — Intéressant mais ne pas y toucher avant d'avoir 1 produit rentable", False, False)]),
    p2([("❌ AVOID", True, False), (" — Trop complexe, trop compétitif, ou non aligné avec les objectifs actuels", False, False)]),
    p(),
    callout("🔥 Top 3 quick wins immédiats : (1) FiscalGPT paywall — 2 semaines, MRR dès J+15 | (2) Business Review AI MVP — 3 semaines, 200 CEOs attendent | (3) Formation IA présentiel — 3 jours, CA immédiat. Lance au moins l'un de ces 3 CETTE semaine.", "🚀"),
    p(),
    h2("⚡ Next Steps Recommandés"),
    nl("Cette semaine : Ajouter paywall Stripe à FiscalGPT + post LinkedIn d'annonce"),
    nl("Semaine 2 : MVP Business Review AI (ingestion Pennylane + génération slides)"),
    nl("Semaine 3 : Organiser première formation IA présentiel (ESSEC network)"),
    nl("Mois 1-2 : Clawdbot PME — packager 5 skills + 3 clients bêta"),
    nl("Mois 2-3 : Agent Formaliste V1 (création SASU + cession parts)"),
    nl("Mois 3-6 : Administratif AI — prototype + 30 bêta-users familles/PME"),
    nl("Après 20k€ MRR : Envisager Silver Economy / Mental Health AI (Big Bets)"),
    p(),
    quote("'Le mieux c'est quand tu es vraiment devenu un true domain expert. Quand tu mâches le truc depuis 5 ou 10 ans.' — M. Andreessen. Alexis : tu mâches les problèmes CEO/PME depuis 15 ans. C'est là ton edge."),
]

# ══════════════════════════════════════════════════════════════════════════════
# MAIN — Create the page
# ══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    print("🏭 Création de la page Notion...")

    # Create page with first batch of blocks (section 1)
    first_batch = section1[:50]
    page_id = create_page(first_batch)
    print(f"✅ Page créée : {page_id}")
    time.sleep(0.5)

    # Append rest of section 1 if any
    if len(section1) > 50:
        append(page_id, section1[50:])
        time.sleep(0.5)

    # Append section 2
    print("📝 Ajout Section 2 (5 priorités)...")
    append(page_id, section2)
    time.sleep(0.5)

    # Append section 3
    print("📁 Ajout Section 3 (catégories)...")
    append(page_id, section3)
    time.sleep(0.5)

    # Append section 4
    print("📊 Ajout Section 4 (scoring)...")
    append(page_id, section4)

    print(f"\n✅ Page Notion complète créée !")
    print(f"🔗 https://notion.so/{page_id.replace('-', '')}")
