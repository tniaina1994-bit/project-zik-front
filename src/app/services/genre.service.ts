import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private http = inject(HttpClient);
  private api = '/api';

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.api}/genres`);
  }

  get(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.api}/genres/${id}`);
  }

  create(data: Partial<Genre>): Observable<Genre> {
    return this.http.post<Genre>(`${this.api}/genres`, data);
  }

  update(id: number, data: Partial<Genre>): Observable<Genre> {
    return this.http.put<Genre>(`${this.api}/genres/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/genres/${id}`);
  }
}
