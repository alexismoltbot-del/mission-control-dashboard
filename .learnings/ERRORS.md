# Errors & Failures Log

Track command failures, exceptions, and integration issues for debugging and improvement.

## Format
```
## YYYY-MM-DD HH:MM - Brief Description
**Error Type**: command_failure | api_error | permission_denied | integration_failure
**Command/Tool**: The specific command or tool that failed
**Error Message**: The actual error output
**Context**: What we were trying to do
**Solution**: How it was resolved (if known)
**Impact**: low | medium | high
```

---

## 2026-02-27 22:55 - Mission Control shows sample data instead of real tasks
**Error Type**: integration_failure
**Command/Tool**: Mission Control dashboard GitHub integration
**Error Message**: Dashboard displays "You're currently viewing sample data" message instead of real tasks
**Context**: User trying to access Mission Control dashboard to manage tasks, expects to see 7 real tasks (MC-001 to MC-007) stored in alexismoltbot-del/mission-control repo
**Root Cause**: Dashboard loads real tasks via `loadTasksFromGitHub()` function but falls back to FALLBACK_DATA (sample data) when GitHub token is missing or authentication fails
**Solution**: User needs to click "Connect GitHub" button in dashboard and provide GitHub token with 'repo' scope to authenticate and load real task data
**Impact**: medium - Dashboard functional but not showing real data, requires manual auth step

EOF