import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authServices/auth-service.service'; // Service utilisé pour récupérer le token

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupère le token depuis le AuthService
    const token = this.authService.getAccessToken();

    // Si un token est présent, ajoute l'Authorization header
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Format du token au standard Bearer
        },
      });
      return next.handle(authReq); // Passe la requête modifiée
    }

    // Si aucun token, passe la requête originale (pas modifiée)
    return next.handle(req);
  }
}
