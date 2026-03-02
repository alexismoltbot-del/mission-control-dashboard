# Plan de Migration des Secrets - OpenClaw

**Date:** 2026-02-16  
**Objectif:** Migrer tous les secrets API de `openclaw.json` vers variables d'environnement

---

## 🔍 Secrets Identifiés

| Service | Type | Valeur actuelle (à révoquer) | Variable env cible |
|---------|------|------------------------------|-------------------|
| OpenRouter | API Key | `sk-or-v1-b8ae166...084e5b` | `OPENROUTER_API_KEY` |
| OpenAI | API Key | `sk-proj-VD5Ut8...PpAv0A` | `OPENAI_API_KEY` |
| Telegram Bot | Bot Token | `8457988646:AAGIj5Ae...GrbiQs` | `TELEGRAM_BOT_TOKEN` |
| Brave Search | API Key | `BSAmnwV2GdHG8_T6zgW8Y20rdC5-xUJ` | `BRAVE_API_KEY` |
| Gateway Auth | Token | `aec88bb774039c4e...a842369993963fe9843d70` | `GATEWAY_AUTH_TOKEN` |

---

## 📋 Plan d'Action (4 étapes)

### ÉTAPE 1 — Révoquer & Régénérer les Clés (15 min)

**1.1 OpenRouter**
- Aller sur https://openrouter.ai/keys
- Révoquer `sk-or-v1-b8ae166...`
- Créer nouvelle clé → copier

**1.2 OpenAI**
- Aller sur https://platform.openai.com/api-keys
- Révoquer `sk-proj-VD5Ut8...`
- Créer nouvelle clé → copier

**1.3 Telegram Bot**
- Contact @BotFather sur Telegram
- `/revoke` pour révoquer le token actuel
- `/newbot` ou `/token` pour obtenir nouveau token → copier

**1.4 Brave Search**
- Aller sur https://api.search.brave.com/app/keys
- Révoquer clé actuelle
- Générer nouvelle clé → copier

**1.5 Gateway Auth Token**
- Générer nouveau token sécurisé :
  ```bash
  openssl rand -hex 24
  ```
  → copier le résultat

---

### ÉTAPE 2 — Configurer Variables d'Environnement (5 min)

**2.1 Créer fichier `.env` (NON commité)**
```bash
cd /home/ubuntu/clawd
cat > .env << 'EOF'
# OpenClaw API Keys
OPENROUTER_API_KEY=<nouvelle_clé_openrouter>
OPENAI_API_KEY=<nouvelle_clé_openai>
TELEGRAM_BOT_TOKEN=<nouveau_token_telegram>
BRAVE_API_KEY=<nouvelle_clé_brave>
GATEWAY_AUTH_TOKEN=<nouveau_token_gateway>
EOF

chmod 600 .env
```

**2.2 Ajouter `.env` au `.gitignore`**
```bash
echo ".env" >> .gitignore
```

**2.3 Charger les variables au démarrage du gateway**

Éditer `/etc/systemd/system/openclaw-gateway.service` :
```ini
[Service]
EnvironmentFile=/home/ubuntu/clawd/.env
ExecStart=/usr/bin/node /home/ubuntu/.npm-global/lib/node_modules/openclaw/dist/gateway.js
```

---

### ÉTAPE 3 — Modifier `openclaw.json` (2 min)

**3.1 Remplacer les secrets par des références env**

```json
{
  "models": {
    "providers": {
      "openrouter": {
        "apiKey": "${OPENROUTER_API_KEY}"
      },
      "openai": {
        "apiKey": "${OPENAI_API_KEY}"
      }
    }
  },
  "tools": {
    "web": {
      "search": {
        "apiKey": "${BRAVE_API_KEY}"
      }
    }
  },
  "channels": {
    "telegram": {
      "botToken": "${TELEGRAM_BOT_TOKEN}"
    }
  },
  "gateway": {
    "auth": {
      "token": "${GATEWAY_AUTH_TOKEN}"
    }
  }
}
```

---

### ÉTAPE 4 — Redémarrer & Vérifier (3 min)

```bash
# Recharger systemd
sudo systemctl daemon-reload

# Redémarrer le gateway
sudo systemctl restart openclaw-gateway

# Vérifier le statut
sudo systemctl status openclaw-gateway

# Tester Telegram
# Envoyer un message au bot → doit répondre

# Vérifier logs
journalctl -u openclaw-gateway -f
```

---

## ✅ Checklist de Validation

- [ ] Toutes les anciennes clés révoquées
- [ ] Nouvelles clés générées et copiées
- [ ] Fichier `.env` créé avec permissions 600
- [ ] `.env` ajouté au `.gitignore`
- [ ] `openclaw.json` modifié avec références `${VAR}`
- [ ] Service systemd mis à jour avec `EnvironmentFile`
- [ ] Gateway redémarré sans erreur
- [ ] Bot Telegram répond correctement
- [ ] Aucun secret en clair dans `openclaw.json`

---

## 🚨 Rollback d'Urgence

Si problème après migration :

```bash
# Restaurer la config avec les anciennes clés
cp ~/.openclaw/openclaw.json.backup ~/.openclaw/openclaw.json

# Redémarrer
sudo systemctl restart openclaw-gateway
```

**Attention:** Les anciennes clés révoquées ne marcheront plus !  
→ Il faut recréer de nouvelles clés si rollback nécessaire

---

## 📝 Notes Post-Migration

- Les clés sont maintenant dans `.env` (non versionné)
- Backup de `.env` à faire régulièrement (chiffré)
- Pour déploiement sur nouveau serveur : copier `.env` en SSH sécurisé
- Rotation des clés recommandée tous les 3-6 mois

---

**Temps total estimé:** 25 minutes  
**Downtime:** ~2 minutes (temps du redémarrage)
