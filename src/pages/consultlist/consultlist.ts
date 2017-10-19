import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Consultation } from '../../app/model/consultation';
import { ConsultationService } from '../../providers/consultation.service';
import {AuthService} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-consult-list',
  templateUrl: 'consultlist.html'
})
export class ConsultListPage implements OnInit {
  selectedItem: any;
  consultations: Consultation[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private consultationService: ConsultationService, private authService: AuthService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ConsultListPage, {
      item: item
    });
  }

  ngOnInit(): void {
    this.consultationService.getConsultationsByAuthor(this.authService.getUserInfo()).then(consultations => this.consultations = consultations);
  }
}
