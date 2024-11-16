import { Component,OnInit } from '@angular/core';
import { UserService } from '../../core/service/user/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent implements OnInit{

  username: string = '';
  password: string = '';
  email: string = '';
  nombre: string = '';
  apellido: string = '';
  rol: string = 'ROLE_USER';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
  }

  registerUsuario() {
    if (this.username.trim() === '' || this.nombre.trim() === '' || this.apellido.trim() === '' || this.password.trim() === '' || this.email.trim() === '') {
        Swal.fire('Validación', 'Por favor, completa todos los campos correctamente.', 'warning');
        return;
    }

    const usuario = {
        username: this.username,
        password: this.password,
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        rol: this.rol
    };

    this.userService.registerUsuario(usuario).subscribe(
        (data) => {
            Swal.fire('Usuario registrado', 'El usuario ha sido registrado correctamente', 'success');
            this.router.navigate(['/Login']);
        },
        (error) => {
            Swal.fire('Error', 'Ha ocurrido un error al registrar el usuario', 'error');
        }
    );
}



}
