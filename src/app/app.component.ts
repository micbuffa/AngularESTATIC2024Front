import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule,
    AssignmentsComponent, RouterLink, MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  titre="Application de gestion des devoirs à rendre !";

  constructor(private authService:AuthService, 
              private assignmentsService:AssignmentsService,
              private router:Router
  ) {}

  onLogin() {
    console.log("On va simuler un login...");
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }

  genereDonnesDeTest() {
    this.assignmentsService.peuplerBD();
  }
}
