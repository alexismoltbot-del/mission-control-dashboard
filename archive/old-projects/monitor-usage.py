#!/usr/bin/env python3
"""Script de monitoring LLM usage en temps réel"""
import subprocess, json, time, os
from datetime import datetime

def get_usage_stats():
    """Récupère les stats d'usage depuis OpenClaw"""
    try:
        # Via openclaw status
        result = subprocess.run(['openclaw', 'status'], capture_output=True, text=True)
        output = result.stdout
        
        # Parse token usage
        tokens_today = 0
        requests_today = 0
        cost_today = 0.0
        
        # Extract from output (approximation)
        if 'Token' in output:
            lines = output.split('\n')
            for line in lines:
                if 'tokens' in line.lower():
                    # Basic parsing
                    pass
        
        return {
            'timestamp': datetime.now().isoformat(),
            'tokens': tokens_today,
            'requests': requests_today,  
            'estimated_cost_eur': cost_today,
            'status': 'ok'
        }
    except Exception as e:
        return {'error': str(e), 'timestamp': datetime.now().isoformat()}

def check_providers():
    """Vérifie le status de tous les providers"""
    providers = {}
    
    # Test Router
    try:
        result = subprocess.run(['curl', '-s', 'http://127.0.0.1:4001/health'], 
                              capture_output=True, text=True, timeout=5)
        data = json.loads(result.stdout)
        providers['router'] = 'ok' if data.get('status') == 'ok' else 'error'
    except:
        providers['router'] = 'down'
    
    # Test Ollama
    try:
        result = subprocess.run(['curl', '-s', 'http://localhost:11434/api/tags'],
                              capture_output=True, text=True, timeout=5) 
        providers['ollama'] = 'ok' if 'models' in result.stdout else 'error'
    except:
        providers['ollama'] = 'down'
        
    return providers

if __name__ == '__main__':
    print("🧪 LLM Usage Monitor")
    print("=" * 50)
    
    while True:
        stats = get_usage_stats()
        providers = check_providers()
        
        print(f"\n⏰ {datetime.now().strftime('%H:%M:%S')}")
        print(f"📊 Tokens: {stats.get('tokens', 0):,}")
        print(f"💰 Coût est.: {stats.get('estimated_cost_eur', 0):.2f}€")
        print(f"🔗 Router: {providers.get('router', 'unknown')}")
        print(f"🏠 Ollama: {providers.get('ollama', 'unknown')}")
        
        time.sleep(10)  # Update every 10s
