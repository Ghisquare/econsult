import { Component, OnInit, Input } from '@angular/core';

import { User } from '../app/model/user';
import { UserService } from '../providers/user.service';
import {Specialty} from "../app/model/specialty";

@Component({
  selector: 'contact-select',
  templateUrl: 'contact-select.html'
})
export class ContactSelectComponent implements OnInit {
  @Input() specialty: Specialty;
  contacts: User[];

  constructor(private userService: UserService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

 /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ConsultListPage, {
      item: item
    });
  }
*/
  ngOnInit(): void {
    this.userService.getUsersBySpecialty(this.specialty.id).then(users => this.contacts = users);
    console.log("c-select.OnInit" + this.specialty.id);
  }
}
