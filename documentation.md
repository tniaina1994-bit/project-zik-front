# Projet Zik - Frontend Angular

## Description
Application frontend Angular pour l'API Laravel Projet Zik.
Base URL de l'API : `http://localhost:8000/api`

---

## API Endpoints

### Authentification (publique)
| Méthode | Endpoint | Body |
|---------|----------|------|
| POST | `/auth/register` | `{ name, email, password }` |
| POST | `/auth/login` | `{ email, password }` |

### Authentification (protégée - Bearer Token)
| Méthode | Endpoint |
|---------|----------|
| POST | `/auth/logout` |
| POST | `/auth/refresh` |
| GET | `/auth/me` |

### Artists (protégé)
| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/artists` | - |
| POST | `/artists` | `{ name, slug, bio, image }` |
| GET | `/artists/{id}` | - |
| PUT | `/artists/{id}` | `{ name, slug, bio, image }` |
| DELETE | `/artists/{id}` | - |

### Albums (protégé)
| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/albums` | - |
| POST | `/albums` | `{ title, slug, artist_id, release_year, cover_image }` |
| GET | `/albums/{id}` | - |
| PUT | `/albums/{id}` | `{ title, slug, release_year, cover_image }` |
| DELETE | `/albums/{id}` | - |

### Tracks (protégé)
| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/tracks` | - |
| POST | `/tracks` | `{ title, slug, artist_id, album_id, duration, file_path, genres }` |
| GET | `/tracks/{id}` | - |
| PUT | `/tracks/{id}` | `{ title, slug, duration, file_path, genres }` |
| DELETE | `/tracks/{id}` | - |

### Genres (protégé)
| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/genres` | - |
| POST | `/genres` | `{ name, slug, color }` |
| GET | `/genres/{id}` | - |
| PUT | `/genres/{id}` | `{ name, slug, color }` |
| DELETE | `/genres/{id}` | - |

### Playlists (protégé)
| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/playlists` | - |
| POST | `/playlists` | `{ title, description, cover_image, is_public }` |
| GET | `/playlists/{id}` | - |
| PUT | `/playlists/{id}` | `{ title, description, cover_image, is_public }` |
| DELETE | `/playlists/{id}` | - |
| POST | `/playlists/{id}/tracks/{trackId}` | - |
| DELETE | `/playlists/{id}/tracks/{trackId}` | - |

### Favorites (protégé)
| Méthode | Endpoint | Body |
|---------|----------|------|
| GET | `/favorites` | - |
| POST | `/favorites` | `{ track_id }` |
| DELETE | `/favorites/{track}` | - |

---

## Structure du projet frontend

```
src/
├── app/
│   ├── models/           # Interfaces TypeScript
│   │   ├── artist.ts
│   │   ├── album.ts
│   │   ├── track.ts
│   │   ├── genre.ts
│   │   ├── playlist.ts
│   │   └── user.ts
│   ├── services/         # Services API
│   │   ├── auth.service.ts
│   │   ├── artist.service.ts
│   │   ├── album.service.ts
│   │   ├── track.service.ts
│   │   ├── genre.service.ts
│   │   ├── playlist.service.ts
│   │   └── favorite.service.ts
│   ├── pages/            # Pages de l'application
│   │   ├── login/
│   │   ├── register/
│   │   ├── artists/
│   │   ├── albums/
│   │   ├── tracks/
│   │   ├── genres/
│   │   ├── playlists/
│   │   └── favorites/
│   ├── app.ts
│   ├── app.html
│   ├── app.css
│   ├── app.routes.ts
│   └── app.config.ts
├── index.html
├── main.ts
└── styles.css
```

---

## Étapes de création

### Étape 1 : Modèles TypeScript
Créer les interfaces pour typer les données API.

### Étape 2 : Services API
Créer les services Angular avec `HttpClient` pour chaque ressource.

### Étape 3 : Proxy Angular
Configurer `proxy.conf.json` pour rediriger `/api` vers `http://localhost:8000`.
- Http interceptor `auth.interceptor.ts` pour ajouter automatiquement le token JWT à chaque requête.

### Étape 4 : Authentification
Pages Login et Register avec gestion du token JWT.
- Login : formulaire email/mot de passe, redirige vers `/artists`
- Register : formulaire nom/email/mot de passe, redirige vers `/login`
- Les routes utilisent le lazy-loading (`loadComponent`)

### Étape 5 : Layout principal
- Sidebar avec navigation vers toutes les pages
- AuthGuard pour protéger les routes
- Bouton de déconnexion

### Étape 6 : Pages CRUD
- **Artists** : liste, création, édition, suppression
- **Albums** : liste avec sélection d'artiste, création, édition, suppression
- **Tracks** : liste, création avec sélection artiste/album/genres (checkboxes), édition, suppression
- **Genres** : liste avec affichage couleur, création, édition, suppression
- **Playlists** : liste + détail avec sélection et ajout/retrait de morceaux
- **Favorites** : liste des morceaux favoris avec suppression

Toutes les pages utilisent le lazy-loading (`loadComponent`).

## Lancement

```bash
# Frontend (port 4200)
cd project-zik-front
npm install
npx ng serve

# Backend (port 8000)
cd projet-zik
php artisan serve
```
