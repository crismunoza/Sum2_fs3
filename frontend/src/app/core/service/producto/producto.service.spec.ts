import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { Producto } from '../../../shared/models/Producto';

import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería recuperar todos los productos', () => {
    const dummyProductos: Producto[] = [
      { id: 1, nombre: 'Producto 1', precio: 100, descripcion: 'Descripción 1', stock: 10, url: 'http://example.com/1', nuevo: 1 },
      { id: 2, nombre: 'Producto 2', precio: 200, descripcion: 'Descripción 2', stock: 20, url: 'http://example.com/2', nuevo: 0 }
    ];

    service.obtenerTodosLosProductos().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyProductos);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('debería eliminar un producto', () => {
    const id = 1;
    const token = 'test-token';
    sessionStorage.setItem('authToken', token);

    service.deleteProducto(id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({});
  });

  it('debería editar un producto', () => {
    const producto = { id: 1, nombre: 'Producto Editado', precio: 150, descripcion: 'Descripción Editada', stock: 15, url: 'http://example.com/editado', nuevo: 1 };
    const token = 'test-token';
    sessionStorage.setItem('authToken', token);

    service.editProducto(producto).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${producto.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({});
  });

  it('debería registrar un producto', () => {
    const formData = new FormData();
    formData.append('nombre', 'Nuevo Producto');
    const token = 'test-token';
    sessionStorage.setItem('authToken', token);

    service.registrarProducto(formData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/upload`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({});
  });
});
