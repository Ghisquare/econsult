import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Consultation } from '../app/model/consultation';
import {User} from "../app/model/user";


@Injectable()
export class ConsultationService {

  private urlSfx = ".json";
  private consultationsUrl = 'http://ecapi.guadeloupedeveloppement.net/consultations';  // URL to web api
  private head = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.head });

  constructor(private http: Http) { }

  getConsultations(): Promise<Consultation[]> {
    return this.http.get(this.consultationsUrl + this.urlSfx, this.options)
      .toPromise()
      .then(response => response.json() as Consultation[])
      .catch(this.handleError);
  }

  getConsultation(id: number): Promise<Consultation> {
    const url = `${this.consultationsUrl}/${id}${this.urlSfx}`;
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => this.afterGet(response.json() as Consultation))
      .catch(this.handleError);
  }

  getDemandsByContact(contact: User, xchangeStatus): Promise<Consultation[]>{
    const url = `${this.consultationsUrl}${this.urlSfx}?contact=${contact.id}&isResponse=false&xchangeStatus%5Blt%5D=4`;
    console.log('getDemandsByContact - url:?? ' + url);
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => response.json() as Consultation[])
      .catch(this.handleError);

  }


  getConsultationsByAuthorStatus(author: User, status: number): Promise<Consultation[]>{
    const url = `${this.consultationsUrl}${this.urlSfx}?xchangeStatus=${status}&author=${author.id}`;
    console.log('getConsultationsByAuthor - url: ' + url);
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => response.json() as Consultation[])
      .catch(this.handleError);
  }
//A FAIRE FONCTION GLOBAL getConsultations (contact, status, author: boolean
  getResponsesByXchangeStatus(author: User, status): Promise<Consultation[]>{
    const url = `${this.consultationsUrl}${this.urlSfx}?xchangeStatus=${status}&author=${author.id}`;
    console.log('getResponsesByXchangeStatus - url: ' + url);
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => response.json() as Consultation[])
      .catch(this.handleError);
  }

  getResponsesByAuthor(author: User): Promise<Consultation[]>{
    const url = `${this.consultationsUrl}${this.urlSfx}?isResponse=true&author=${author.id}`;
    console.log('getResponsesByAuthor - url: ' + url);
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => response.json() as Consultation[])
      .catch(this.handleError);
  }


  update(consultation: Consultation): Promise<Consultation>{
    consultation = this.beforeSave(consultation);
    const url = `${this.consultationsUrl}/${consultation.id}${this.urlSfx}`;
    console.log("consultation.update" + JSON.stringify(consultation));
    return this.http
      .put(url, JSON.stringify(consultation), this.options)
      .toPromise()
      .then(response => this.afterGet(response.json() as Consultation))
      .catch(this.handleError);
  }

  createConsultation(consultation: Consultation): Promise<Consultation>{
    consultation = this.beforeSave(consultation);
    console.log("consultation.create " + JSON.stringify(consultation));

    return this.http.post(this.consultationsUrl+this.urlSfx, JSON.stringify(consultation), this.options)
      .toPromise()
      .then(response => this.afterGet(response.json() as Consultation))
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
//traitement bigint enregistré en string ds Bdd
  private beforeSave(consultation: Consultation): Consultation {
    console.log("BeforSaveConsultation");
    if(consultation.dateCreation) consultation.dateCreation = "" + consultation.dateCreation;
    if(consultation.dateModified) consultation.dateModified = "" + consultation.dateModified;
    if(consultation.dateClose) consultation.dateClose = "" + consultation.dateClose;
    if(consultation.dateResponse) consultation.dateResponse = "" + consultation.dateResponse;

    return consultation;

  }

  private afterGet(consultation: Consultation): Consultation {

    if(consultation.dateCreation) consultation.dateCreation = consultation.dateCreation * 1;
    if(consultation.dateModified) consultation.dateModified =  consultation.dateModified * 1;
    if(consultation.dateClose) consultation.dateClose = consultation.dateClose * 1;
    if(consultation.dateResponse) consultation.dateResponse =  consultation.dateResponse * 1;


    return consultation;

  }

}
