import { Component } from '@angular/core';
import { user } from '../../models/Usuario';
import { jwtDecode } from 'jwt-decode'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loggedInUser: user | null = null;


  ngOnInit() {
    this.checkLoginStatus();
  }

   checkLoginStatus() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('authToken');
  
      if (token) {
        try {
          // Decodificar el token
          const decodedToken: any = jwtDecode(token);
  
          // Asignar la información del usuario a loggedInUser
          this.loggedInUser = {
            username: decodedToken.sub,  
            role: decodedToken.role  
          };
          console.log(this.loggedInUser);
  
        } catch (error) {
          console.error('Error al decodificar el token', error);
        }
      } else {
        this.loggedInUser = null; 
      }
    }
  }

}
