import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Specialty } from '../app/model/specialty';

@Injectable()
export class SpecialtyService {

  private specialtiesUrl = 'api/specialties';  // URL to web api

  constructor(private http: Http) { }

  getSpecialties(): Promise<Specialty[]> {
    return this.http.get(this.specialtiesUrl)
      .toPromise()
      .then(response => response.json().data as Specialty[])
      .catch(this.handleError);
  }

  getSpecialty(id: number): Promise<Specialty> {
    const url = `${this.specialtiesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Specialty)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - SpecialtyService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
