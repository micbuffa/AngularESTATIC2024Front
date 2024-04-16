import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private http:HttpClient) { }

  assignments:Assignment[] = [];
  backendUrl = 'http://localhost:8010/api/assignments';
 
  /**
   *  Renvoie tous les assignments 
   */
  getAssignments():Observable<Assignment[]> {
    // On envoit une requête au back-end, qui lui-même
    // ira chercher les données dans la base de données
    // située dans le cloud

    return this.http.get<Assignment[]>(this.backendUrl);
  }

  /**
   * 
   * @param id => id de l'assignment à récupérer
   * @returns un assignment ou undefined si l'assignment n'est pas trouvé
   */
  getAssignment(id:number):Observable<Assignment|undefined> {
    // renvoie l'assignment avec l'id passé en paramètre
    //const a:Assignment|undefined = this.assignments.find(a => a.id === id);

    //return of(a);
    return this.http.get<Assignment>(this.backendUrl + '/' + id);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);
    return of("Service: Assignment ajouté !");
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // on cherche l'assignment à modifier. Plus tard on enverra l'assignment
    // à un web service pour le modifier. Le web service fera un UPDATE dans la
    // base de données

    //let i = this.assignments.findIndex(a => a === assignment);
    //this.assignments[i] = assignment;

    return of("Service : Assignment modifié !");
  }

  deleteAssignment(assignment:Assignment|undefined):Observable<string> {
    // on cherche l'assignment à supprimer. Plus tard on enverra l'assignment
    // à un web service pour le supprimer. Le web service fera un DELETE dans la
    // base de données

    if(!assignment) return of("Service : Assignment non trouvé !");

    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    return of("Service : Assignment supprimé !");
  }
}
