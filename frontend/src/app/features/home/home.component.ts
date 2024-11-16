import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../../shared/models/Producto';
import { ProductoService } from '../../core/service/producto/producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productosNuevos: Producto[] = [];
  productosAntiguos: Producto[] = [];
  
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (productos) => {
        this.productosNuevos = productos.filter(producto => producto.nuevo === 1);
        this.productosAntiguos = productos.filter(producto => producto.nuevo === 0);
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }
}
