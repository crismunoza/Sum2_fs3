import { Component,OnInit } from '@angular/core';
import { ProductoService } from '../../core/service/producto/producto.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent  {
  imageName: string = ''; 
  imagePreview: string | ArrayBuffer | null = null; 
  producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    nuevo: 1
  };
  imagen: File | null = null;

  constructor(private productoService: ProductoService, private router: Router) {}

  // Método que se ejecuta cuando se selecciona un archivo
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageName = file.name; 
      this.imagen = file; 
      const reader = new FileReader();
      
      // Leer el archivo y mostrar la vista previa
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  // Método para enviar el formulario con el producto y la imagen
  crearProducto(): void {
    // Validaciones de los campos
    if (!this.producto.nombre.trim() || !this.producto.descripcion.trim()) {
      Swal.fire('Error', 'El nombre y la descripción son obligatorios.', 'error');
      return;
    }

    if (this.producto.precio <= 0) {
      Swal.fire('Error', 'El precio debe ser mayor a cero.', 'error');
      return;
    }

    if (this.producto.stock <= 0) {
      Swal.fire('Error', 'El stock debe ser mayor a cero.', 'error');
      return;
    }

    if (!this.imagen) {
      Swal.fire('Error', 'Debes seleccionar una imagen para el producto.', 'error');
      return;
    }
    

    const productoFormData = new FormData();
    productoFormData.append('nombre', this.producto.nombre);
    productoFormData.append('descripcion', this.producto.descripcion);
    productoFormData.append('precio', this.producto.precio.toString());
    productoFormData.append('stock', this.producto.stock.toString());
    productoFormData.append('nuevo', this.producto.nuevo.toString());
    productoFormData.append('imagen', this.imagen, this.imagen.name);

    this.productoService.registrarProducto(productoFormData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito',
          text: 'El producto se ha creado correctamente.',
          icon: 'success',
          timer: 2000,  
          showConfirmButton: false,
        });
        this.router.navigate(['/productos']);
      },
      (error) => {
        Swal.fire('Error', 'Hubo un error al crear el producto.', 'error');
      }
    );
  }


}