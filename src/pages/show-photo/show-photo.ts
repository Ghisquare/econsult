import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {Image} from "../../app/model/image";


@Component({
  selector: 'show-photo',
  templateUrl: 'show-photo.html',
})
export class ShowPhotoPage  {

  imageFile: Image;

  constructor(params: NavParams, private viewCtrl: ViewController) {
    this.imageFile = params.get('imageFile');
    console.log('imageFile', this.imageFile);
  }

  close() {this.viewCtrl.dismiss()}

}
