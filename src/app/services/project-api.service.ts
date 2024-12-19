import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsData } from '../models/products-data.model';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  //TODO : envoyer l'id depuis le composant
  private apiUrl = `${environment.apiUrl}/users/:1/projects`; // Remplacez par votre URL d'API
  private projectsDataSubject = new BehaviorSubject<ProductsData[]>([]);
  projectsData$ = this.projectsDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchAndStoreTopProjects(): void {
    this.http.get<ProductsData[]>(this.apiUrl).pipe(
      map(response => {
        // Traitez la réponse si nécessaire
        return response;
      })
    ).subscribe(
      data => this.projectsDataSubject.next(data),
      error => console.error('Erreur lors de la récupération des projets :', error)
    );
  }

  fetchDataIfNeeded(): void {
    if (this.projectsDataSubject.getValue().length === 0) {
      this.http.get<ProductsData[]>(this.apiUrl).pipe(
        map(response => response)
      ).subscribe(
        data => this.projectsDataSubject.next(data),
        error => console.error('Erreur lors de la récupération des projets :', error)
      );
    }
  }

  getTopProjects(): Observable<ProductsData[]> {
    return this.projectsData$;
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }



}
