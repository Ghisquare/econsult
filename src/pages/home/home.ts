import { Component } from '@angular/core';
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
import {SmartAudio} from "../../providers/smart-audio";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: User;
  demands: Consultation[];
  responses: Consultation[];
  oldDemandCount: number;
  demandCount: number;
  oldResponseCount: number;
  responseCount: number;
  responseText: string;
  private timeoutId: number;


  constructor(public navCtrl: NavController, private authService: AuthService, private consultationService: ConsultationService,
              private alertCtrl: AlertController, public platform: Platform, public smartAudio: SmartAudio) {
    this.currentUser = authService.getUserInfo();
    this.doRefresh(0);
  }

  public doRefresh(refresher){
    console.log(`Refresh at ${moment().format('LTS')}`);
    this.oldDemandCount = this.demandCount;
    this.oldResponseCount = this.responseCount;

    this.consultationService.getDemandsByContact(this.currentUser, "0|2").then(consultations => {
      this.demands = consultations; this.demandCount = consultations.length;
      this.consultationService.getResponsesByAuthor(this.currentUser).then(consultations => {
        this.responses = consultations;
        this.responseCount = consultations.length;
        if(this.responseCount <= 1) this.responseText = "Réponse reçue"; else this.responseText = "Réponses reçues";
        if(refresher != 0)
          refresher.complete();

        if(this.demandCount > this.oldDemandCount) {
          console.log("New Demand");

          let alert = this.alertCtrl.create({
            title: 'Nouvelle demande',
            subTitle: 'Vous avez une nouvelle demande de consultation',
            cssClass: 'myAlert',

            buttons: ['Ok']
          });
          alert.present();
          this.smartAudio.play('notification');
        }
        if(this.responseCount > this.oldResponseCount) {
          console.log("New Response");

          let alert = this.alertCtrl.create({
            title: 'Nouvelle réponse',
            subTitle: 'Vous avez une nouvelle réponse',
            cssClass: 'myAlert',
            buttons: ['Ok']
          });
          alert.present();
          this.smartAudio.play('notification');
        }
      });
    });
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
    this.initRefresh();
  }

  ionViewDidLeave() {
    this.stopRefresh();
  }

  private initRefresh() {
    this.doRefresh(0);
    this.timeoutId = setInterval(() => this.doRefresh(0), 30 * 1000);
  }

  private stopRefresh() {
    clearInterval(this.timeoutId);
  }

}
