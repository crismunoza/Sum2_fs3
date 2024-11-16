import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { user } from '../../models/Usuario';
import { jwtDecode } from 'jwt-decode'; 
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {
  
  loggedInUser: user | null = null;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.checkLoginStatus();
    this.smoothScroll();
  }

  smoothScroll() {
    if (typeof window !== 'undefined' && window.document) {  
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => { 
          e.preventDefault();
          const targetElement = document.querySelector(anchor.getAttribute('href')!);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }
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
  
  logout():void{
    this.authService.logout();
  }
}