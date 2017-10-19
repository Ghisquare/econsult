import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";


@Component({
  selector: 'show-photo',
  templateUrl: 'show-photo.html',
})
export class ShowPhotoPage  {

  imageFile: string;

  constructor(params: NavParams, private viewCtrl: ViewController) {
    this.imageFile = params.get('imageFile');
    console.log('imageFile', this.imageFile);
  }

  close() {this.viewCtrl.dismiss()}

}
