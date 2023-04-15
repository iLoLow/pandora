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

  - [ ] gestion de tout les users avec la possibilité d'ajouter des admins
  - [ ] gestion de toutes les annonces
  - [x] gestion des images du serveur
  - [ ] creation et activation du service discord pour les embeds
    - [ ] formulaire:
      - [ ] champ url webhook
      - [ ] champ url site
      - [ ] champ embeds
    - [ ] checkbox activation
    - [ ] bouton suppression du webhook

- sur la page d'accueil du tableau de bord:
  - [ ] nombre d'annonces
  - [ ] nombre de users avec leur infos (nombre d'annonces ,date d'inscription ...)
  - [ ] annonce la plus populaire
  - [ ] nombre de visite sur le site
