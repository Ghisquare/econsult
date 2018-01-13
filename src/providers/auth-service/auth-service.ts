import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from "../../app/model/user";
import{UserService} from "../user.service"

@Injectable()
export class AuthService  {
  users: User[];
  currentUser: User;

  constructor(private userService: UserService) {
    console.log("AuthService.constructor");
    this.userService.getUsers().then(users => this.users = users);
  }

  public refreshUsers(){
    console.log("refreshUsers");
    this.userService.getUsers().then(users => this.users = users);
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let user = this.users.find(x => x.email ===  credentials.email &&  x.pwd === credentials.password);
        console.log(user);
        let access =(user !=null);
        this.currentUser = user;
        this.currentUser.shortName = this.userService.getShortName(this.currentUser);
//        let access = (credentials.password === this.users[0].pwd && credentials.email === this.users[0].email);
//        this.currentUser = this.users[0];
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
