import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Consultation } from '../app/model/consultation';
import {User} from "../app/model/user";


@Injectable()
export class ConsultationService {

  private consultationsUrl = 'http://localhost/app_dev.php/consultations.json';  // URL to web api
  private head = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.head });

  constructor(private http: Http) { }

  getConsultations(): Promise<Consultation[]> {
    return this.http.get(this.consultationsUrl, this.head)
      .toPromise()
      .then(response => response.json().data as Consultation[])
      .catch(this.handleError);
  }

  getConsultation(id: number): Promise<Consultation> {
    const url = `${this.consultationsUrl}/${id}`;
    return this.http.get(url, this.head)
      .toPromise()
      .then(response => response.json().data as Consultation)
      .catch(this.handleError);
  }

  getDemandsByContact(contact: User, xchangeStatus): Promise<Consultation[]>{
    const url = `${this.consultationsUrl}/?contactId=${contact.id}&xchangeStatus=${xchangeStatus}`;
    console.log('getDemandsByContact - url:?? ' + url);
    return this.http.get(url, this.head)
      .toPromise()
      .then(response => response.json().data as Consultation[])
      .catch(this.handleError);

  }

  getConsultationsByAuthorStatus(author: User, status: number): Promise<Consultation[]>{
    const url = `${this.consultationsUrl}/?xchangeStatus=${status}&authorId=${author.id}`;
    console.log('getConsultationsByAuthor - url: ' + url);
    return this.http.get(url, this.head)
      .toPromise()
      .then(response => response.json().data as Consultation[])
      .catch(this.handleError);
  }
//A FAIRE FONCTION GLOBAL getConsultations (contact, status, author: boolean
  getResponsesByXchangeStatus(author: User, status): Promise<Consultation[]>{
    const url = `${this.consultationsUrl}/?xchangeStatus=${status}&authorId=${author.id}`;
    console.log('getResponsesByXchangeStatus - url: ' + url);
    return this.http.get(url, this.head)
      .toPromise()
      .then(response => response.json().data as Consultation[])
      .catch(this.handleError);
  }

  update(consultation: Consultation): Promise<Consultation>{
    const url = `${this.consultationsUrl}/${consultation.id}`;
    console.log("consultation.update" + JSON.stringify(consultation));
    return this.http
      .put(url, JSON.stringify(consultation), this.head)
      .toPromise()
      .then(() => consultation)
      .catch(this.handleError);
  }

  createConsultation(consultation: Consultation): Promise<Consultation>{
    return this.http.post(this.consultationsUrl, JSON.stringify(consultation), this.head)
      .toPromise()
      .then(response => response.json() as Consultation)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public getTimeUnits(): Array<any> {
    var units = new Array();
    units[0] = "jour(s)";
    units[1] = "mois";
    units[2] = "année(s)";
    return units;
  }

  public getTimeUnit(index:number) {
    return this.getTimeUnits()[index];
  }
}
