#!/bin/bash

# Créer un backup de la structure actuelle
mkdir -p /tmp/laravel_template_backup

# Copier uniquement la structure des dossiers
find . -type d -not -path "./vendor" -not -path "./node_modules" -not -path "./storage/framework/*" -not -path "./storage/logs" -not -path "./storage/app/public" -not -path "./storage/clockwork" -not -path "./.git" -print0 | xargs -0 -I {} mkdir -p "/tmp/laravel_template_backup/{}"

echo "Sauvegarde de la structure terminée dans /tmp/laravel_template_backup"
