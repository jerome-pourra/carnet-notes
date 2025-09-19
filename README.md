# CarnetNotes

Application mobile de gestion de notes développée avec React Native et Expo. Cette application permet de créer, consulter, modifier et supprimer des notes avec une interface simple.

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
   const HOST = 'VOTRE_IP_PRIVE';
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

## Structure du projet

```
CarnetNotes/
├── app/
│   ├── components/          # Composants réutilisables
│   ├── screens/             # Écrans de l'application
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

## Notes de développement

- Les opérateurs de recherche JSON Server (`_like`, `_gte`, etc.) ne sont plus supportés dans la v1.0+
- La recherche est implémentée côté client pour éviter les problèmes de compatibilité
- Le serveur **JSON** doit être redémarré si des modifications manuelles sont faites sur `db.json`
- Si des données sont modifiées manuellement dans `db.json`, l'application peut avoir des états Redux incohérents utilisez le bouton "Refresh" pour synchroniser les données
