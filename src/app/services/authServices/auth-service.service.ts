import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly validateAdminTokenUrl =environment.apiUrl+'/api/auth/admin/validate-token'; // URL backend

  constructor(private http: HttpClient) {}

  // Récupère le token stocké localement
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Vérifie auprès du backend si le token est valide
  isTokenAdminValid(): Observable<boolean> {
    const token = this.getAccessToken();

    //TODO : A enlever quand back end pret
    // Si on est en test avant creation back end ---> bypass le guard
    if (environment.testBeforeBack) {
      return new Observable<boolean>((observer) => {
        observer.next(true);
        observer.complete();
      });
    }

    // Si aucun token n'est présent, retournez `false` immédiatement
    if (!token) {
      return new Observable<boolean>((observer) => {
        observer.next(false);
        observer.complete();
      });
    }


    // Envoyer une requête HTTP au backend pour valider le token
    return this.http
      .post<{ valid: boolean }>(this.validateAdminTokenUrl, { token })
      .pipe(
        map((response) => response.valid), // Retourne vrai si le token est valide
        catchError(() => {
          return new Observable<boolean>((observer) => {
            observer.next(false);
            observer.complete();
          });
        })
      );
  }

  // Déconnexion : supprimer le token localement
  logout(): void {
    localStorage.removeItem('accessToken');
  }
}
