import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  assignments: Assignment[] = [];

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  uri = "http://localhost:8010/api/assignments";

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
    // return of(this.assignments);
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.uri + "?page=" + page + "&limit=" + limit);
  }

  addAssignments(assignment: Assignment) {
    // this.assignments.push(assignment);
    // this.loggingService.log(assignment.nom, 'ajouté');
    // return of('Assignment Ajouté');

    return this.http.post<Assignment>(this.uri, assignment, this.HttpOptions);
  }

  updateAssignments(assignment: Assignment): Observable<any> {
    // ici envoyer une requete put a la database

    // en fait on a besoin de rien faire de spécial si on travaille avec
    // un tableau car le paramètre passé est UN ELEMENT DU TABLEAU
    // si on l'a modifié dans le composant details, on le modifie aussi dans le tableau

    // this.loggingService.log(assignment.nom, 'modifié');
    // return of('Assignment service : Assignment mis à jour !');

    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    // let pos = this.assignments.indexOf(assignment);
    // this.assignments.splice(pos, 1);

    // this.loggingService.log(assignment.nom, 'supprimé');
    // return of('Assignment service : Assignment supprimé !');
    let deleteURI = this.uri + '/' + assignment._id;
    return this.http.delete<string>(deleteURI);
  }

  //returns as an observable the assignment that matches  the id passed as parameter
  getAssignment(id: number): Observable<Assignment> {
    // return of(this.assignments.find(a => a.id === id)!);
    return this.http.get<Assignment>(this.uri + '/' + id)
      .pipe(tap(_ => {
          console.log("tap : assignment avec id = " + id + " requête GET envoyée sur MongoDB Cloud");
        }),
        catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
      );
  }

  private handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + 'a échoué ' + error.message);
      
      return of(result as T);
    }
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];
 
    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:any = new Assignment();
 
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
 
      appelsVersAddAssignment.push(this.addAssignments(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  resetBD() {
    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();
 
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      try {
        this.deleteAssignment(nouvelAssignment);
      }
      catch (e) {
        console.log(e);
      }
    });
  }
 
}
