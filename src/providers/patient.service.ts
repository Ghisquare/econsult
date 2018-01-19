import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Patient } from '../app/model/patient';

@Injectable()
export class PatientService {

  private patientsUrl = 'http://localhost/app_dev.php/patients.json';  // URL to web api
  private head = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.head });

  constructor(private http: Http) { }

  getPatients(): Promise<Patient[]> {
    return this.http.get(this.patientsUrl, this.options)
      .toPromise()
      .then(response => response.json() as Patient[])
      .catch(this.handleError);
  }

  getPatient(id: number): Promise<Patient> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => response.json() as Patient)
      .catch(this.handleError);
  }

  createPatient(patient: Patient): Promise<Patient>{
    return this.http.post(this.patientsUrl, JSON.stringify(patient), this.options)
      .toPromise()
      .then(response => response.json() as Patient)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - PatientService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
