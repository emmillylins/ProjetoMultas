import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
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
    router = TestBed.inject(Router);
  });

  it('should allow activation if authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(of(true));

    const result = authGuard.canActivate();
    if (result instanceof Observable) {
      result.subscribe(res => {
        expect(res).toBeTrue();
        done();
      });
    } else {
      expect(result).toBeTrue();
      done();
    }
  });

  it('should deny activation if not authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(of(false)); // Simula não autenticação

    const result = authGuard.canActivate();
    if (result instanceof Observable) {
      result.subscribe(res => {
        expect(res).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith(['']);
        done();
      });
    } else {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['']);
      done();
    }
  });
});
