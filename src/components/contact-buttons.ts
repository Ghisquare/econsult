///<reference path="../app/functions.ts"/>
import { Component, Input } from '@angular/core';
import {User} from "../app/model/user";
import {CallNumber} from "@ionic-native/call-number";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'contact-buttons',
  templateUrl: 'contact-buttons.html'
})
export class ContactButtonsComponent {
  @Input() contact: User;
//  @Input() question: boolean = true;
//  @Input() response: boolean = false;

  constructor(private callNumber: CallNumber, private sanitizer: DomSanitizer) {
  }

  sanitizeSkype(){
    return this.sanitizer.bypassSecurityTrustUrl('skype:'+this.contact.skype+'?call');
  }

  launchTelCall(){
    this.callNumber.callNumber(this.contact.tel, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
