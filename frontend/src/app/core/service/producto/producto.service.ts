import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../../shared/models/Producto'; 

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8080/api/productos'; 

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  obtenerTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  deleteProducto(id: number): Observable<any[]> {
    const token = sessionStorage.getItem('authToken');  
    if (!token) {
      console.error('No token found');
      return new Observable<any[]>();  
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  editProducto(producto: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');  
    // Verificamos que el token esté disponible antes de crear los headers
    if (!token) {
      console.error('No token found');
      return new Observable<any[]>();  
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/${producto.id}`, producto, { headers });
  }
 
  //registrar productos 
  registrarProducto(productoFormData: FormData): Observable<any> {
    const token = sessionStorage.getItem('authToken');  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/upload`, productoFormData, { headers });
  }
  
  
}
