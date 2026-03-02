#!/usr/bin/env python3
"""Mini HTTP server for Mission Control with /api/refresh-models endpoint."""
import http.server, os, subprocess, json

WORKSPACE = os.path.expanduser("~/.openclaw/workspace")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WORKSPACE, **kwargs)

    def do_POST(self):
        if self.path == "/api/refresh-models":
            try:
                result = subprocess.run(
                    ["bash", os.path.join(WORKSPACE, "scripts/refresh-models.sh")],
                    capture_output=True, text=True, timeout=15
                )
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": True, "output": result.stdout.strip()}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": False, "error": str(e)}).encode())
        elif self.path == "/api/refresh-files":
            try:
                subprocess.run(
                    ["bash", "-c", f"cd {WORKSPACE} && find . -maxdepth 3 -not -path './.git/*' -not -name '.DS_Store' | python3 -c \"\nimport sys, json, os\nfiles = []\nfor line in sys.stdin:\n    path = line.strip()\n    if not path or path == '.': continue\n    full = os.path.join('{WORKSPACE}', path[2:])\n    is_dir = os.path.isdir(full)\n    size = 0 if is_dir else os.path.getsize(full)\n    ext = os.path.splitext(path)[1] if not is_dir else ''\n    files.append({{'path': path[2:], 'name': os.path.basename(path), 'isDir': is_dir, 'size': size, 'ext': ext, 'depth': path.count('/') - 1}})\nfiles.sort(key=lambda x: (not x['isDir'], x['path'].lower()))\nwith open('{WORKSPACE}/data/files.json','w') as f: json.dump(files, f, indent=2)\n\""],
                    capture_output=True, text=True, timeout=10
                )
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": True}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": False, "error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()

if __name__ == "__main__":
    server = http.server.HTTPServer(("0.0.0.0", 8081), Handler)
    print("Mission Control server on :8081")
    server.serve_forever()
