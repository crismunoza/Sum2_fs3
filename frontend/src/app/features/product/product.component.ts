import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/service/producto/producto.service';
import { Producto } from '../../shared/models/Producto';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  guardarProducto(producto: Producto): void {
    if (!producto.nombre || !producto.descripcion || producto.precio <= 0 || producto.stock <= 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    if (producto.url) {
      const nombreArchivo = producto.url.split('/').pop();
      if (nombreArchivo) {
        producto.url = nombreArchivo;
      }
    } else {
      producto.url = '';
    }
  
    this.productoService.editProducto(producto).subscribe(
      (updatedProducto) => {
        Swal.fire({
          title: 'Actualizado',
          text: 'El producto ha sido actualizado',
          icon: 'success',
          timer: 2000, 
          showConfirmButton: false,  
        });
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
        Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
      }
    );
  }

  
  
  eliminarProducto(id: number): void {
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
        this.productoService.deleteProducto(id).subscribe(() => {
          Swal.fire({
            title: 'Eliminado',
            text: 'El producto ha sido eliminado',
            icon: 'success',
            timer: 2000,  
            showConfirmButton: false,  
          });
          this.obtenerProductos();  
        });
      }
    });
  }


}
