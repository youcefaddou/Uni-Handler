Cahier des charges fonctionnel et technique
1. Contexte et Objectifs
L'objectif de ce projet est de concevoir une application web permettant aux écoles de gérer leurs promotions et les élèves associés. Cette application devra être accessible uniquement aux écoles enregistrées, via un système d'authentification par token. L'application sera développée en HTML, CSS et JavaScript et devra être jolie, moderne et responsive pour une expérience utilisateur optimale.

2. Fonctionnalités principales
2.1 Authentification
Système d'accès sécurisé : L'accès à l'application est réservé aux utilisateurs identifiés comme "écoles", en utilisant un token envoyé par e-mail.
 
2.2 Gestion des Promotions
Ajout d'une promotion : Un utilisateur peut créer une promotion en renseignant les champs obligatoires comme le nom, la date de début et la date de fin.
Modification d'une promotion : L'utilisateur peut éditer les détails d'une promotion existante.
Suppression d'une promotion : L'utilisateur peut supprimer une promotion.
Affichage de la liste des promotions : Afficher la liste complète des promotions de l'école connectée avec des options pour ajouter, modifier, supprimer, ou voir les détails de chaque promotion.
2.3 Gestion des Élèves
Accès aux élèves par promotion : Lorsque l'utilisateur clique sur "Détails" d'une promotion, il accède à la liste des élèves associés à cette promotion.
Ajout d'un élève : Possibilité d'ajouter un élève à une promotion spécifique en renseignant ses informations de base (nom, prénom, email, etc.).
Modification des informations d'un élève : Modification des informations d'un élève existant.
Suppression d'un élève : Suppression d'un élève de la liste.
Affichage de la liste des élèves : Afficher de manière organisée tous les élèves associés à une promotion.
3. Structure de l'Application
3.1 Architecture Front-End
L'application sera développée en utilisant les technologies front-end suivantes :

HTML : Structure de base de la page.
CSS : Mise en page et design responsive.
Utilisation de Flexbox ou CSS Grid pour la disposition des éléments.
Utilisation de médias queries pour assurer la responsivité sur divers appareils (mobile, tablette, ordinateur).
JavaScript : Interaction et manipulation des données en front-end.
3.2 Organisation des Pages
Page d'Accueil (Liste des Promotions) :
Affiche la liste des promotions de l'école connectée.
Chaque promotion affiche les options : Détails, Modifier, Supprimer.
Bouton pour ajouter une nouvelle promotion.
Page Détails de la Promotion :

Affiche la liste des élèves associés à la promotion sélectionnée.
Chaque élève a des options pour modifier ou supprimer.
Bouton pour ajouter un nouvel élève à cette promotion.
Page Ajouter/Modifier Promotion :

Formulaire pour créer ou éditer une promotion avec les champs nécessaires.
Page Ajouter/Modifier Élève :

Formulaire pour ajouter ou éditer un élève avec les champs nécessaires.
3.3 Navigation
Barre de navigation : Liens vers les pages principales (Liste des promotions, Ajout de promotion, etc.) accessibles en fonction des droits de l'utilisateur.
Retour aux promotions : Depuis la page des élèves, un bouton permet de revenir à la liste des promotions.
4. Conception de l'Interface Utilisateur (UI)
Design moderne : Interface épurée et attrayante, avec une palette de couleurs agréable et une typographie lisible.
Responsive design : Adaptation de l'affichage pour les différentes résolutions (mobile, tablette, desktop).
Icônes et boutons :
Utilisation d’icônes pour représenter les actions CRUD (Ajouter, Modifier, Supprimer).
Boutons bien visibles pour les actions principales (ajout de promotion, détails, retour, etc.).
Feedback utilisateur : Messages d’erreur, de succès, et de validation pour chaque action.
