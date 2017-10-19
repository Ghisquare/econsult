import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Profession } from '../app/model/profession';

@Injectable()
export class ProfessionService {

  private professionsUrl = 'api/professions';  // URL to web api

  constructor(private http: Http) { }

  getProfessions(): Promise<Profession[]> {
    return this.http.get(this.professionsUrl)
      .toPromise()
      .then(response => response.json().data as Profession[])
      .catch(this.handleError);
  }

  getProfession(id: number): Promise<Profession> {
    const url = `${this.professionsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Profession)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - ProfessionService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
