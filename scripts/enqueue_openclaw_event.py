#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4


INBOX_DIR = Path("/Users/alexis/.openclaw/shared/system/events/inbox")


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat()


def main():
    parser = argparse.ArgumentParser(description="Drop a normalized event into the OpenClaw inbox.")
    parser.add_argument("--source", required=True, help="stripe|typeform|gmail|calendly|github|manual")
    parser.add_argument("--kind", required=True, help="checkout.completed|form.response|email.received|manual.note")
    parser.add_argument("--project", required=True, help="fiscalgpt|voiture|content|generic|system")
    parser.add_argument("--dedupe-key", default="", help="Stable key for de-duplication")
    parser.add_argument("--payload-file", help="Path to a JSON payload file")
    args = parser.parse_args()

    payload = {}
    if args.payload_file:
        payload = json.loads(Path(args.payload_file).read_text())

    event_id = f"EVT-{datetime.now().strftime('%Y%m%d')}-{uuid4().hex[:8]}"
    event = {
        "id": event_id,
        "source": args.source,
        "kind": args.kind,
        "created_at": now_iso(),
        "dedupe_key": args.dedupe_key,
        "project": args.project,
        "payload": payload,
        "status": "inbox",
    }

    INBOX_DIR.mkdir(parents=True, exist_ok=True)
    path = INBOX_DIR / f"{event_id}.json"
    path.write_text(json.dumps(event, indent=2) + "\n")
    print(path)


if __name__ == "__main__":
    main()
