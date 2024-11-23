import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería ser creado', () => {
    expect(authGuard).toBeTruthy();
  });

  it('debería permitir acceso para roles permitidos', () => {
    authService.getUserRole.and.returnValue('ROLE_ADMIN');
    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeTrue();
  });

  it('debería denegar acceso y redirigir al login si no hay rol', () => {
    authService.getUserRole.and.returnValue('');
    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/Login']);
  });

  it('debería denegar acceso y redirigir a inicio si el rol no está permitido', () => {
    authService.getUserRole.and.returnValue('ROLE_USER');
    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/Home']);
  });
});
