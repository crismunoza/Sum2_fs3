import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService  
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Obtener el rol del usuario desde el servicio
    const userRole = this.authService.getUserRole(); 

    console.log('Rol actual del usuario:', userRole);

    // Verificar si el rol del usuario es el adecuado
    if (!userRole) {
      // Si no tiene rol (es decir, no está logueado), redirigimos al login
      this.router.navigate(['/Login']);
      return false;
    }

    // Aquí defines los roles permitidos para la ruta, por ejemplo:
    const allowedRoles = ['ROLE_ADMIN'];  

    // Si el rol del usuario está en la lista de roles permitidos, se permite el acceso
    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      // Si el rol no coincide, redirigimos a la página de inicio
      this.router.navigate(['/Home']);
      return false;
    }
  }
}
