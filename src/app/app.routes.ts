import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then(c => c.Login) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(c => c.Register) },
  {
    path: '',
    loadComponent: () => import('./pages/layout/layout').then(c => c.Layout),
    canActivate: [authGuard],
    children: [
      { path: 'artists', loadComponent: () => import('./pages/artists/artists').then(c => c.Artists) },
      { path: 'artists/:id', loadComponent: () => import('./pages/artists/artist-show').then(c => c.ArtistShow) },
      { path: 'albums', loadComponent: () => import('./pages/albums/albums').then(c => c.Albums) },
      { path: 'albums/:id', loadComponent: () => import('./pages/albums/album-show').then(c => c.AlbumShow) },
      { path: 'tracks', loadComponent: () => import('./pages/tracks/tracks').then(c => c.Tracks) },
      { path: 'tracks/:id', loadComponent: () => import('./pages/tracks/track-show').then(c => c.TrackShow) },
      { path: 'genres', loadComponent: () => import('./pages/genres/genres').then(c => c.Genres) },
      { path: 'genres/:id', loadComponent: () => import('./pages/genres/genre-show').then(c => c.GenreShow) },
      { path: 'playlists', loadComponent: () => import('./pages/playlists/playlists').then(c => c.Playlists) },
      { path: 'playlists/:id', loadComponent: () => import('./pages/playlists/playlist-show').then(c => c.PlaylistShow) },
      { path: 'favorites', loadComponent: () => import('./pages/favorites/favorites').then(c => c.Favorites) },
      { path: '', redirectTo: '/artists', pathMatch: 'full' },
    ],
  },
];
