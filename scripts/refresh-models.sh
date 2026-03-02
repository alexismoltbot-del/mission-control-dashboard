#!/bin/bash
cd ~/.openclaw
python3 -c "
import json, subprocess, datetime

result = subprocess.run(['openclaw', 'config', 'get', 'agents.defaults.model'], capture_output=True, text=True)
try: model_config = json.loads(result.stdout)
except: model_config = {'primary': 'unknown', 'fallbacks': []}

result2 = subprocess.run(['openclaw', 'sessions', '--json', '--active', '1440'], capture_output=True, text=True)
try: sessions = json.loads(result2.stdout)
except: sessions = []

result4 = subprocess.run(['openclaw', 'config', 'get', 'agents.defaults.heartbeat'], capture_output=True, text=True)
try: heartbeat = json.loads(result4.stdout)
except: heartbeat = {}

output = {
    'config': model_config,
    'heartbeat': heartbeat,
    'sessions': sessions,
    'generatedAt': datetime.datetime.now().isoformat()
}

with open('workspace/data/models.json', 'w') as f:
    json.dump(output, f, indent=2, default=str)
print('OK')
"
