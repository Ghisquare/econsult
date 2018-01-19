import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Message } from '../app/model/message';

@Injectable()
export class MessageService {

  private messagesUrl = 'http://localhost/app_dev.php/messages.json';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) { }

  getMessages(): Promise<Message[]> {
    return this.http.get(this.messagesUrl)
      .toPromise()
      .then(response => response.json() as Message[])
      .catch(this.handleError);
  }

  getMessagesByConsultationId(consultationId: number): Promise<Message[]> {
    const url = `${this.messagesUrl}?consultationId=${consultationId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Message[])
      .catch(this.handleError);
  }

  getMessage(id: number): Promise<Message> {
    const url = `${this.messagesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Message)
      .catch(this.handleError);
  }

  createMessage(message: Message): Promise<Message>{
    return this.http.post(this.messagesUrl, JSON.stringify(message), this.headers)
      .toPromise()
      .then(response => response.json() as Message)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - MessageService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
