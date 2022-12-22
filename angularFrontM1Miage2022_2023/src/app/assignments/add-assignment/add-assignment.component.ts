import { Component, /*EventEmitter,*/ OnInit/*, Output*/ } from '@angular/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentService: AssignmentsService, private router: Router) { }

  ngOnInit(): void {
  }

  nomDevoir: string = '';
  dateRendu: Date = new Date('0000-00-00');

  onSubmit() {
    if (this.nomDevoir == "" || this.dateRendu == null) {
      alert("Veuillez remplir tous les champs");
    }
    else {
      const newAssignment = new Assignment();
      newAssignment.id = Math.floor(Math.random()*1000000000);
      newAssignment.nom = this.nomDevoir;
      newAssignment.dateDeRendu = this.dateRendu;
      newAssignment.rendu = false;

      // this.assignments.push(newAssignment);
      // this.nouvelAssignment.emit(newAssignment);
      this.assignmentService.addAssignments(newAssignment).subscribe(message => console.log(message));
      this.router.navigate(['/home']);
    }
  }

  peuplerBDAvecForkJoin() {
    this.assignmentService.peuplerBDAvecForkJoin().subscribe(message => console.log(message));
  }
}


