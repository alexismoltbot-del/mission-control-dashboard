# FiscalGPT

Assistant fiscal français propulsé par Claude + RAG.

**Stack:** Next.js, Supabase (pgvector), Claude Sonnet, OpenAI embeddings

**Sources:**
- CGI (14 000+ articles)
- LPF, BOFiP
- Jurisprudence (Cour de cassation via API Judilibre)

**Traction:** 1000+ questions via LinkedIn. Pas encore de paywall.

**Status actuel (2026-01-28):**
- ✅ V2 tourne en local sur Mac Alexis (test API réussi - TVA 20%)
- ✅ Credentials PISTE vérifiés fonctionnels
- ⏳ Ingestion jurisprudence bloquée : mismatch schema (`articles_cites` vs `articles_vises`) - en attente fix

**Évolution v2 (2026-01-27):**
Refonte intégration jurisprudence :
- Table `jurisprudence` séparée avec champs spécifiques
- Ingestion intelligente (extraction motifs clés via Claude)
- Recherche duale articles + jurisprudence
- Patterns de citation adaptés aux deux formats
