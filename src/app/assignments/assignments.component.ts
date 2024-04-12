import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importation des directives custom
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


import { Assignment } from './assignment.model';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { AssignmentsService } from '../shared/assignments.service';

// Composant qui gère l'affichage d'une liste de devoirs (assignments)
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective,
    MatListModule, MatButtonModule,
    AssignmentDetailComponent, AddAssignmentComponent
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent{
  titre = "Liste des devoirs à faire :";
  boutonActive = true;
  formVisible = false;
  
  // assignment dont on veut le détail
  assignmentSelectionne!:Assignment;

  assignments:Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService ) {}

  ngOnInit() {
    console.log("AVANT AFFICHAGE, on demande au service les données !");

    // on va initialiser le tableau avec des données
    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      this.assignments = assignments;
      console.log("Dans le subscribe, données reçues !")
    });
    console.log("APRES APPEL DU SERVICE !");

    /*
    setTimeout(() => {
      this.boutonActive = true;
    }, 3000);
    */
  }

  getColor(a:any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }

  
  assignmentClique(assignment:Assignment) {
    console.log("Assignment cliqué : " + assignment.nom);
    this.assignmentSelectionne = assignment
  }

  onAddAssignmentBtnClick() {
    console.log("Bouton cliqué pour ajouter un devoir");
    this.formVisible = true;
  }

  onAddAssignment(a:Assignment) {
    // appelée quand le fils a émis l'événement "nouvelAssignment"
    console.log("Nouvel assignment reçu : " + a.nom);
    // on demande au service de l'ajouter
    this.assignmentsService.addAssignment(a)
    .subscribe(message => {
      console.log(message);
    });
    
    // on cache le formulaire et on re-affiche la liste
    this.formVisible = false;
    }

    onDeleteAssignment() {
      // on supprime l'assignement dont on regardait le détail (c'est
      // celui qui est sélectionné)

      // regarde d'abord sa position dans le tableau
      let pos = this.assignments.indexOf(this.assignmentSelectionne);
      // puis on le supprime
      this.assignments.splice(pos, 1);
    }
}
