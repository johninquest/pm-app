// auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PbAuthService } from '../utils/pocketbase/pb-auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(PbAuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        console.log('You are not yet authenticated!')
        router.navigate(['/auth']);
        return false;
      }
      return true;
    })
  );
};