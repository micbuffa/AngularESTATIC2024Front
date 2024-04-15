import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // on injecte le service AuthService et le router
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);

  //authService.logIn();

  // on va autoriser l'accès à la route si l'utilisateur est admin
  // pour le moment, on considère qu'un utilisateur est admin
  // s'il est simplement loggué

  return authService.isAdmin()
    .then(admin => {
        if (admin) {
          console.log("GUARD: Navigation autorisée");
          return true;
        } else {
          console.log("GUARD: Navigation NON autorisée");
          router.navigate(['/home']);
          return false;
        }
      }
    );
};
