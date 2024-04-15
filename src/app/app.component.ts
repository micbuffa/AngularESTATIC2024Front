import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AssignmentsComponent } from './assignments/assignments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule,
    AssignmentsComponent, RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  titre="Application de gestion des devoirs à rendre !";
}
