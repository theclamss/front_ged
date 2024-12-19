import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Roles } from '../../models/roles-data.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = environment.apiUrl + '/roles';
  private cachedRoles: Roles[] | null = null;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Roles[]> {
    if (this.cachedRoles) {
      return of(this.cachedRoles);
    } else {
      return this.http.get<{ roles: Roles[] }>(this.apiUrl).pipe(
        map(response => response.roles),
        tap(roles => this.cachedRoles = roles)
      );
    }
  }
}
