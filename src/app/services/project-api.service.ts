import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { productsData } from '../pages/dashboard/dashboard.component';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  //TODO : envoyer l'id depuis le composant
  private apiUrl = environment.apiUrl+"/:1/projects"; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  getTopProjects(): Observable<productsData[]> {
    return this.http.get<productsData[]>(this.apiUrl).pipe(
      map(response => {
        // Traitez la réponse si nécessaire (traitement metier si besoin)
        return response;
      })
    );
  }
}
