import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { roleGuard } from './role.guard';
import { LoginService } from './login.service'; // Adjust as per your service import

describe('RoleGuard', () => {
  let guard: roleGuard;
  let authService: LoginService;
  let router: Router;

  // Mock AuthService
  const authServiceMock: Partial<LoginService> = {
    isLoggedIn: () => true, // Modify based on your authentication logic
    getUserRole: () => 'admin' // Modify based on your authentication logic
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        roleGuard,
        { provide: LoginService, useValue: authServiceMock }
      ]
    });
    guard = TestBed.inject(roleGuard); // Use TestBed.inject to get RoleGuard instance
    authService = TestBed.inject(LoginService); // Inject AuthService mock
    router = TestBed.inject(Router); // Inject Router mock if needed
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation for admin role', () => {
    const routeSnapshot = {} as ActivatedRouteSnapshot; // Mock ActivatedRouteSnapshot
    const stateSnapshot = {} as RouterStateSnapshot; // Mock RouterStateSnapshot

    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'getUserRole').and.returnValue('admin');

    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(canActivate).toBeTrue();
  });

  it('should not allow activation for non-admin role', () => {
    const routeSnapshot = {} as ActivatedRouteSnapshot; // Mock ActivatedRouteSnapshot
    const stateSnapshot = {} as RouterStateSnapshot; // Mock RouterStateSnapshot

    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'getUserRole').and.returnValue('user'); // Assuming 'user' is not allowed

    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(canActivate).toBeFalse();
    // You can also check that router.navigate(['/login']) was called if needed
  });
});
