import {Component, Input} from '@angular/core';


import {NavController} from "ionic-angular";

@Component({
  selector: 'my-navbar',
  templateUrl: 'my-navbar.html'
})
export class MyNavbar {
  @Input() titleText: string;
  @Input() isHome: boolean = false;

  constructor() {
  }
}
