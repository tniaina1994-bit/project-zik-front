import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../models/track';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private http = inject(HttpClient);
  private api = '/api';

  getAll(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.api}/tracks`);
  }

  get(id: number): Observable<Track> {
    return this.http.get<Track>(`${this.api}/tracks/${id}`);
  }

  create(data: Partial<Track>): Observable<Track> {
    return this.http.post<Track>(`${this.api}/tracks`, data);
  }

  update(id: number, data: Partial<Track>): Observable<Track> {
    return this.http.put<Track>(`${this.api}/tracks/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/tracks/${id}`);
  }
}
