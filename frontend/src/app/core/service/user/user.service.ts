import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/usuarios';  

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    const token = sessionStorage.getItem('authToken');  

    // Verificamos que el token esté disponible antes de crear los headers
    if (!token) {
      console.error('No token found');
      return new Observable<any[]>();  
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    console.log('Enviando el siguiente token:', token);
    console.log('Cabeceras de la solicitud:', headers.get('Authorization'));

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  deleteUsuario(id: number): Observable<any[]> {
    const token = sessionStorage.getItem('authToken');  
    if (!token) {
      console.error('No token found');
      return new Observable<any[]>();  
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Realizamos la solicitud DELETE
  return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  registerUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, usuario);
  }
  
  editUsuario(usuario: any): Observable<any> {
    const token = sessionStorage.getItem('authToken'); 
    if (!token) {
      console.error('No token found');
      return new Observable<any[]>();  
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/${usuario.id}`, usuario, { headers });
  }
  
  obtenerUsuario(username: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.http.get<any>(`${this.apiUrl}/${username}`, { headers });
  }
}
