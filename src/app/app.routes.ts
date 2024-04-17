import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { AssignmentsScrollingComponent } from './assignments/assignments-scrolling/assignments-scrolling.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AssignmentsComponent },
    { path: 'scrolling', component: AssignmentsScrollingComponent },
    { path: 'add', component: AddAssignmentComponent },
    { path: 'assignments/:id', component: AssignmentDetailComponent},
    { path: 'assignments/:id/edit', component: EditAssignmentComponent,
      canActivate: [authGuard] // only allow access to this route if the user is authenticated
    },
    // in incorrect route redirect to home
    { path: '**', redirectTo: 'home' }
];
