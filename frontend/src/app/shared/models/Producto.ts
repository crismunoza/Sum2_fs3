export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    url: string;
    nuevo: number;
  
    constructor(data: any) {
      this.id = data.id;
      this.nombre = data.nombre;
      this.descripcion = data.descripcion;
      this.precio = data.precio;
      this.stock = data.stock;
      this.url = data.url;
      this.nuevo = data.nuevo;
    }
}
  