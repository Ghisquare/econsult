import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Specialty } from '../app/model/specialty';

@Injectable()
export class SpecialtyService {

  private specialtiesUrl = 'http://localhost/app_dev.php/specialties.json';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getSpecialties(): Promise<Specialty[]> {
    return this.http.get(this.specialtiesUrl, this.headers)
      .toPromise()
      .then(response =>
        response.json() as Specialty[]

      )
      .catch(this.handleError);
  }

  getSpecialty(id: number): Promise<Specialty> {
    const url = `${this.specialtiesUrl}/${id}`;
    return this.http.get(url, this.headers)
      .toPromise()
      .then(response => response.json() as Specialty)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - SpecialtyService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
