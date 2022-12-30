import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ assignmentTransmis: Assignment = new Assignment;

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  onAssignmentRendu() {
    if (this.isloggedIn()) {
      this.assignmentTransmis.rendu = true;
      // this.assignmentTransmis = new Assignment();

      this.assignmentsService.updateAssignments(this.assignmentTransmis).subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });
    }
    else {
      this.router.navigate(['/login']);
      alert('Vous devez être connecté pour rendre un devoir');
    }
  }

  onDeleteAssignment() {
    // this.deleteAssignment.emit(assignment);
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        // this.assignmentTransmis = new Assignment();
        this.router.navigate(['/home']);
      })
  }

  getAssignment() {
    //on récupère l'id dans le snapshot passé par le router
    //le + force la conversion de l'id de type string en number
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onClickEdit() {
    console.log("edit");
    this.router.navigate(['/assignments', this.assignmentTransmis.id, 'edit'],
      { queryParams: { nom: this.assignmentTransmis.nom }, fragment: 'edition' });
  }

  isAdmin(): boolean {
    return this.authService.currentUser.role === 'admin';
  }

  isloggedIn(): boolean {
    return this.authService.loggedIn;
  }
}
