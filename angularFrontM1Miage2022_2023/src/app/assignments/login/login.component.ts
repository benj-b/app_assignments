import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = '';
  password:string = '';

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log
    console.log(this.username, this.password);
    if (this.authservice.logIn(this.username, this.password)) {
      this.router.navigate(['/home']);
    }
    else {
      alert('Erreur de login');
    }
  }
}
