# Réponses aux questions du TP Pleine Page (Q1 à Q13)

## Q1 : Déclaration du titre dans le `app.ts` initial
Dans le fichier `src/app/app.ts` généré initialement par Angular CLI, le titre de l'application était déclaré au moyen d'un Signal Angular :
```ts
protected readonly title = signal('pleine-page');
```
Dans le template `src/app/app.html` d'origine, l'interpolation `<h1>Hello, {{ title() }}</h1>` appelait ce signal et affichait ainsi le message généré « Hello, pleine-page ».

---

## Q2 : Absence de route configurée et `<router-outlet />` vide
Initialement, le fichier `src/app/app.routes.ts` contenait un tableau de routes vide :
```ts
export const routes: Routes = [];
```
Sans correspondance de route définie pour l'URL `/`, le composant racine `<router-outlet />` ne chargeait aucun composant enfant et restait donc vide.

---

## Q3 : Template initial `app.html`
Le fichier `src/app/app.html` généré par défaut contenait le template de bienvenue standard d'Angular CLI, incluant des styles inline, des liens de documentation, le logo Angular SVG, le message d'accueil « Hello, pleine-page » et la balise `<router-outlet />` à la fin.

---

## Q4 : Ajout de la route racine associant Catalogue
En configurant la route dans `src/app/app.routes.ts` :
```ts
export const routes: Routes = [
  { path: '', component: Catalogue },
  ...
];
```
Le routeur Angular associe l'URL vide `''` (la racine `/`) au composant `Catalogue` et instancie automatiquement `<app-catalogue>` à l'emplacement de `<router-outlet />`.

---

## Q5 : Apparition automatique d'un neuvième livre grâce à `@for`
Grâce à la réactivité d'Angular et à la directive de boucle `@for (l of resultats(); track l.id)`, le template HTML dérive automatiquement de la liste `LIVRES`. Si un neuvième livre est ajouté dans le tableau `LIVRES`, le `computed resultats` se met à jour et Angular génère immédiatement l'élément HTML correspondant sans aucune modification de code dans le template.

---

## Q6 : Le `computed resultats` et l'affichage du compteur
Dans `catalogue.ts`, `resultats` est défini par :
```ts
protected readonly resultats = computed(() => {
  const term = this.filtre().toLowerCase().trim();
  if (!term) return LIVRES;
  return LIVRES.filter(l => l.auteur.toLowerCase().includes(term));
});
```
Dans `catalogue.html`, l'expression `{{ resultats().length }}` lit la propriété `length` du tableau produit par la fonction réactive `computed`. À chaque frappe dans le champ de saisie, le signal `filtre` change, déclenchant le re-calcul de `resultats` et la mise à jour instantanée du nombre de livres affichés.

---

## Q7 : Insensibilité à la casse via `toLowerCase()`
L'utilisation de `.toLowerCase()` sur la valeur du filtre et sur le nom de l'auteur :
```ts
l.auteur.toLowerCase().includes(term)
```
permet une recherche insensible à la casse. Ainsi, saisir `ferrand` ou `FERRAND` convertit les deux chaînes en minuscules (`ferrand`), garantissant l'obtention des 2 mêmes résultats (Yann Ferrand et Awa Ferrand).

---

## Q8 : Erreur en l'absence de `withComponentInputBinding()`
Le composant `Fiche` déclare une entrée requise pour le paramètre d'URL :
```ts
readonly id = input.required<string>();
```
`provideRouter(routes, withComponentInputBinding())` permet à Angular d'injecter automatiquement les paramètres de route (ici `:id`) dans les `@Input()` du composant. Si on retire `withComponentInputBinding()`, le paramètre de route n'est pas transmis à l'input, ce qui déclenche l'erreur runtime Angular :
`NG0950: Input is required but no value is available yet.` lors de la navigation vers la route `/livre/1000`.

---

## Q9 : Réutilisation du composant `Fiche` et bug du panier booléen
Lorsqu'on navigue d'une fiche à une suggestion (ex: de `/livre/1000` vers `/livre/1001`), le composant `Fiche` n'est pas détruit puis recréé ; Angular réutilise la même instance de composant pour optimiser les performances.
Si le panier était géré par un simple booléen `ajoute = signal(false)`, sa valeur restait à `true` lors du changement de livre.
En remplaçant le booléen par un tableau d'identifiants `panier = signal<number[]>([])` et en calculant :
```ts
protected readonly ajoute = computed(() =>
  this.panier().includes(Number(this.id()))
);
```
l'état du bouton dépend désormais de l'ID du livre courant (`this.id()`). Lorsque la route change, `this.id()` change, le `computed` se réévalue et affiche « Ajouter au panier » pour le livre 1001 tout en conservant le livre 1000 dans la liste `panier`.

---

## Q10 : Réinitialisation du panier après un rafraîchissement (F5)
En appuyant sur F5, la page Web est entièrement rechargée par le navigateur. Le contexte JavaScript est détruit et réinitialisé. L'instance du composant `Fiche` est recréée et le signal `panier` reprend sa valeur initiale `[]`. Les livres ajoutés au panier sont donc perdus.

---

## Q11 : Solutions pour persister le panier après un F5
Pour conserver le panier après un rechargement de page (F5), on peut :
1. Stocker la liste des identifiants dans le `localStorage` du navigateur à chaque modification et la relire au démarrage de l'application.
2. Déplacer la gestion du panier dans un Service Angular global (`@Injectable({ providedIn: 'root' })`) qui synchronise ses données avec le `localStorage`.

---

## Q12 : Statut HTTP 404 sur GitHub Pages et rôle de `404.html`
GitHub Pages est un hébergeur de fichiers statiques. Lorsqu'on saisit directement l'URL `/pleine-page/livre/1000`, le serveur cherche le fichier physique `livre/1000/index.html` qui n'existe pas, et répond donc avec le statut HTTP 404.
En fournissant une copie d' `index.html` nommée `404.html`, GitHub Pages sert ce fichier lors d'une erreur 404. Le navigateur télécharge l'application Angular, qui prend le relais côté client (SPA), analyse le chemin `/livre/1000` via son routeur et affiche la fiche du livre.

---

## Q13 : Rôle du `<base href="/pleine-page/">`
La balise `<base href="/pleine-page/">` insérée dans le `<head>` de l' `index.html` indique au navigateur et au routeur Angular le sous-dossier racine de l'application sur GitHub Pages. Cela permet de résoudre correctement tous les chemins relatifs d'actifs (scripts, styles) et d'assurer que les redirections ou retours vers la racine (`/`) ciblent `/pleine-page/` et non la racine absolue du domaine.
