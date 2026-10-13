import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  private http = inject(HttpClient);
  private api = '/api';

  getAll(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.api}/artists`);
  }

  get(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.api}/artists/${id}`);
  }

  create(data: Partial<Artist>): Observable<Artist> {
    return this.http.post<Artist>(`${this.api}/artists`, data);
  }

  update(id: number, data: Partial<Artist>): Observable<Artist> {
    return this.http.put<Artist>(`${this.api}/artists/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/artists/${id}`);
  }
}
