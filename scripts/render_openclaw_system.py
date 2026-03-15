#!/usr/bin/env python3

from __future__ import annotations

import json
from openclaw_system_lib import (
    APPROVALS_DIR,
    METRICS_DIR,
    TASKS_DIR,
    VIEWS_DIR,
    ensure_output_dirs,
    load_approvals,
    load_tasks,
    render_approvals,
    render_board,
    render_metrics,
    render_tasks_by_owner,
)


def main():
    ensure_output_dirs()

    tasks = load_tasks()
    approvals = load_approvals()

    (VIEWS_DIR / "board.md").write_text(render_board(tasks))
    (VIEWS_DIR / "tasks-by-owner.md").write_text(render_tasks_by_owner(tasks))
    (VIEWS_DIR / "approvals.md").write_text(render_approvals(approvals))
    (METRICS_DIR / "health.json").write_text(json.dumps(render_metrics(tasks, approvals), indent=2) + "\n")


if __name__ == "__main__":
    main()
