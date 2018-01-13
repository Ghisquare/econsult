import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../app/model/user';

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost/app_dev.php/users.json';  // URL to web api
  private head = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.head });


  constructor(private http: Http) { }


  getUsers(): Promise<User[]> {
    console.log("UserService.getUsers");
    return this.http.get(this.usersUrl, this.head)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url, this.head)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  getUserByEmail(email: string): Promise<User> {
    const url = `${this.usersUrl}/?email=${email}`;
    return this.http.get(url, this.head)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }
  getUsersBySpecialty(specialtyId: number): Promise<User[]> {
    const url = `${this.usersUrl}/?specialtyId=${specialtyId}`;
    console.log(url);
    return this.http.get(url, this.head)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  createUser(user: User): Promise<User>{
    console.log("CreateUser.Url" + this.usersUrl);
    console.log("CreateUser " + user);
    console.log("CreateUser JSON " + JSON.stringify(user));

    return this.http.post(this.usersUrl, JSON.stringify(user), this.options)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  update(user: User): Promise<User>{
    const url = `${this.usersUrl}/${user.id}`;
    console.log("user Update" + JSON.stringify(user));
    return this.http
      .put(url, JSON.stringify(user), this.head)
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public getCivilities(): Array<any> {
    var civilities = new Array();
    civilities[0] = "M. ";
    civilities[1] = "Mme. ";
    civilities[2] = "Mlle. ";
    civilities[3] = "Dr. ";
    civilities[4] = "Pr. ";
    return civilities;
  }

  public getSelectCivilities(): Array<any> {
    //TO DO Bug Civility
    var civilities = new Array();
    civilities[0][0] = 0;
    civilities[0][1] = "M. ";
    civilities[1][0] = 1;
    civilities[1][1] = "Mme. ";
    civilities[2][0] = 2;
    civilities[2][1] = "Mlle. ";
    civilities[3][0] = 3;
    civilities[3][1] = "Dr. ";
    civilities[4][0] = 4;
    civilities[4][1] =  "Pr. ";
    console.log(civilities);
    return civilities;
  }

  public getCivility(index:number) {
    return this.getCivilities()[index];
  }

  public getShortName(user: User) {
    return this.getCivility(user.civility) + user.name;
  }

  public getVisibleStatus(): Array<any> {
    var status = new Array();
    status[0] = "Invisible";
    status[1] = "Professionnels uniquement";
    status[2] = "Patients & Professionel";

    return status;
  }

  public getVisibilityStatus(user: User) {
    return this.getVisibleStatus()[user.visible];
  }
}
