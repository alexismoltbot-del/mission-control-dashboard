#!/usr/bin/env python3

from __future__ import annotations

import json
from collections import defaultdict
from datetime import date, datetime
from pathlib import Path


SYSTEM_ROOT = Path("/Users/alexis/.openclaw/shared/system")
TASKS_DIR = SYSTEM_ROOT / "tasks"
APPROVALS_DIR = SYSTEM_ROOT / "approvals"
VIEWS_DIR = SYSTEM_ROOT / "views"
METRICS_DIR = SYSTEM_ROOT / "metrics"
CRON_JOBS_PATH = Path("/Users/alexis/.openclaw/cron/jobs.json")

TASK_STATUS_ORDER = [
    "running",
    "ready",
    "waiting_human",
    "waiting_external",
    "review",
    "blocked",
    "backlog",
    "done",
    "failed",
]
TASK_STATUS_SET = set(TASK_STATUS_ORDER)
ACTIVE_TASK_STATUSES = {"ready", "running", "waiting_human", "waiting_external", "review", "blocked"}
TERMINAL_TASK_STATUSES = {"done", "failed"}
APPROVAL_STATUS_ORDER = ["pending", "approved", "rejected", "cancelled"]
APPROVAL_STATUS_SET = set(APPROVAL_STATUS_ORDER)
PRIORITY_ORDER = {"p0": 0, "p1": 1, "p2": 2, "p3": 3}
PRIORITY_SET = set(PRIORITY_ORDER)

TASK_REQUIRED_FIELDS = [
    "id",
    "project",
    "title",
    "owner",
    "status",
    "priority",
    "created_at",
    "updated_at",
    "due",
    "artifact",
    "next_agent",
    "approval_needed",
    "approval_id",
    "depends_on",
    "blocked_by",
    "source_ref",
]
APPROVAL_REQUIRED_FIELDS = [
    "id",
    "task_id",
    "title",
    "requested_by",
    "status",
    "created_at",
    "due",
    "artifact",
    "decision_needed",
]


def parse_value(raw: str):
    raw = raw.strip()
    if raw in {"true", "false"}:
        return raw == "true"
    if raw == "":
        return ""
    if raw.startswith("[") and raw.endswith("]"):
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return raw
    return raw.strip('"')


def parse_frontmatter(path: Path):
    text = path.read_text()
    if not text.startswith("---\n"):
        return {}, text
    try:
        _, rest = text.split("---\n", 1)
        front, body = rest.split("\n---\n", 1)
    except ValueError:
        return {}, text
    data = {}
    for line in front.splitlines():
        if not line.strip() or ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = parse_value(value)
    return data, body.strip()


def load_records(directory: Path):
    records = []
    for path in sorted(directory.glob("*.md")):
        frontmatter, body = parse_frontmatter(path)
        frontmatter["_path"] = str(path)
        frontmatter["_body"] = body
        records.append(frontmatter)
    return records


def load_tasks():
    return load_records(TASKS_DIR)


def load_approvals():
    return load_records(APPROVALS_DIR)


def load_jobs():
    if not CRON_JOBS_PATH.exists():
        return []
    payload = json.loads(CRON_JOBS_PATH.read_text())
    return payload.get("jobs", [])


def ensure_output_dirs():
    VIEWS_DIR.mkdir(parents=True, exist_ok=True)
    METRICS_DIR.mkdir(parents=True, exist_ok=True)


def sort_tasks(tasks):
    def key(task):
        status_rank = TASK_STATUS_ORDER.index(task.get("status", "backlog"))
        priority_rank = PRIORITY_ORDER.get(task.get("priority", "p3"), 9)
        due = task.get("due", "9999-12-31")
        return (status_rank, priority_rank, due, task.get("id", ""))

    return sorted(tasks, key=key)


def sort_approvals(approvals):
    def key(approval):
        status = approval.get("status", "pending")
        status_rank = APPROVAL_STATUS_ORDER.index(status) if status in APPROVAL_STATUS_SET else 99
        return (status_rank, approval.get("due", "9999-12-31"), approval.get("id", ""))

    return sorted(approvals, key=key)


def parse_iso_date(value):
    if not value:
        return None
    try:
        return date.fromisoformat(str(value))
    except ValueError:
        return None


def parse_epoch_ms(value):
    if value in {None, ""}:
        return None
    try:
        return datetime.fromtimestamp(int(value) / 1000)
    except (TypeError, ValueError, OSError):
        return None


def iso_datetime(value):
    dt = parse_epoch_ms(value)
    if not dt:
        return ""
    return dt.astimezone().isoformat(timespec="seconds")


def is_overdue(value):
    parsed = parse_iso_date(value)
    if not parsed:
        return False
    return parsed < date.today()


def render_board(tasks):
    lines = [
        "# System Board",
        "",
        f"Generated: {date.today().isoformat()}",
        "",
    ]
    grouped = defaultdict(list)
    for task in sort_tasks(tasks):
        grouped[task.get("status", "backlog")].append(task)

    for status in TASK_STATUS_ORDER:
        items = grouped.get(status, [])
        lines.append(f"## {status}")
        if not items:
            lines.extend(["", "- none", ""])
            continue
        lines.append("")
        lines.append("| ID | Owner | Priority | Due | Title | Approval |")
        lines.append("|---|---|---|---|---|---|")
        for task in items:
            approval = task.get("approval_id", "") if task.get("approval_needed") else ""
            due = task.get("due", "")
            if is_overdue(due) and task.get("status") not in TERMINAL_TASK_STATUSES:
                due = f"{due} overdue"
            lines.append(
                "| {id} | {owner} | {priority} | {due} | {title} | {approval} |".format(
                    id=task.get("id", ""),
                    owner=task.get("owner", ""),
                    priority=task.get("priority", ""),
                    due=due,
                    title=task.get("title", ""),
                    approval=approval,
                )
            )
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def render_tasks_by_owner(tasks):
    lines = [
        "# Tasks By Owner",
        "",
        f"Generated: {date.today().isoformat()}",
        "",
    ]
    grouped = defaultdict(list)
    for task in sort_tasks(tasks):
        grouped[task.get("owner", "unassigned")].append(task)

    for owner in sorted(grouped):
        lines.append(f"## {owner}")
        lines.append("")
        for task in grouped[owner]:
            due = task.get("due", "")
            if is_overdue(due) and task.get("status") not in TERMINAL_TASK_STATUSES:
                due = f"{due} overdue"
            lines.append(
                "- `{id}` [{status}] {title} | priority={priority} | due={due}".format(
                    id=task.get("id", ""),
                    status=task.get("status", ""),
                    title=task.get("title", ""),
                    priority=task.get("priority", ""),
                    due=due,
                )
            )
            artifact = task.get("artifact", "")
            if artifact:
                lines.append(f"  artifact: `{artifact}`")
            if task.get("approval_needed"):
                lines.append(f"  approval: `{task.get('approval_id', '')}`")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def render_approvals(approvals):
    lines = [
        "# Approval Queue",
        "",
        f"Generated: {date.today().isoformat()}",
        "",
        "| ID | Task | Requested By | Status | Due | Title |",
        "|---|---|---|---|---|---|",
    ]
    for approval in sort_approvals(approvals):
        due = approval.get("due", "")
        if is_overdue(due) and approval.get("status") == "pending":
            due = f"{due} overdue"
        lines.append(
            "| {id} | {task_id} | {requested_by} | {status} | {due} | {title} |".format(
                id=approval.get("id", ""),
                task_id=approval.get("task_id", ""),
                requested_by=approval.get("requested_by", ""),
                status=approval.get("status", ""),
                due=due,
                title=approval.get("title", ""),
            )
        )
    lines.append("")
    return "\n".join(lines)


def render_metrics(tasks, approvals):
    status_counts = defaultdict(int)
    owner_counts = defaultdict(int)
    overdue_tasks = 0
    for task in tasks:
        status_counts[task.get("status", "unknown")] += 1
        owner_counts[task.get("owner", "unassigned")] += 1
        if task.get("status") not in TERMINAL_TASK_STATUSES and is_overdue(task.get("due")):
            overdue_tasks += 1

    overdue_approvals = 0
    for approval in approvals:
        if approval.get("status") == "pending" and is_overdue(approval.get("due")):
            overdue_approvals += 1

    return {
        "generated_at": str(date.today()),
        "tasks_total": len(tasks),
        "approvals_total": len(approvals),
        "task_status_counts": dict(sorted(status_counts.items())),
        "tasks_by_owner": dict(sorted(owner_counts.items())),
        "overdue_tasks": overdue_tasks,
        "overdue_approvals": overdue_approvals,
    }


def make_issue(level, code, message, path="", record_id=""):
    return {
        "level": level,
        "code": code,
        "message": message,
        "path": path,
        "record_id": record_id,
    }


def validate_system(tasks, approvals, jobs):
    issues = []

    task_ids = defaultdict(list)
    approval_ids = defaultdict(list)
    for task in tasks:
        task_ids[task.get("id", "")].append(task)
    for approval in approvals:
        approval_ids[approval.get("id", "")].append(approval)

    for task_id, records in task_ids.items():
        if not task_id:
            continue
        if len(records) > 1:
            for task in records:
                issues.append(
                    make_issue(
                        "error",
                        "duplicate-task-id",
                        f"Task id `{task_id}` appears multiple times.",
                        path=task.get("_path", ""),
                        record_id=task_id,
                    )
                )

    for approval_id, records in approval_ids.items():
        if not approval_id:
            continue
        if len(records) > 1:
            for approval in records:
                issues.append(
                    make_issue(
                        "error",
                        "duplicate-approval-id",
                        f"Approval id `{approval_id}` appears multiple times.",
                        path=approval.get("_path", ""),
                        record_id=approval_id,
                    )
                )

    task_lookup = {task.get("id"): task for task in tasks if task.get("id")}
    approval_lookup = {approval.get("id"): approval for approval in approvals if approval.get("id")}

    for task in tasks:
        task_id = task.get("id", "")
        path = task.get("_path", "")
        for field in TASK_REQUIRED_FIELDS:
            if field not in task:
                issues.append(make_issue("error", "missing-task-field", f"Task is missing `{field}`.", path=path, record_id=task_id))
        if not task_id:
            issues.append(make_issue("error", "missing-task-id", "Task id is empty.", path=path))
        status = task.get("status", "")
        if status not in TASK_STATUS_SET:
            issues.append(make_issue("error", "invalid-task-status", f"Task status `{status}` is invalid.", path=path, record_id=task_id))
        priority = task.get("priority", "")
        if priority not in PRIORITY_SET:
            issues.append(make_issue("error", "invalid-task-priority", f"Task priority `{priority}` is invalid.", path=path, record_id=task_id))
        if not task.get("owner"):
            issues.append(make_issue("error", "missing-task-owner", "Task owner is empty.", path=path, record_id=task_id))
        if parse_iso_date(task.get("created_at")) is None:
            issues.append(make_issue("error", "invalid-created-at", "Task `created_at` must be ISO date.", path=path, record_id=task_id))
        if parse_iso_date(task.get("updated_at")) is None:
            issues.append(make_issue("error", "invalid-updated-at", "Task `updated_at` must be ISO date.", path=path, record_id=task_id))
        if parse_iso_date(task.get("due")) is None:
            issues.append(make_issue("error", "invalid-due", "Task `due` must be ISO date.", path=path, record_id=task_id))
        for list_field in ("depends_on", "blocked_by"):
            value = task.get(list_field)
            if not isinstance(value, list):
                issues.append(make_issue("error", "invalid-list-field", f"Task `{list_field}` must be a JSON list.", path=path, record_id=task_id))
                continue
            for ref in value:
                if ref and ref not in task_lookup:
                    issues.append(
                        make_issue(
                            "error",
                            "unknown-task-reference",
                            f"Task `{list_field}` references unknown task `{ref}`.",
                            path=path,
                            record_id=task_id,
                        )
                    )
        approval_needed = task.get("approval_needed")
        approval_id = task.get("approval_id", "")
        if approval_needed and not approval_id:
            issues.append(make_issue("error", "missing-approval-id", "Task needs approval but `approval_id` is empty.", path=path, record_id=task_id))
        if approval_needed and approval_id and approval_id not in approval_lookup:
            issues.append(make_issue("error", "unknown-approval", f"Task approval `{approval_id}` does not exist.", path=path, record_id=task_id))
        if not approval_needed and approval_id:
            issues.append(make_issue("warning", "unused-approval-id", f"Task carries approval id `{approval_id}` but `approval_needed` is false.", path=path, record_id=task_id))
        if status == "waiting_human" and not approval_needed:
            issues.append(make_issue("warning", "waiting-human-without-approval", "Task waits on human without approval packet.", path=path, record_id=task_id))
        artifact = str(task.get("artifact", "")).strip()
        if artifact and not Path(artifact).is_absolute():
            issues.append(make_issue("warning", "relative-artifact-path", "Task artifact should be an absolute path.", path=path, record_id=task_id))

    for approval in approvals:
        approval_id = approval.get("id", "")
        path = approval.get("_path", "")
        for field in APPROVAL_REQUIRED_FIELDS:
            if field not in approval:
                issues.append(make_issue("error", "missing-approval-field", f"Approval is missing `{field}`.", path=path, record_id=approval_id))
        if not approval_id:
            issues.append(make_issue("error", "missing-approval-id", "Approval id is empty.", path=path))
        status = approval.get("status", "")
        if status not in APPROVAL_STATUS_SET:
            issues.append(make_issue("error", "invalid-approval-status", f"Approval status `{status}` is invalid.", path=path, record_id=approval_id))
        if parse_iso_date(approval.get("created_at")) is None:
            issues.append(make_issue("error", "invalid-approval-created-at", "Approval `created_at` must be ISO date.", path=path, record_id=approval_id))
        if parse_iso_date(approval.get("due")) is None:
            issues.append(make_issue("error", "invalid-approval-due", "Approval `due` must be ISO date.", path=path, record_id=approval_id))
        task_id = approval.get("task_id", "")
        if task_id and task_id not in task_lookup:
            issues.append(make_issue("error", "unknown-approval-task", f"Approval references missing task `{task_id}`.", path=path, record_id=approval_id))
        artifact = str(approval.get("artifact", "")).strip()
        if artifact and not Path(artifact).is_absolute():
            issues.append(make_issue("warning", "relative-approval-artifact", "Approval artifact should be an absolute path.", path=path, record_id=approval_id))

    enabled_agents = {job.get("agentId") for job in jobs if job.get("enabled") and job.get("agentId")}
    owner_ids = {task.get("owner") for task in tasks if task.get("owner")}
    for owner in sorted(owner_ids - enabled_agents - {"main"}):
        issues.append(
            make_issue(
                "warning",
                "owner-without-cron",
                f"Owner `{owner}` has tasks but no enabled cron worker.",
                record_id=owner,
            )
        )

    job_ids = defaultdict(list)
    for job in jobs:
        job_ids[job.get("id", "")].append(job)
    for job_id, records in job_ids.items():
        if job_id and len(records) > 1:
            for job in records:
                issues.append(
                    make_issue(
                        "error",
                        "duplicate-job-id",
                        f"Cron job id `{job_id}` appears multiple times.",
                        record_id=job.get("name", job_id),
                    )
                )
    for job in jobs:
        if not job.get("enabled"):
            continue
        if not job.get("agentId"):
            issues.append(make_issue("warning", "enabled-job-without-agent", f"Enabled job `{job.get('name', '')}` has no agentId.", record_id=job.get("id", "")))
        if job.get("payload", {}).get("kind") == "agentTurn" and not job.get("payload", {}).get("message"):
            issues.append(make_issue("error", "job-without-message", f"Job `{job.get('name', '')}` has no agent message.", record_id=job.get("id", "")))
        if not job.get("state", {}).get("nextRunAtMs"):
            issues.append(make_issue("warning", "job-without-next-run", f"Job `{job.get('name', '')}` has no next scheduled run.", record_id=job.get("id", "")))

    return issues


def validation_summary(issues):
    errors = sum(1 for item in issues if item["level"] == "error")
    warnings = sum(1 for item in issues if item["level"] == "warning")
    return {"errors": errors, "warnings": warnings, "total": len(issues)}


def render_validation_report(issues):
    summary = validation_summary(issues)
    lines = [
        "# Validation Report",
        "",
        f"Generated: {datetime.now().astimezone().isoformat(timespec='seconds')}",
        "",
        f"- errors: {summary['errors']}",
        f"- warnings: {summary['warnings']}",
        "",
    ]
    if not issues:
        lines.extend(["No validation issue detected.", ""])
        return "\n".join(lines)

    for level in ("error", "warning"):
        subset = [item for item in issues if item["level"] == level]
        if not subset:
            continue
        lines.append(f"## {level}s")
        lines.append("")
        for item in subset:
            suffix = []
            if item.get("record_id"):
                suffix.append(f"id={item['record_id']}")
            if item.get("path"):
                suffix.append(f"path={item['path']}")
            tail = f" ({', '.join(suffix)})" if suffix else ""
            lines.append(f"- `{item['code']}` {item['message']}{tail}")
        lines.append("")
    return "\n".join(lines)


def compute_runtime(tasks, approvals, jobs):
    overdue_tasks = [
        task
        for task in sort_tasks(tasks)
        if task.get("status") not in TERMINAL_TASK_STATUSES and is_overdue(task.get("due"))
    ]
    stale_tasks = []
    for task in sort_tasks(tasks):
        if task.get("status") not in ACTIVE_TASK_STATUSES:
            continue
        updated = parse_iso_date(task.get("updated_at"))
        if updated and (date.today() - updated).days >= 2:
            stale_tasks.append(task)

    overdue_approvals = [
        approval for approval in sort_approvals(approvals) if approval.get("status") == "pending" and is_overdue(approval.get("due"))
    ]
    aging_approvals = []
    for approval in sort_approvals(approvals):
        if approval.get("status") != "pending":
            continue
        created = parse_iso_date(approval.get("created_at"))
        if created and (date.today() - created).days >= 2:
            aging_approvals.append(approval)

    job_issues = []
    never_run_jobs = []
    running_jobs = []
    for job in jobs:
        if not job.get("enabled"):
            continue
        state = job.get("state", {})
        last_status = state.get("lastStatus") or state.get("lastRunStatus")
        consecutive_errors = state.get("consecutiveErrors", 0) or 0
        if state.get("runningAtMs"):
            running_jobs.append(job)
        if not state.get("lastRunAtMs"):
            never_run_jobs.append(job)
        if consecutive_errors > 0:
            job_issues.append(
                {
                    "job": job,
                    "reason": f"{consecutive_errors} consecutive errors",
                }
            )
        elif last_status not in {None, "ok"}:
            job_issues.append(
                {
                    "job": job,
                    "reason": f"last status={last_status}",
                }
            )
        elif not state.get("nextRunAtMs"):
            job_issues.append(
                {
                    "job": job,
                    "reason": "missing nextRunAtMs",
                }
            )

    owners = {task.get("owner") for task in tasks if task.get("owner")}
    enabled_agents = {job.get("agentId") for job in jobs if job.get("enabled") and job.get("agentId")}
    uncovered_owners = sorted(owner for owner in owners if owner not in enabled_agents)

    return {
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "overdue_tasks": overdue_tasks,
        "stale_tasks": stale_tasks,
        "overdue_approvals": overdue_approvals,
        "aging_approvals": aging_approvals,
        "job_issues": job_issues,
        "never_run_jobs": never_run_jobs,
        "running_jobs": running_jobs,
        "uncovered_owners": uncovered_owners,
        "ready_tasks": sum(1 for task in tasks if task.get("status") == "ready"),
        "running_tasks": sum(1 for task in tasks if task.get("status") == "running"),
        "waiting_human_tasks": sum(1 for task in tasks if task.get("status") == "waiting_human"),
    }


def render_runtime_report(runtime):
    lines = [
        "# Runtime Report",
        "",
        f"Generated: {runtime['generated_at']}",
        "",
        "## Summary",
        "",
        f"- ready tasks: {runtime['ready_tasks']}",
        f"- running tasks: {runtime['running_tasks']}",
        f"- waiting_human tasks: {runtime['waiting_human_tasks']}",
        f"- overdue tasks: {len(runtime['overdue_tasks'])}",
        f"- overdue approvals: {len(runtime['overdue_approvals'])}",
        f"- jobs with issues: {len(runtime['job_issues'])}",
        f"- jobs currently running: {len(runtime['running_jobs'])}",
        "",
    ]

    sections = [
        ("Overdue Tasks", runtime["overdue_tasks"], lambda task: f"- `{task.get('id', '')}` owner={task.get('owner', '')} due={task.get('due', '')} status={task.get('status', '')}"),
        ("Stale Active Tasks", runtime["stale_tasks"], lambda task: f"- `{task.get('id', '')}` owner={task.get('owner', '')} updated_at={task.get('updated_at', '')} status={task.get('status', '')}"),
        ("Overdue Approvals", runtime["overdue_approvals"], lambda approval: f"- `{approval.get('id', '')}` task={approval.get('task_id', '')} due={approval.get('due', '')}"),
        ("Aging Pending Approvals", runtime["aging_approvals"], lambda approval: f"- `{approval.get('id', '')}` task={approval.get('task_id', '')} created_at={approval.get('created_at', '')}"),
        ("Jobs With Issues", runtime["job_issues"], lambda item: f"- `{item['job'].get('name', item['job'].get('id', ''))}` agent={item['job'].get('agentId', '')} reason={item['reason']}"),
        ("Jobs Never Run", runtime["never_run_jobs"], lambda job: f"- `{job.get('name', job.get('id', ''))}` agent={job.get('agentId', '')} created_at={iso_datetime(job.get('createdAtMs'))}"),
        ("Jobs Running Now", runtime["running_jobs"], lambda job: f"- `{job.get('name', job.get('id', ''))}` agent={job.get('agentId', '')} started_at={iso_datetime(job.get('state', {}).get('runningAtMs'))}"),
    ]

    for title, items, formatter in sections:
        lines.append(f"## {title}")
        lines.append("")
        if not items:
            lines.append("- none")
            lines.append("")
            continue
        for item in items:
            lines.append(formatter(item))
        lines.append("")

    lines.append("## Owners Without Cron Coverage")
    lines.append("")
    if runtime["uncovered_owners"]:
        for owner in runtime["uncovered_owners"]:
            lines.append(f"- `{owner}`")
    else:
        lines.append("- none")
    lines.append("")

    return "\n".join(lines)
