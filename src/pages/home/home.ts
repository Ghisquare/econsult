import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, Platform} from 'ionic-angular';
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
import * as moment from 'moment';
import {AlertService} from "../../providers/alert.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  currentUser: User;
  demands: Consultation[];
  responses: Consultation[];
  demandCount: number;
  responseCount: number;
  responseText: string;
  refresher: any = null;


  constructor(public navCtrl: NavController, private authService: AuthService, private consultationService: ConsultationService,
               public platform: Platform, public alertService: AlertService) {
    this.currentUser = authService.getUserInfo();
  }

  public ngOnInit(){
    console.log(`Home.Init at ${moment().format('LTS')}`);

    this.consultationService.getDemandsByContact(this.currentUser, "0|2").then(consultations => {
      this.demands = consultations;
      this.demandCount = consultations.length;
      this.alertService.demandCount = this.demandCount;
      this.consultationService.getResponsesByAuthor(this.currentUser).then(consultations => {
        this.responses = consultations;
        this.responseCount = consultations.length;
        this.alertService.responseCount = this.responseCount;
        if(this.responseCount <= 1) this.responseText = "Réponse reçue"; else this.responseText = "Réponses reçues";
        if(this.refresher != null) {
          console.log("REFRESHER" + this.refresher);
          this.refresher.complete();
          this.refresher = null;
        }
      });
    });
  }

  doRefresh(event: any) {
    this.refresher = event;
    console.log("REFRESHER" + this.refresher);

    this.ngOnInit();
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
    console.log("doMyResponse" + this.responses.length  );
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
/* Automatic view refresh */
  ionViewDidEnter() {
    this.alertService.initRefresh(true);
  }

  ionViewDidLeave() {
    this.alertService.stopRefresh();
  }
}
