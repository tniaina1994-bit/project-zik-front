import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private http = inject(HttpClient);
  private api = '/api';

  getAll(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.api}/albums`);
  }

  get(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.api}/albums/${id}`);
  }

  create(data: Partial<Album>): Observable<Album> {
    return this.http.post<Album>(`${this.api}/albums`, data);
  }

  update(id: number, data: Partial<Album>): Observable<Album> {
    return this.http.put<Album>(`${this.api}/albums/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/albums/${id}`);
  }
}
