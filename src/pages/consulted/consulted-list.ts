import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {afficheDate} from "../../app/functions";
import {ConsultedPage} from "./consulted-page";
import {AlertService} from "../../providers/alert.service";

@Component({
  selector: 'page-consulted-list',
  templateUrl: 'consulted-list.html'
})
export class ConsultedListPage implements OnInit {
  selectedDemand: Consultation;
  demands: Consultation[];

  constructor(public navCtrl: NavController,
              private authService: AuthService, private consultationService: ConsultationService, private alertService: AlertService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  itemTapped(event, demand) {
    console.log("D"+demand.id);
    this.navCtrl.push(ConsultedPage, {'demand' : demand});
  }

  ngOnInit(): void {
    this.consultationService.getDemandsByContact(this.authService.getUserInfo(), "0|2").then(consultations => {
      this.demands = consultations;
    });
  }

  afficheDate(ts: number) {
    return afficheDate(ts);
  }


  ionViewDidEnter() {
    this.alertService.initRefresh();
  }

  ionViewDidLeave() {
    this.alertService.stopRefresh();
  }

}
