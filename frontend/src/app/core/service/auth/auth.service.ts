import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';  // Import para verificar si está en el navegador

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:8080/api/auth/login';
  private tokenKey = 'authToken';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  login(username: string, password: string): Observable<string> {
    return this.httpClient.post<string>(this.LOGIN_URL, { username, password }, { responseType: 'text' as 'json' }).pipe(
      tap((token: string) => {
        this.saveToken(token);  
        this.router.navigate(['/']);  
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(error);
      })
    );
  }

  private saveToken(token: string) {
    if (this.sessionAvailable()) {  
      sessionStorage.setItem(this.tokenKey, token); 
    }
  }

  getToken(): string | null {
    return this.sessionAvailable() ? sessionStorage.getItem(this.tokenKey) : null;  
  }

  logout() {
    if (this.sessionAvailable()) {  
      sessionStorage.removeItem(this.tokenKey); 
    }
    this.router.navigate(['/Login']); 
  }

  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));  
      return payload.role;  
    }
    return '';  
  }

  private sessionAvailable(): boolean {
    return isPlatformBrowser(this.platformId);  
  }
}
