import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/authServices/auth-service.service';




@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isTokenAdminValid().pipe(
      map((valid) => {
        if (valid) {
          return true; // Si le token est valide, autorisez l'accès
        }

        else {

          //TODO: gerer la reponse back end pour rediriger la connection que dans le cas d'un 401 forbidden

          //TODO : suprimmer le token quand on rederige vers la connection
          this.router.navigate(['/authentication/login']); // Sinon, redirigez vers la page login
          return false;
        }
      })
    );
  }
}
