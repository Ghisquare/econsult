import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Patient } from '../app/model/patient';

@Injectable()
export class PatientService {

  private patientsUrl = 'api/patients';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) { }

  getPatients(): Promise<Patient[]> {
    return this.http.get(this.patientsUrl)
      .toPromise()
      .then(response => response.json().data as Patient[])
      .catch(this.handleError);
  }

  getPatient(id: number): Promise<Patient> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Patient)
      .catch(this.handleError);
  }

  createPatient(patient: Patient): Promise<Patient>{
    return this.http.post(this.patientsUrl, JSON.stringify(patient), this.headers)
      .toPromise()
      .then(response => response.json().data as Patient)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - PatientService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
