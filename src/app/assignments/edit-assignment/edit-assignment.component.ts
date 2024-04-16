import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})

export class EditAssignmentComponent {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // on récupère l'id dans l'URL
    const id = this.route.snapshot.params['id'];

    // on utilise le service pour récupérer l'assignment par id
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => {
      this.assignment = assignment;
      if (!this.assignment) return;

      this.nomAssignment = this.assignment.nom;
      this.dateDeRendu = this.assignment.dateDeRendu;
    });
  }
 
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        // navigation vers la home page, important que ce soit
        // dans le subscribe pour être sûr que la mise à jour
        // de l'assignment est terminée
       this.router.navigate(['/home']);
       console.log("ON NAVIGUE VERS HOME !")
      });
       
  }
 }
 