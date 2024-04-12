import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importation des directives custom
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

// formulaires et champs de saisie...
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from './assignment.model';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';

// Composant qui gère l'affichage d'une liste de devoirs (assignments)
@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RenduDirective, NonRenduDirective, MatButtonModule,
    FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule,
    AssignmentDetailComponent
    
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent{
  titre = "Liste des devoirs à faire :";
  boutonActive = true;
  // pour le formulaire
  nomDevoir = '';
  dateDeRendu = null;
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

  onSubmit() {
     if(this.nomDevoir === '' || this.dateDeRendu === null) return;

    console.log("Bouton cliqué, on ajoute le devoir : " + this.nomDevoir + 
    " à rendre pour le " + this.dateDeRendu);

    // On crée un nouvel assignment avec les valeurs du formulaire
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    // On ajoute cet assignment au tableau des assignments
    this.assignments.push(nouvelAssignment);
  }

  assignmentClique(assignment:Assignment) {
    console.log("Assignment cliqué : " + assignment.nom);
    this.assignmentSelectionne = assignment
  }
}
