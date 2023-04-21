# Projet Pandora

Site web pour le serveur pandora.

## Back

---

Application express avec nodejs

### Librairies utilsées:

1. express
2. helmet
3. morgan
4. dotenv
5. cors
6. mysql2
7. uuid
8. nodemon (dévelopement)

### Lancement (développement):

```
npm install
npm start
```

## Front

---

Application React construite avec vite

### Librairies utilisées:

1. react-router-dom
2. dotenv

Configuration d'un serveur proxy pour utiliser l'api depuis l'url du front

### Lancement (développement):

```
npm install
npm run dev
```

### Build (développement):

```
npm install
npm run build
```

### mise en place du super admin

- [x] ajouter une ligne "admin" boolean user la table users
- [x] application de admin = true sur le premier user inscrit
- l'admin aura la possibilité de:

  - [x] gestion de tout les users avec la possibilité d'ajouter des admins
  - [x] gestion de toutes les annonces
  - [x] gestion des images du serveur
  - [ ] creation et activation du service discord pour les embeds
    - [x] formulaire:
      - [x] champ url webhook
      - [x] champ url site
      - [ ] champ embeds
    - [ ] checkbox activation
    - [ ] bouton suppression du webhook
  - [ ] finir la galerie d'images
