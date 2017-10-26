import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {TabsPage} from "../tabs/tabs";
import {afficheDate} from "../../app/functions";
import {ConsultedPage} from "./consulted-page";

@Component({
  selector: 'page-consulted-list',
  templateUrl: 'consulted-list.html'
})
export class ConsultedListPage implements OnInit {
  selectedDemand: Consultation;
  demands: Consultation[];

  constructor(public navCtrl: NavController,
              private authService: AuthService, private consultationService: ConsultationService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  itemTapped(event, demand) {
    console.log("D"+demand.id);
    this.navCtrl.push(ConsultedPage, {'demand' : demand});
  }

  ngOnInit(): void {
    this.consultationService.getDemandsByContact(this.authService.getUserInfo(), 0).then(consultations => {
      this.demands = consultations;
    });
  }

  afficheDate(ts: number) {
    return afficheDate(ts);
  }
}
