import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  // On indique que ce composant a un attribut HTML "assignmentTransmis"
  @Input() assignmentTransmis!: Assignment;

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;
  }
}
