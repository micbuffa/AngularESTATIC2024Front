import {Component, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';

// Importation des directives custom
import { RenduDirective } from '../../shared/rendu.directive';
import { NonRenduDirective } from '../../shared/non-rendu.directive';

// angular material
import { MatListModule } from '@angular/material/list';

import { RouterLink } from '@angular/router';

import { Assignment } from '../assignment.model'

import { AssignmentsService } from '../../shared/assignments.service';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';

// Composant qui gère l'affichage d'une liste de devoirs (assignments)
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective, RouterLink,
    MatListModule, ScrollingModule
  ],
  templateUrl: './assignments-scrolling.component.html',
  styleUrl: './assignments-scrolling.component.css'
})
export class AssignmentsScrollingComponent {
  titre = "Liste des devoirs à faire :";
  
  assignments: Assignment[] = [];
  totalDocs =0;
  limit = 10;
  page = 1;
  totalPages = 0;
  pagingCounter = 0;
  hasPrevPage= false
  hasNextPage = false;
  prevPage = 0;
  nextPage = 0;

   // pour virtual scroll infini
   @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
   
  constructor(private assignmentsService: AssignmentsService,
              private ngZone: NgZone) { }

  ngOnInit() {
    console.log("AVANT AFFICHAGE, on demande au service les données !");

    this.getAssignments();
  }

  ngAfterViewInit() {
    console.log(' ----- after view init ----');

    if (!this.scroller) return;

    // on s'abonne à l'évènement scroll du virtual scroller
    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => {
          //console.log('scrolled : dans le tap du pipe!');
          //console.log("distance avant fin du viewport : " + 
            //this.scroller.measureScrollOffset('bottom'));
        }),
        map((event) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y1 > y2 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200),  
        tap(([y1, y2]) => {
          //console.log("y1 = " + y1 + " y2 = " + y2)
        })
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
        console.log('On demande de nouveaux assignments');
        // on va faire une requête pour demander les assignments suivants
        // et on va concatener le resultat au tableau des assignments courants
        console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);      
  
        if (!this.hasNextPage) return;

        this.ngZone.run(() => {
          // on augmente la page courante sauf si on 
          // est à la dernière page
          this.page = this.nextPage;
          // et on demande au back-end les données de la page suivante
          this.getAssignments()
          console.log("REQUETE ENVOYEE PAGE = " + this.page);
        })
      });
  }

  getAssignments() {
    // on va initialiser le tableau avec des données
    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        // on ajoute les assignments reçus au tableau
        this.assignments = this.assignments.concat(data.docs);

        //this.assignments = data.docs;
        // on initialise les propriétés en fonction des résultats reçus
        this.totalDocs = data.totalDocs;
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;

        console.log("Dans le subscribe, données reçues !")
      });
    console.log("APRES APPEL DU SERVICE !");
  }

  getColor(a: any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }

}
