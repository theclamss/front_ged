import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Workflow} from "../models/workflows-data.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilesApiService {

  //TODO : envoyer l'id depuis le composant
  private apiUrl = `${environment.apiUrl}/users/files/:1/workflow`; // Remplacez par votre URL d'API
  private workflowFilesDataSubject = new BehaviorSubject<Workflow[]>([]);
  projectsData$ = this.workflowFilesDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchAndStoreTopProjects(): void {
    this.http.get<Workflow[]>(this.apiUrl).pipe(
      map(response => {
        // Traitez la réponse si nécessaire
        return response;
      })
    ).subscribe(
      data => this.workflowFilesDataSubject.next(data),
      error => console.error('Erreur lors de la récupération des projets :', error)
    );
  }

  fetchDataIfNeeded(): void {
    if (this.workflowFilesDataSubject.getValue().length === 0) {
      this.http.get<Workflow[]>(this.apiUrl).pipe(
        map(response => response)
      ).subscribe(
        data => this.workflowFilesDataSubject.next(data),
        error => console.error('Erreur lors de la récupération des projets :', error)
      );
    }
  }

  getTopProjects(): Observable<Workflow[]> {
    return this.projectsData$;
  }



}
