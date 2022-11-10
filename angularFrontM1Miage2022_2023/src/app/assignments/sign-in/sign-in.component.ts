import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  last_name: string = '';
  first_name: string = '';

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username == "" || this.password == "" || this.last_name == "" || this.first_name == "") {
      alert("Veuillez remplir tous les champs");
    }
    else {
      const newUser = {
        username: this.username,
        password: this.password,
        last_name: this.last_name,
        first_name: this.first_name
      }
      if (this.authservice.signIn(newUser))
        this.router.navigate(['/home']);
      else
        alert('Erreur lors de l\'inscription');
    }
  }

}
