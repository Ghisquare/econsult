import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../app/model/user';

@Injectable()
export class UserService {

  private usersUrl = 'api/users';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  getUserByEmail(email: string): Promise<User> {
    const url = `${this.usersUrl}/?email=${email}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }
  getUsersBySpecialty(specialty_id: number): Promise<User[]> {
    const url = `${this.usersUrl}/?specialty_id=${specialty_id}`;
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  createUser(user: User): Promise<User>{
    console.log("CreateUser");
    return this.http.post(this.usersUrl, JSON.stringify(user), this.headers)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  update(user: User): Promise<User>{
    const url = `${this.usersUrl}/${user.id}`;
    console.log("user Update" + JSON.stringify(user));
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
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

  public getCivility(index:number) {
    return this.getCivilities()[index];
  }

  public getShortName(user: User) {
    return this.getCivility(user.civility) + user.name;
  }

}
