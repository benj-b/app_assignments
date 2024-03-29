# app_assignments
M1 Angular course : Projet Final 

# Auteurs
Benjamin BERNAUD

Oscar VILLETTE

# Usage local

launch first the api : `node api/server.js`
then launch the app in another terminal : `cd angularFrontM1Miage2022_2023/src/app ; ng serve`

# Usage sur render.com

[Link for back-end on render.com](https://angular-project-vmx5.onrender.com/api/assignments)

[Link for front-end on render.com](https://front-angular.onrender.com) 

Par la nature de l'hébergement sur render.com, il se peut que le front prenne du temps à charger initialement. Une fois chargé, il se peut que la base de données ne s'affiche pas toute seule. Pour corriger ce problème, il suffit de cliquer sur le lien du back-end pour l'initialiser une 1ere fois.

# Les contributions :
Nous sommes partis du travail de Benjamin à la suite des derniers TPs. Benjamin a fait tout le travail de front-end. Oscar avait plutot un rôle de soutien émotionel et a proposé des idées, cependant il s'est chargé de l'hébergement sur render.com. Il a aussi essayé, en vain malheureusement, d'implémenter JWT authentication. Nous avons tous les deux aussi essayé de faire fonctionner le triage de devoirs mais nous n'y sommes pas arrivé de manière convenable. Nous avons donc préféré enlever cette fonctionalité pour le rendu final.

# Fonctionalités présentes :
- Pagination
- Différents utilisateurs avec différents rôles
- Header fixe
- CRUD
- Sign in / Sign off
- Register
- Formulaire stepper pour ajout 
- SnackBar 
- Animations des photos de professeurs avec texte associé à la note (si devoir rendu)
- Animation spéciale si note égal à 20.
- Population d'une base de données avec 1000 assignements

# Fonctionalités Nice-To-Have :
- JWT Authentication
- Tri sur header ( nous avons réussi à créer une version qui ne filtrait que la page actuelle, et non l'ensemble du tableau )
- Filtre Rendu ( lié au filtrage des header, donc désactivé pour le rendu final. Notre version marche, mais comme pour le tri, seulement sur la page affichée )
- Barre de recherche
