import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component'; 
import { RenduDirective } from './shared/rendu.directive'; 
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './assignments/login/login.component';
import { SignInComponent } from './assignments/sign-in/sign-in.component';

const routes : Routes = [
  //home page -- http://localhost:4200/
  {path : '', component:AssignmentsComponent},
  // http://localhost:4200/home
  {path : 'home', component:AssignmentsComponent},
  // http://localhost:4200/add
  {path : 'add', component:AddAssignmentComponent},
  {path : 'assignments/:id', component:AssignmentDetailComponent},
  {path : 'assignments/:id/edit', component:EditAssignmentComponent},
  // {path : 'assignments/:id/edit', component:EditAssignmentComponent}
  {path : 'login', component:LoginComponent},
  {path : 'signin', component:SignInComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule, MatNativeDateModule,
    MatListModule, 
    MatCardModule, MatCheckboxModule,
    MatToolbarModule, MatSidenavModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    HttpClientModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatStepperModule
  ],
  providers: [
    { provide: FormBuilder, useClass: FormBuilder }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
