import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignments.model';
import { AuthService } from '../shared/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  page: number=1;
  limit: number=10;
  totalDocs: number=-1;
  totalPages: number=-1;
  hasPrevPage: boolean=false;
  prevPage: number=-1;
  hasNextPage: boolean=false;
  nextPage: number=-1;
  
  titre = "Mon application sur les assignments !"
  formVisible = false;
  assignmentSelect:Assignment = new Assignment;
  assignments:Assignment[] = [];

  sortedData: Assignment[] = this.assignments;


  constructor(private assignmentService:AssignmentsService, private authservice:AuthService, private router: Router) {
    this.sortedData = this.assignments.slice();
  }

  ngOnInit(): void {
    // this.assignments = this.assignmentService.getAssignments();
    // this.getAssignments();

    this.assignmentService.getAssignmentsPagine(this.page, this.limit)
     .subscribe(data => {
       this.assignments = data.docs;
       this.page = data.page;
       this.limit = data.limit;
       this.totalDocs = data.totalDocs;
       this.totalPages = data.totalPages;
       this.hasPrevPage = data.hasPrevPage;
       this.prevPage = data.prevPage;
       this.hasNextPage = data.hasNextPage;
       this.nextPage = data.nextPage;
       console.log("données reçues");
     });

  }

  getAssignments(){
    this.assignmentService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);
  }

  // onAddAssignmentBtnClick(){
  //   this.formVisible = true;
  // }

  assignmentClick(assignment:Assignment){
    console.log(assignment);
    // this.assignmentSelect = assignment;
    this.router.navigate(['/assignments/', assignment.id]);
  }

  // onNouvelAssignment(newAssignment:Assignment){
  //   // this.assignments.push(newAssignment);
  //   this.assignmentService.addAssignments(newAssignment)
  //   .subscribe(message => console.log(message));

  //   this.formVisible = false;
  // }

  isloggedIn(){
    return this.authservice.loggedIn;
  }

  handlePage(event:PageEvent){
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.ngOnInit();
  }

  displayedColumns: string[] = ['id', 'name', "matiere", 'Date', 'Rendu' ];

  sortData(sort: Sort) {
    const data = this.assignments.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.nom, b.nom, isAsc);
        case 'ID':
          return compare(a.id, b.id, isAsc);
        case 'Date':
          return compare(a.dateDeRendu, b.dateDeRendu, isAsc);
        case 'Rendu':
          return compare(a.rendu, b.rendu, isAsc);
        default:
          return 0;
      }
    });
  }
  
  // Function that sort the table by rendu or not rendu
  onChange(event: any): void {
    //log
    console.log(event.value);
    if (event.value === 'rendu') {
      this.sortedData = this.assignments.filter((assignment) => assignment.rendu === true);
    } else if (event.value === 'nonrendu') {
      this.sortedData = this.assignments.filter((assignment) => assignment.rendu === false);
    } else if (event.value === 'all'){
      this.sortedData = this.assignments;
    }
  }
}

function compare(a: number | string | Date | boolean, b: number | string | Date | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

