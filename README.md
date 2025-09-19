# CarnetNotes

Application mobile de gestion de notes développée avec React Native et Expo. Cette application permet de créer, consulter, modifier et supprimer des notes avec une interface simple.

## Fonctionnalités

- **Liste des notes** : Affichage de toutes les notes avec titre et date de création
- **Recherche** : Barre de recherche pour filtrer les notes par titre (côté client)
- **Création** : Ajout de nouvelles notes avec titre et contenu
- **Consultation** : Affichage détaillé d'une note avec toutes ses informations
- **Modification** : Édition du titre et du contenu d'une note existante
- **Suppression** : Suppression définitive d'une note
- **Notifications** : Snackbar pour les actions réussies ou échouées
- **Navigation** : Navigation entre les différents écrans
- **Gestion d'état** : Redux pour la gestion centralisée de l'état
- **API REST** : Communication avec un serveur JSON Server

## Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/jerome-pourra/carnet-notes.git
   cd carnet-notes
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration du backend**
   
   L'application utilise une adresse IP locale pour communiquer avec le serveur. 
   
   **Récupérer votre adresse IP privée :**
   - Sous Windows : Ouvrez un terminal et tapez `ipconfig`
   - Cherchez votre adresse IPv4 (ex: 192.168.1.74)
   
   Modifiez `app/config.ts` avec votre adresse IP privée :
   ```typescript
   export const BACKEND_URL = 'http://VOTRE_IP_PRIVE:3000';
   ```

## Lancement du projet

### Démarrer le serveur JSON Server

**Terminal 1** - Lancer le serveur backend :
```bash
npm run server
```
Le serveur JSON Server sera disponible sur `http://localhost:3000` avec les endpoints :
- `GET /notes` - Liste des notes
- `GET /notes/:id` - Détail d'une note
- `POST /notes` - Créer une note
- `PUT /notes/:id` - Modifier une note
- `DELETE /notes/:id` - Supprimer une note

### Démarrer l'application React Native

**Terminal 2** - Lancer l'application mobile :
```bash
npm start
```
ou pour Android directement :
```bash
npm run android
```

## Utilisation

1. **Liste des notes** : Écran principal affichant toutes les notes
2. **Recherche** : Tapez dans la barre de recherche pour filtrer les notes
3. **Ajouter une note** : Bouton "Add" pour créer une nouvelle note
7. **Actualiser** : Bouton "Refresh" pour recharger la liste
4. **Voir une note** : Tapez sur une note dans la liste pour voir ses détails
5. **Modifier** : Bouton "Update" dans l'écran de détail
6. **Supprimer** : Bouton "Delete" dans l'écran de détail

## Structure du projet

```
CarnetNotes/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── Empty.tsx        # Composant pour état vide
│   │   ├── Loading.tsx      # Composant de chargement
│   │   ├── Router.tsx       # Configuration de navigation
│   │   └── Snackbar.tsx     # Notifications
│   ├── screens/             # Écrans de l'application
│   │   ├── ListScreen.tsx   # Liste des notes
│   │   ├── AddScreen.tsx    # Ajout de note
│   │   ├── DetailsScreen.tsx # Détails d'une note
│   │   └── UpdateScreen.tsx # Modification d'une note
│   ├── store/               # Gestion d'état Redux
│   │   ├── actions/         # Actions Redux
│   │   ├── reducers/        # Reducers Redux
│   │   ├── selectors/       # Sélecteurs Redux
│   │   └── types/           # Types TypeScript
│   ├── utils/               # Utilitaires
│   └── config.ts            # Configuration API
├── server/
│   ├── db.json              # Base de données JSON
│   └── db.initial.json      # Données initiales
├── assets/                  # Ressources (images, fonts)
└── App.tsx                  # Point d'entrée de l'application
```

## Scripts disponibles

- `npm start` - Démarre Expo Dev Server
- `npm run android` - Lance sur émulateur Android
- `npm run ios` - Lance sur simulateur iOS
- `npm run web` - Lance version web
- `npm run server` - Démarre JSON Server (port 3000)
- `npm run lint` - Vérification du code avec ESLint

## API Endpoints

Le serveur JSON Server expose les endpoints suivants :

| Méthode |   Endpoint   | Description               |
|---------|--------------|---------------------------|
| GET     | `/notes`     | Récupère toutes les notes |
| GET     | `/notes/:id` | Récupère une note par ID  |
| POST    | `/notes`     | Crée une nouvelle note    |
| PUT     | `/notes/:id` | Met à jour une note       |
| DELETE  | `/notes/:id` | Supprime une note         |

## Fonctionnalités avancées

- **Gestion d'erreurs** : Timeout sur les requêtes (5 secondes)
- **Recherche** : Filtrage sans accents et insensible à la casse

## Notes de développement

- Les opérateurs de recherche JSON Server (`_like`, `_gte`, etc.) ne sont plus supportés dans la v1.0+
- La recherche est implémentée côté client pour éviter les problèmes de compatibilité
- Le serveur **JSON Server** doit être redémarré si des modifications manuelles sont faites sur `db.json`
- Si des données sont modifiées manuellement dans `db.json`, l'application peut avoir des états Redux incohérents utilisez le bouton "Refresh" pour synchroniser les données
- Il n'y a pas encore de validation des formulaires implémentée dans l'application
