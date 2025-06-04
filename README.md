# Cinephoria Web

Cinéphoria Web est une application React permettant aux utilisateurs de :

- Parcourir les films disponibles
- Réserver des places de cinéma
- Accéder à leurs réservations
- Gérer les films, séances et utilisateurs via une interface administrateur
- Consulter et gérer les avis en tant qu’employé

---

## Fonctionnalités principales

- Authentification JWT
-  Système de réservation en ligne
-  Gestion des séances et films
-  Interfaces dédiées : Utilisateur, Employé, Administrateur
-  Application React avec Material UI et React Router
-  Tests unitaires avec Jest

---

##  Technologies utilisées

- **React.js**
- **Material UI**
- **React Router DOM**
- **JWT, js-cookie**
- **SweetAlert2**
- **Swiper.js**
- **Jest** (tests)
- **Docker** (conteneurisation possible)
- **GitHub Actions** (déploiement CI/CD)

---

## Structure du projet

```plaintext
├── Cinephoria-web-main/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── README.md
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── .github/
│   │   ├── workflows/
│   │   │   ├── node.js.yml
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── MesReservations.jsx
│   │   │   ├── MoviesDetailles.jsx
│   │   │   ├── MoviesPage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ReservationPage.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   ├── Admin/
│   │   │   │   ├── EmployePage.jsx
│   │   │   │   ├── FilmsPage.jsx
│   │   │   │   ├── SallesPage.jsx
│   │   │   │   ├── SeancePage.jsx
│   │   │   ├── Employe/
│   │   │   │   ├── GererLesAvis.jsx
│   │   │   ├── __tests__/
│   │   │   │   ├── token.test.js
│   │   │   │   ├── util.test.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── token.js
│   │   │   ├── validation.js
```

---

## Installation locale

### Cloner le dépôt

```bash
git clone https://github.com/manarlarbi/cinephoria-web.git
cd cinephoria-web
```

### Installer les dépendances

```bash
npm install
```

### Lancer le projet

```bash
npm start
```

> L’application sera accessible sur [http://localhost:3000](http://localhost:3000)

---

---

## Lancer les tests

Ce projet inclut des tests unitaires situés dans `src/components/__tests__/`.

Pour les exécuter :

```bash
npm test
```

---

## Déploiement Docker (optionnel)

Un fichier `Dockerfile` est présent. Pour construire et lancer un conteneur :

```bash
docker build -t cinephoria-web .
docker run -p 3000:3000 cinephoria-web
```

---

##  Variables d'environnement

Créez un fichier `.env` à la racine et ajoutez-y :

```env
REACT_APP_API_URL=http://localhost:3033
```

---

##  Auteur

Projet développé dans le cadre du **Titre Professionnel CDA** — par _[ Manar LARBI]_.

---