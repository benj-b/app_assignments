import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment app';

  constructor (private authService: AuthService, private router: Router) {}

  showFiller = false;
  // login() {
  //   if (!this.authService.loggedIn) {
  //     this.authService.logIn();
  //   } 
  //   else {
  //     this.authService.logOut();
  //     // et on renvoie vers la home page
  //     this.router.navigate(['/home']);
  //   }
  // }
  logOut() {
    this.authService.logOut();
    alert('Vous avez été déconnecté avec succès !');
    // et on renvoie vers la home page
    this.router.navigate(['/home']);
  }

  isloggedIn() {
    return this.authService.loggedIn;
  }

  currentUser() {
    return this.authService.currentUser;
  }
}
