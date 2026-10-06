# Pleine Page 📚

« Pleine Page » est une petite librairie en ligne développée avec Angular 21 et la réactivité native basée sur les Signals. Ce projet permet de consulter un catalogue de livres, de filtrer instantanément par auteur, d'accéder aux fiches détaillées via un routeur paramétré, d'afficher des suggestions personnalisées et de gérer un panier local.

## 📋 Prérequis

- **Node.js** : v20+ (recommandé v24)
- **npm** : v9+
- **Angular CLI** : 21.x

## 🚀 Installation & Lancement

1. **Cloner le dépôt et installer les dépendances** :
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement sur le port 4310** :
   ```bash
   npx ng serve --port 4310
   ```
   L'application sera accessible à l'adresse : `http://localhost:4310/`

## ✨ Fonctionnalités

- **En-tête commun** : Marque « Pleine Page » et lien « Catalogue » ramenant à la racine.
- **Catalogue dynamique** : Liste de 8 livres originaux affichant titre, auteur et prix.
- **Filtre réactif instantané** : Saisie par auteur avec mise à jour en temps réel via `signal` et `computed` (insensible à la casse).
- **Fiche produit paramétrée** : Accessible via `/livre/:id` avec `withComponentInputBinding()` et `input.required<string>()`.
- **Suggestions personnalisées** : Affichage de 4 suggestions excluant le livre actuellement consulté.
- **Gestion du panier local** : Bouton réactif « Ajouter au panier » qui passe à l'état « Ajouté » (désactivé) spécifiquement pour le livre concerné.
- **Gestion du livre inexistant** : Message d'erreur clair si l'ID n'existe pas (ex: `/livre/9999`).

## 📁 Organisation des fichiers

```text
src/
├── app/
│   ├── catalogue/
│   │   ├── catalogue.ts     # Logique de filtre réactif
│   │   ├── catalogue.html   # Template du catalogue
│   │   └── catalogue.css    # Styles de la grille du catalogue
│   ├── fiche/
│   │   ├── fiche.ts         # Fiche produit & correction bug panier
│   │   ├── fiche.html       # Template fiche et suggestions
│   │   └── fiche.css        # Styles couverture fictive et boutons
│   ├── app.ts               # Composant racine
│   ├── app.html             # Layout global (Header + RouterOutlet)
│   ├── app.css              # Style de l'en-tête
│   ├── app.config.ts        # Configuration du provideRouter
│   ├── app.routes.ts        # Configuration des routes
│   └── livres.ts            # Interface Livre et données LIVRES
├── styles.css               # Design system et variables globales CSS
reponses.md                  # Réponses détaillées aux questions Q1 à Q13
```

## 🛠️ Build et Déploiement (GitHub Pages)

1. **Générer le build de production avec le base href** :
   ```bash
   npx ng build --base-href /pleine-page/
   ```
   *(Sous Git Bash / Windows, si nécessaire : `MSYS_NO_PATHCONV=1 npx ng build --base-href /pleine-page/`)*

2. **Publication sur GitHub Pages** :
   ```bash
   npx angular-cli-ghpages --dir=dist/pleine-page/browser
   ```

   Sur GitHub, dans la section **Settings → Pages** :
   - Source : `Deploy from a branch`
   - Branch : `gh-pages` / `/ (root)`

## ⚠️ Limites du panier local

Conformément aux exigences du TP, le panier est conservé dans l'état local du composant `Fiche` (`panier = signal<number[]>([])`). Le panier est réinitialisé lors d'un rechargement complet de la page (F5) ou lors du retour au catalogue. Pour persister ces données, il faudrait utiliser le `localStorage` ou un service global.

## 🔗 Liens du projet

- **Dépôt GitHub** : `https://github.com/VOTRE-COMPTE/pleine-page`
- **Site publié** : `https://VOTRE-COMPTE.github.io/pleine-page/`
