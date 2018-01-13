import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Profession } from '../app/model/profession';

@Injectable()
export class ProfessionService {

  private professionsUrl = 'http://localhost/app_dev.php/professions.json';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) { }

  getProfessions(): Promise<Profession[]> {
    return this.http.get(this.professionsUrl, this.headers)
      .toPromise()
      .then(response => response.json() as Profession[])
      .catch(this.handleError);
  }

  getProfession(id: number): Promise<Profession> {
    const url = `${this.professionsUrl}/${id}`;
    return this.http.get(url, this.headers)
      .toPromise()
      .then(response => response.json() as Profession)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - ProfessionService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
