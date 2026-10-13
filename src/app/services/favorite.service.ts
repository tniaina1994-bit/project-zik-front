import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../models/track';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private http = inject(HttpClient);
  private api = '/api';

  getAll(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.api}/favorites`);
  }

  add(trackId: number): Observable<void> {
    return this.http.post<void>(`${this.api}/favorites`, { track_id: trackId });
  }

  remove(trackId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/favorites/${trackId}`);
  }
}
