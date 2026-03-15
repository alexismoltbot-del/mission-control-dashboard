#!/usr/bin/env python3

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


SCRIPTS = [
    "render_openclaw_system.py",
    "validate_openclaw_system.py",
    "watch_openclaw_runtime.py",
]


def main():
    root = Path(__file__).resolve().parent
    results = []
    for script_name in SCRIPTS:
        path = root / script_name
        proc = subprocess.run([sys.executable, str(path)], capture_output=True, text=True)
        results.append(
            {
                "script": script_name,
                "returncode": proc.returncode,
                "stdout": proc.stdout.strip(),
                "stderr": proc.stderr.strip(),
            }
        )

    summary = {"ok": all(item["returncode"] == 0 for item in results), "results": results}
    print(json.dumps(summary, indent=2))
    raise SystemExit(0)


if __name__ == "__main__":
    main()
