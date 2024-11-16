import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  
  usuarios: any[] = []; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        console.log('Usuarios:', this.usuarios);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
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
        this.userService.deleteUsuario(id).subscribe(() => {
          Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
          this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
        });
      }
    });
  }
  
  guardarUsuario(usuario: any): void {
    this.userService.editUsuario(usuario).subscribe(
      (updatedUsuario) => {
        usuario.editing = false;
        Swal.fire('Actualizado', 'El usuario ha sido actualizado', 'success');
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
      }
    );
  }
  cancelarEdicion(usuario: any): void {
    usuario.editing = false;
  }
}
