import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

import { UserService } from './user.service';
import { user, Usuario } from '../../../shared/models/Usuario';  // Importa la interfaz user

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería recuperar usuarios', () => {
    const dummyUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    sessionStorage.setItem('authToken', 'test-token');

    service.getUsuarios().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/usuarios');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(dummyUsers);
  });

  it('debería eliminar un usuario', () => {
    const userId = 1;
    sessionStorage.setItem('authToken', 'test-token');

    service.deleteUsuario(userId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/usuarios/${userId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('debería registrar un usuario', () => {
    const newUser: user = { username: 'John', role: 'user' }; 

    service.registerUsuario(newUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/usuarios/register');
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('debería editar un usuario', () => {
    const updatedUsuario: Usuario = { 
        id: 1, 
        username: 'JohnDoe', 
        password: 'password123', 
        email: 'johndoe@example.com', 
        nombre: 'John', 
        apellido: 'Doe', 
        rol: 'user' 
    }; 

    sessionStorage.setItem('authToken', 'test-token');

    service.editUsuario(updatedUsuario).subscribe(response => {
        expect(response).toBeTruthy(); 
        expect(response).toEqual(updatedUsuario);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/usuarios/${updatedUsuario.id}`);
    expect(req.request.method).toBe('PUT'); 
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token'); 
    expect(req.request.body).toEqual(updatedUsuario); 

    req.flush(updatedUsuario); 
});


  it('debería recuperar un usuario por nombre de usuario', () => {
    const username = 'john';
    const dummyUser: user = { username: 'john', role: 'user' };  
    sessionStorage.setItem('authToken', 'test-token');

    service.obtenerUsuario(username).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/usuarios/${username}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(dummyUser);
  });
});
