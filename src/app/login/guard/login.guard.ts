import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if(localStorage.getItem('isLoggedIn') === 'true') {
    return true;
  }

  // Redirect to login page
  router.navigate(['login']);
  return false;
};
