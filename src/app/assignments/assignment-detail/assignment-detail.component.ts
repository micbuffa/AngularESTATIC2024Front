import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule,
    RouterLink
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  // assignment récupéré depuis le service, qui sera affiché
  assignmentTransmis: Assignment|undefined;

  constructor(private assignementsService:AssignmentsService,
              private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    // appelée avant l'affichage du composant
    console.log("Dans composant Details, avant affichage");
    // on va récupérer l'id dans l'URL
    // le + est là pour convertir en nombre l'id pris dans l'URL,
    // qui est une chaine de caractères
    const id = this.route.snapshot.params['id'];

    // on utilise le service pour récupérer l'assignment avec cet id
    this.assignementsService.getAssignment(id)
    .subscribe(a => {
      this.assignmentTransmis = a;
    });

    // Juste pour voir, ici un exemple de récupération
    // de queries (ce qui suit le ? dans l'URL)
    // et de fragment (ce qui suit le # dans l'URL)
    console.log("Query Params : ");
    console.log(this.route.snapshot.queryParams);

    console.log("Fragment : ");
    console.log(this.route.snapshot.fragment);

    // pour tester, ajouter un ?debug=true#toto à la fin de l'URL par exemple
  }
  
  onAssignmentRendu() {
    if(!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // on demande au service de mettre à jour l'assignment
    this.assignementsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      // on navigue vers la page d'accueil, et on affiche la liste des assignments
      this.router.navigate(['/home']);
    });
  }

  onDelete() {    
    // on utilise le service pour supprimer l'assignment
    this.assignementsService.deleteAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      // on navigue vers la page d'accueil, et on affiche la liste des assignments
      this.router.navigate(['/home']);
       // on veut cacher le detail de l'assignment qu'on vient de supprimer
      this.assignmentTransmis = undefined;
    });
  }
  /* Exemple de navigation dynamique avec passage de query params et fragment
  onClickEdit() {
    // on navigue vers la page d'édition de l'assignment
    this.router.navigate(['/assignments', this.assignmentTransmis?.id, 'edit'],
      {
        queryParams: { nom: 'toto', debug:true },
        fragment: 'edition'
      }
    );
  }
  */
  isAdmin() {
    return this.authService.loggedIn;
  }
}
