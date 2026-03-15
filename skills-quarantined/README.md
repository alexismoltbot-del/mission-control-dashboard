# Skills Quarantined

These skills were moved out of `workspace/skills/` on 2026-03-10 after
`openclaw security audit --deep` flagged code-safety issues.

Quarantined:

- `crawl-for-ai`
- `mission-control`
- `tavily-search`
- `x-twitter`

Reason:

- they were not referenced by active cron jobs or agent prompts
- the deep audit classified them as `critical`
- keeping them out of the active skills path reduces the default attack surface

If one of them is needed again, review the code first and move it back
deliberately.
