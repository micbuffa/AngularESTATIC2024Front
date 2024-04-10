import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importation des directives custom
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

// Composant qui gère l'affichage d'une liste de devoirs (assignments)
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = "Liste des devoirs à faire :"

  assignments = [
    {
      nom:"Devoir Angular de Mr Buffa",
      dateDeRendu: '2024-05-01',
      rendu:false
    },
    {
      nom:"Devoir IOS de Mr Edouard",
      dateDeRendu: '2024-04-02',
      rendu:true
    },
    {
      nom:"Devoir Groovy de Mr Galliu",
      dateDeRendu: '2024-02-12',
      rendu:true
    }
  ];

  getColor(a:any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
