import { Component, OnInit } from '@angular/core';
import { user, Usuario } from '../../shared/models/Usuario';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode'; 
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/service/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedInUser: user | null = null;
  usuario: Usuario = {
    id: 0,
    username: '',
    password: '',
    email: '',
    nombre: '',
    apellido: '',
    rol: ''
  };
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const username = decodedToken.sub;

        this.userService.obtenerUsuario(username).subscribe(
          (data) => {
            this.usuario = data; 
            console.log('Usuario:', this.usuario);
          },
          (error) => console.error('Error al obtener el perfil del usuario', error)
        );
      }
    }
  }

  guardarCambios(nuevoPerfilForm: any): void {
    // Verifica que el formulario es válido antes de proceder
    if (nuevoPerfilForm.valid) {
        this.userService.editUsuario(this.usuario).subscribe(
            (response) => {
                Swal.fire('Perfil actualizado', 'Los cambios se guardaron exitosamente', 'success');
            },
            (error) => {
                console.error('Error al actualizar el perfil', error);
                Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
            }
        );
    } else {
        Swal.fire('Error', 'Por favor completa todos los campos obligatorios', 'warning');
    }
  }

  eliminarUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsuario(id).subscribe(
          (response) => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
            this.router.navigate(['/Login']); 
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
            console.error('Error al eliminar el usuario', error);
          }
        );
      }
    });
  }
}
