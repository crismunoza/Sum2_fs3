import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  
import { user } from '../../../shared/models/Usuario';  

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpMock.verify();  
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar sesión con credenciales de administrador', () => {
    const adminUser: user = { username: 'admin', role: 'admin' };  

    service.login(adminUser.username, 'Admin123').subscribe(token => {
      expect(token).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush('fake-jwt-token');
  });
});
