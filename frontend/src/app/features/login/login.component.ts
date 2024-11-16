import { Component} from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      Swal.fire('Error', 'Por favor, ingresa tu usuario y contraseña', 'error');
      return;
    }
  
    this.authService.login(this.username, this.password).subscribe(
      (token: string) => {
        console.log('Login exitoso', token);
        Swal.fire({
          title: 'Éxito',
          text: 'Inicio de sesión correcto',
          icon: 'success',
          timer: 2000,  
          showConfirmButton: false,  
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.error('Error en el login', error);
        const errorMsg = error.error || 'Usuario o contraseña incorrectos';
        Swal.fire({
          title: 'Error',
          text: errorMsg,
          icon: 'error',
          timer: 3000,  
          showConfirmButton: false,  
        });
      }
    );
  }
  

}
