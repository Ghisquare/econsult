import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Image } from '../app/model/image';

declare var cordova: any;

@Injectable()
export class ImageService {

  private imagesUrl = 'http://ecapi.guadeloupedeveloppement.net/images.json';  // URL to web api
  private head = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.head });

  constructor(private http: Http) { }

  getImages(): Promise<Image[]> {
    return this.http.get(this.imagesUrl)
      .toPromise()
      .then(response => response.json() as Image[])
      .catch(this.handleError);
  }

  getImage(id: number): Promise<Image> {
    const url = `${this.imagesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Image)
      .catch(this.handleError);
  }

  getImagesByConsultationId( consultationId: number): Promise<Image[]>{
  const url = `${this.imagesUrl}?consultationId=${consultationId}`;
  console.log("Images service by C Id");
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Image[])
      .catch(this.handleError);
  }

  update(image: Image): Promise<Image>{
    const url = `${this.imagesUrl}/${image.id}`;
    console.log("image.update" + JSON.stringify(image));
    return this.http
      .put(url, JSON.stringify(image), this.options)
      .toPromise()
      .then(() => image)
      .catch(this.handleError);
  }

  createImage(image: Image): Promise<Image>{
    return this.http.post(this.imagesUrl, JSON.stringify(image), this.options)
      .toPromise()
      .then(response => response.json() as Image)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      console.log(cordova.file.dataDirectory + img);
      return cordova.file.dataDirectory + img;
    }
  }

}
