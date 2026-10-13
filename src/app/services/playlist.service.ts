import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private http = inject(HttpClient);
  private api = '/api';

  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.api}/playlists`);
  }

  get(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.api}/playlists/${id}`);
  }

  create(data: Partial<Playlist>): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.api}/playlists`, data);
  }

  update(id: number, data: Partial<Playlist>): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.api}/playlists/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/playlists/${id}`);
  }

  addTrack(playlistId: number, trackId: number): Observable<void> {
    return this.http.post<void>(`${this.api}/playlists/${playlistId}/tracks/${trackId}`, {});
  }

  removeTrack(playlistId: number, trackId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/playlists/${playlistId}/tracks/${trackId}`);
  }
}
