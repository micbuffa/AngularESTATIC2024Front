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

  ngOnInit() {
    console.log("AVANT AFFICHAGE");

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
    // on le rajoute au tableau
    this.assignments.push(a);
    // on cache le formulaire et on re-affiche la liste
    this.formVisible = false;
    }
}
