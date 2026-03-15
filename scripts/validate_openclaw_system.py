#!/usr/bin/env python3

from __future__ import annotations

import json

from openclaw_system_lib import (
    METRICS_DIR,
    VIEWS_DIR,
    ensure_output_dirs,
    load_approvals,
    load_jobs,
    load_tasks,
    render_validation_report,
    validate_system,
    validation_summary,
)


def main():
    ensure_output_dirs()
    tasks = load_tasks()
    approvals = load_approvals()
    jobs = load_jobs()
    issues = validate_system(tasks, approvals, jobs)
    summary = validation_summary(issues)

    (VIEWS_DIR / "validation.md").write_text(render_validation_report(issues))
    (METRICS_DIR / "validation.json").write_text(json.dumps({"summary": summary, "issues": issues}, indent=2) + "\n")

    print(json.dumps(summary))
    raise SystemExit(1 if summary["errors"] else 0)


if __name__ == "__main__":
    main()
