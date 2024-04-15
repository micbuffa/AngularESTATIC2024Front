import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importation des directives custom
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

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
    MatListModule, MatButtonModule, RouterLink,
    AssignmentDetailComponent, AddAssignmentComponent
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = "Liste des devoirs à faire :";
  
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
  }

  getColor(a:any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
