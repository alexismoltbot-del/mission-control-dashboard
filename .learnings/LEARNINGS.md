# Learnings Log

Capture corrections, knowledge gaps, and best practices from day-to-day work.

## Format
```
## YYYY-MM-DD HH:MM - Brief Description
**Category**: correction | knowledge_gap | best_practice | pattern
**Tool/Domain**: Specific tool or area
**What Happened**: The mistake or gap
**Correct Approach**: The right way
**Key Learning**: Single sentence takeaway
**Source**: User correction, documentation, discovery
```

---

## 2026-02-27 23:05 - Mission Control dashboard CONFIG hardcoded to wrong repo
**Category**: correction
**Tool/Domain**: Mission Control skill/dashboard
**What Happened**: Dashboard was showing sample data even though real data existed in GitHub repo. The CONFIG object in the HTML was hardcoded to 'rdsthomas/mission-control' instead of user's actual repo.
**Correct Approach**: When copying/installing dashboard templates, always update hardcoded repository references to match the user's actual GitHub username and repo name.
**Key Learning**: Check hardcoded configuration values in HTML/JS when debugging why a tool isn't loading user data.
**Source**: User report "j'ai encore les données d'exemple"
