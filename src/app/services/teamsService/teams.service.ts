import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Users } from '../../models/users-data.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private apiUrl = environment.apiUrl + '/users/non-admin';
  private cachedMembers: Users[] | null = null;

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<Users[]> {
    if (this.cachedMembers) {
      return of(this.cachedMembers);
    } else {
      return this.http.get<{ users: Users[] }>(this.apiUrl).pipe(
        map(response => response.users),
        tap(members => this.cachedMembers = members)
      );
    }
  }
}
