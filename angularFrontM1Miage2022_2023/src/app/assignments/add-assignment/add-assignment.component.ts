import { Component, /*EventEmitter,*/ OnInit/*, Output*/ } from '@angular/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();

  matieres = [
    { value: 'sgbd', label: 'SGBD', img: "https://media.licdn.com/dms/image/C4E03AQHUszC0EvVQrQ/profile-displayphoto-shrink_200_200/0/1517725153393?e=1677715200&v=beta&t=nV9zu1DMr9r8kWAaam1liCpdYifVfHNoWTkjdp2jTVE" },
    { value: 'web', label: 'Technologies Web', img: "https://univ-cotedazur.fr/medias/photo/buffa-michel_1637692466949-jpg" },
    { value: 'prog_avancee', label: 'JAVA', img: "https://media.licdn.com/dms/image/C5603AQHTMw5QsIZnPQ/profile-displayphoto-shrink_200_200/0/1566297579006?e=1677715200&v=beta&t=FCp5fMMMkNJZLKvpSo_7rNjt2vvgc3QCsk8V01WUzUo" },
    { value: 'bigdata', label: 'Outils Maths pour le Big Data', img: "https://media.licdn.com/dms/image/C5603AQFW_bPJK7f-FA/profile-displayphoto-shrink_200_200/0/1652798679476?e=1677715200&v=beta&t=lbh-QasBRPQ96r8oFoUqpbwm9HsRPhnEjm0R87XVors" },
    { value: 'gestion_prog', label: 'Gestion de Projet', img: "https://media.licdn.com/dms/image/C5603AQER1Fa_tvUuiA/profile-displayphoto-shrink_200_200/0/1516265634380?e=1677715200&v=beta&t=0Gj90AJZjaWeU18ArccfUH6W8DhZCJAU43K95lG2CT8" },
  ];

  isLinear = true;
  FormGroup: FormGroup;

  constructor(private assignmentService: AssignmentsService, private router: Router, private fb: FormBuilder, private auth: AuthService, public snackBar: MatSnackBar) {
    this.FormGroup = this.fb.group({
      nom: '',
      dateRendu: '',
      matiere: ''
    });;
  }

  ngOnInit(): void {
  }

  nomDevoir: string = '';
  dateRendu: Date = new Date('0000-00-00');

  onSubmit() {
    // retrieve the values from the form and check if they are not empty, if they are then display an alert
    if (this.FormGroup.value.nom == '' ||
      this.FormGroup.value.dateRendu == null ||
      this.FormGroup.value.matiere == '') {
      alert('Veuillez remplir tous les champs');
      console.log(this.FormGroup.value);
    }

    else {
      // create a new assignment with the values from the form
      let newAssignment: Assignment = {
        id: Math.floor(Math.random() * 1000000000),
        nom: this.FormGroup.value.nom,
        dateDeRendu: this.FormGroup.value.dateRendu,
        rendu: false,
        auteur: this.auth.getUser(),
        matiere: this.matieres.find(matiere => matiere.value == this.FormGroup.value.matiere)?.label,
        image: this.matieres.find(matiere => matiere.value == this.FormGroup.value.matiere)?.img,
        mark: null,
        remarque: ''
      }
      // send the new assignment to the service
      this.assignmentService.addAssignments(newAssignment).subscribe(assignment => {
        // this.nouvelAssignment.emit(assignment);
        console.log(assignment)
        this.router.navigate(['/home']);
        // this.router.navigate(['/assignments/'+newAssignment.id]);
        this.snackBar.open("Assignement ajouté avec succès (id = " + newAssignment.id + ")", "Fermer", { duration: 2000 });
      });
    }
  }

  peuplerBDAvecForkJoin() {
    this.assignmentService.peuplerBDAvecForkJoin().subscribe(message => console.log(message));
  }
}


