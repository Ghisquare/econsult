import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service/auth-service";
import {User} from "../../app/model/user";
import {ConsultPage} from "../consult/consult";
import {MyDemandsPage} from "../mydemands/mydemands";
import {LoginPage} from "../login/login";
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {MyResponsesPage} from "../myresponses/myresponses";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: User;
  demands: Consultation[];
  responses: Consultation[];
  demandCount: number;
  responseCount: number;


  constructor(public navCtrl: NavController, private authService: AuthService, private consultationService: ConsultationService) {
    this.currentUser = authService.getUserInfo();
    this.consultationService.getDemandsByContact(this.currentUser, 0).then(consultations => {this.demands = consultations; this.demandCount = consultations.length});
    this.consultationService.getResponsesByXchangeStatus(this.currentUser, 1).then(consultations => {this.responses = consultations; this.responseCount = consultations.length});
  }

  doConsult() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ConsultPage);
  }

  doMyDemands() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(MyDemandsPage);
  }

  doMyResponse() {
    this.navCtrl.push(MyResponsesPage);

  }

}
