#!/usr/bin/env python3

from __future__ import annotations

import json

from openclaw_system_lib import (
    METRICS_DIR,
    VIEWS_DIR,
    compute_runtime,
    ensure_output_dirs,
    load_approvals,
    load_jobs,
    load_tasks,
    render_runtime_report,
)


def main():
    ensure_output_dirs()
    tasks = load_tasks()
    approvals = load_approvals()
    jobs = load_jobs()
    runtime = compute_runtime(tasks, approvals, jobs)

    (VIEWS_DIR / "runtime-report.md").write_text(render_runtime_report(runtime))
    serializable = {
        **runtime,
        "overdue_tasks": [task.get("id", "") for task in runtime["overdue_tasks"]],
        "stale_tasks": [task.get("id", "") for task in runtime["stale_tasks"]],
        "overdue_approvals": [approval.get("id", "") for approval in runtime["overdue_approvals"]],
        "aging_approvals": [approval.get("id", "") for approval in runtime["aging_approvals"]],
        "job_issues": [
            {
                "job_id": item["job"].get("id", ""),
                "job_name": item["job"].get("name", ""),
                "agent_id": item["job"].get("agentId", ""),
                "reason": item["reason"],
            }
            for item in runtime["job_issues"]
        ],
        "never_run_jobs": [job.get("id", "") for job in runtime["never_run_jobs"]],
        "running_jobs": [job.get("id", "") for job in runtime["running_jobs"]],
    }
    (METRICS_DIR / "runtime.json").write_text(json.dumps(serializable, indent=2) + "\n")

    print(
        json.dumps(
            {
                "overdue_tasks": len(runtime["overdue_tasks"]),
                "overdue_approvals": len(runtime["overdue_approvals"]),
                "job_issues": len(runtime["job_issues"]),
                "running_jobs": len(runtime["running_jobs"]),
            }
        )
    )


if __name__ == "__main__":
    main()
