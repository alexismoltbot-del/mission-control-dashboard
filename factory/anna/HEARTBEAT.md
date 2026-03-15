# Heartbeat - Anna

## Frequence

2x/jour (09h00 et 18h00)

## Check

1. `shared/system/views/tasks-by-owner.md` : quelles taches `anna` sont `ready` ou `running` ?
2. `shared/system/views/approvals.md` : une approval contenu a change ?
3. Une run peut-elle produire un draft complet au lieu d'un simple resume ?

## Regle

- Le heartbeat ne sert pas a refaire l'historique.
- Il sert a verifier s'il y a une tache a executer ou une approval a mettre a jour.

## Escalade

Contacter Alexis seulement si:

- une approval propre existe deja dans `shared/system/approvals/`
- un draft est reellement pret a trancher
- une anecdote personnelle est indispensable pour finir

## Si rien

`HEARTBEAT_OK`
