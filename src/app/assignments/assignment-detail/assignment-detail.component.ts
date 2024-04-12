import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  // On indique que ce composant a un attribut HTML "assignmentTransmis"
  @Input() assignmentTransmis: Assignment|undefined;
  @Output() deleteAssignment = new EventEmitter();

  constructor(private assignementsService:AssignmentsService) {}
  
  onAssignmentRendu() {
    if(!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // on demande au service de mettre à jour l'assignment
    this.assignementsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
    });
  }

  onDelete() {    
    // on emet au pere l'événement delete
    this.deleteAssignment.emit();
    // on veut cacher le detail de l'assignment qu'on vient de supprimer
    this.assignmentTransmis = undefined;
  }
}
