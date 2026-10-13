import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private api = '/api';

  constructor() {
    const t = localStorage.getItem('token');
    if (t === 'undefined' || t === 'null') {
      localStorage.removeItem('token');
    }
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, { email, password }).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.api}/auth/logout`, {}).pipe(
      tap(() => this.clearToken())
    );
  }

  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/refresh`, {});
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.api}/auth/me`);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token !== 'undefined';
  }
}
