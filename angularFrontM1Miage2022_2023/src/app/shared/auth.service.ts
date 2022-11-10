import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  currentUser = {
    "username" : "",
    "role" : "unlogged",
    "first_name" : "",
    "last_name" : ""
  }

  constructor() { }

  logIn(username:string, password:string) {
    var user =  this.users.find(x => x.username == username && x.password == password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = {
      "username" : "",
      "role" : "unlogged",
      "first_name" : "",
      "last_name" : ""
    }
  }

  // renvoie une prommesse qui, lorsque résolue, renvoie si l'utilisateur est admin ou non. Pour le moment, renvoie true si loggé.
  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.currentUser.role == "admin");
      }
    );
    return isUserAdmin;
  }

  signIn(newUser: { username: any; password: any; last_name: any; first_name: any; }) {
    var user =  this.users.find(x => x.username == newUser.username);
    if (user) {
      return false;
    }
    this.users.push({
      "username" : newUser.username,
      "password" : newUser.password,
      "last_name" : newUser.last_name,
      "first_name" : newUser.first_name,
      "role" : "user"
    });
    return true;
  }

  users = [
    {
      "username" : "admin",
      "password" : "admin",
      "last_name" : "",
      "first_name" : "admin",
      "role" : "admin"
    },
    {
      "username" : "user",
      "password" : "user",
      "last_name" : "",
      "first_name" : "user",
      "role" : "user"
    }
  ]
}
