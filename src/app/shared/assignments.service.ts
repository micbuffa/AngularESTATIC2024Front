import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private http:HttpClient) { }

  assignments:Assignment[] = [];
  //backendUrl = 'http://localhost:8010/api/assignments';
  backendUrl = 'https://angularestatic2024back.onrender.com/api/assignments';
 
  /**
   *  Renvoie tous les assignments 
   */
  getAssignments(page:number, limit:number):Observable<any> {
    // On envoit une requête au back-end, qui lui-même
    // ira chercher les données dans la base de données
    // située dans le cloud

    return this.http.get<any>(this.backendUrl+'?page='+page+'&limit='+limit);
  }

  /**
   * 
   * @param id => id de l'assignment à récupérer
   * @returns un assignment ou undefined si l'assignment n'est pas trouvé
   */
  getAssignment(id:string):Observable<Assignment|undefined> {
    // renvoie l'assignment avec l'id passé en paramètre
    //const a:Assignment|undefined = this.assignments.find(a => a.id === id);

    //return of(a);
    return this.http.get<Assignment>(this.backendUrl + '/' + id)
    .pipe(
      tap(a => console.log('Dans le TAP rxjs AVANT MAP ' + a.nom)),
      map(a => { a.nom += " MODIFIE PAR MAP"; return a;}),
      tap(a => console.log('Dans le TAP rxjs APRES MAP' + a.nom)),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      // a partir du moment où on a une erreur, on peut la gérer ici
      // ici je fais des console.log mais on pourrait faire un
      // router.navigate vers une page d'erreur par exemple
      // ou afficher un message d'erreur à l'utilisateur

      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    return this.http.post<Assignment>(this.backendUrl, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // on cherche l'assignment à modifier. Plus tard on enverra l'assignment
    // à un web service pour le modifier. Le web service fera un UPDATE dans la
    // base de données

    //let i = this.assignments.findIndex(a => a === assignment);
    //this.assignments[i] = assignment;

    return this.http.put<Assignment>(this.backendUrl, assignment);
  }

  deleteAssignment(assignment:Assignment|undefined):Observable<any> {
    // on cherche l'assignment à supprimer. Plus tard on enverra l'assignment
    // à un web service pour le supprimer. Le web service fera un DELETE dans la
    // base de données

    //if(!assignment) return of("Service : Assignment non trouvé !");

    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    return this.http.delete<any>(this.backendUrl + '/' + assignment?._id);
  }

  peuplerBDNaive() {
    bdInitialAssignments.forEach(a => {
      let newAssignment = new Assignment();
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;

      this.addAssignment(newAssignment).subscribe(() => {
        console.log("Assignment ajouté : " + a.nom);
      });
    });
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];
 
    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
 
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });
 
    // On attend que tous les appels soient terminés
    return forkJoin(appelsVersAddAssignment);
  }
 
 
}
