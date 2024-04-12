import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      nom:"Devoir Angular de Mr Buffa",
      dateDeRendu: new Date('2024-05-01'),
      rendu:false
    },
    {
      nom:"Devoir IOS de Mr Edouard",
      dateDeRendu: new Date('2024-04-02'),
      rendu:true
    },
    {
      nom:"Devoir Groovy de Mr Galliu",
      dateDeRendu: new Date('2024-02-12'),
      rendu:true
    }
  ];
 
  constructor() { }

  getAssignments():Observable<Assignment[]> {
    // On envoit une requête au back-end, qui lui-même
    // ira chercher les données dans la base de données
    // située dans le cloud

    return of(this.assignments);
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
}
