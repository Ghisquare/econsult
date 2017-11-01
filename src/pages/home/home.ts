import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service/auth-service";
import {User} from "../../app/model/user";
import {ConsultPage} from "../consult/consult";
import {ConsultedListPage} from "../consulted/consulted-list";
import {LoginPage} from "../login/login";
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {MyResponsesPage} from "../myresponses/myresponses";
import {ConsultedPage} from "../consulted/consulted-page";
import {ResponsePage} from "../myresponses/response";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: User;
  demands: Consultation[];
  reponsesInfoComp: Consultation[];
  responses: Consultation[];
  demandCount: number;
  responseCount: number;
  responseInfoCount: number;


  constructor(public navCtrl: NavController, private authService: AuthService, private consultationService: ConsultationService) {
    this.currentUser = authService.getUserInfo();
    this.consultationService.getDemandsByContact(this.currentUser, "0|2").then(consultations => {this.demands = consultations; this.demandCount = consultations.length});
    //this.consultationService.getDemandsByContact(this.currentUser, 1).then(consultations => {this.reponsesInfoComp = consultations; this.responseInfoCount = consultations.length});
    this.consultationService.getResponsesByXchangeStatus(this.currentUser, "1|3").then(consultations => {this.responses = consultations; this.responseCount = consultations.length});
  }

  doConsult() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ConsultPage);
  }

  doMyDemands() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    if(this.demands.length == 1) {
      this.navCtrl.push(ConsultedPage, {'demand' : this.demands[0]});
    } else {
      this.navCtrl.push(ConsultedListPage);
    }
  }

  doMyResponse() {
    console.log("doMyResponse" + this.responses.length  )
    if(this.responses.length == 1) {
      this.navCtrl.push(ResponsePage, {'response' : this.responses[0]});
    } else {
      this.navCtrl.push(MyResponsesPage);
    }
  }

  doMyResponseInfoComp() {
    console.log("doMyResponse" + this.responses.length  )
    if(this.responses.length == 1) {
      this.navCtrl.push(ResponsePage, {'response' : this.responses[0]});
    } else {
      this.navCtrl.push(MyResponsesPage);
    }
  }

}
