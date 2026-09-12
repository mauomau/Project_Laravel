#!/bin/bash

# Créer un nouveau dossier pour le template
TEMPLATE_DIR="../laravel-inertia-react-template"

# Créer le répertoire s'il n'existe pas
mkdir -p "$TEMPLATE_DIR"

# Copier les fichiers nécessaires
rsync -av --progress . "$TEMPLATE_DIR/" \
    --exclude='.git' \
    --exclude='vendor' \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='.env.example' \
    --exclude='storage/app/public' \
    --exclude='storage/logs' \
    --exclude='storage/framework/cache' \
    --exclude='storage/framework/sessions' \
    --exclude='storage/framework/views' \
    --exclude='storage/clockwork' \
    --exclude='.phpunit.cache' \
    --exclude='.idea' \
    --exclude='.vscode' \
    --exclude='.DS_Store'

# Se déplacer dans le dossier du template
cd "$TEMPLATE_DIR"

# Supprimer le cache et les logs
rm -rf bootstrap/cache/*

# Créer un nouveau .env.example
cp .env.example .env.example.template
sed -i '/^APP_NAME=/s/=.*/=Laravel/' .env.example.template
sed -i '/^APP_ENV=/s/=.*/=local/' .env.example.template
sed -i '/^APP_DEBUG=/s/=.*/=true/' .env.example.template
sed -i '/^APP_URL=/s/=.*/=http:\/\/localhost/' .env.example.template

sed -i '/^DB_CONNECTION=/s/=.*/=mysql/' .env.example.template
sed -i '/^DB_HOST=/s/=.*/=127.0.0.1/' .env.example.template
sed -i '/^DB_PORT=/s/=.*/=3306/' .env.example.template
sed -i '/^DB_DATABASE=/s/=.*/=laravel/' .env.example.template
sed -i '/^DB_USERNAME=/s/=.*/=root/' .env.example.template
sed -i '/^DB_PASSWORD=/s/=.*/=/' .env.example.template

# Supprimer l'ancien .env.example et renommer le template
rm .env.example
mv .env.example.template .env.example

# Initialiser un nouveau dépôt Git
rm -rf .git
git init
git add .
git commit -m "Initial commit - Laravel Inertia React Template"

echo ""
echo "✅ Template créé avec succès dans: $TEMPLATE_DIR"
echo ""
echo "Pour créer un nouveau projet à partir de ce template:"
echo "1. Créez un nouveau dépôt sur GitHub"
echo "2. Ajoutez-le comme remote: git remote add origin <votre-repo>"
echo "3. Poussez le code: git push -u origin main"
echo ""
echo "Les utilisateurs pourront ensuite cloner votre template avec:"
echo "git clone <votre-repo> mon-nouveau-projet"
echo "cd mon-nouveau-projet"
echo "composer install"
echo "npm install"
echo "cp .env.example .env"
echo "php artisan key:generate"
