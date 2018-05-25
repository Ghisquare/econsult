import { Injectable } from '@angular/core';
import {SmartAudio} from "./smart-audio";
import {AlertController, App} from "ionic-angular";
import {ConsultationService} from "./consultation.service";
import {User} from "../app/model/user";
import {AuthService} from "./auth-service/auth-service";
import * as moment from 'moment';
import {HomePage} from "../pages/home/home";



@Injectable()
export class AlertService {
  oldDemandCount: number;
  demandCount: number;
  oldResponseCount: number;
  responseCount: number;
  private timeoutId: number;
  currentUser: User;
  isHome: boolean;


  constructor(private alertCtrl: AlertController, private smartAudio: SmartAudio, private consultationService: ConsultationService,
              authService: AuthService, private app: App){
    this.currentUser = authService.getUserInfo();
  }

  initRefresh(isHome: boolean = false) {
    this.isHome = isHome;
    this.timeoutId = setInterval(() => this.doRefresh(0), 30 * 1000);
  }

  stopRefresh() {
    clearInterval(this.timeoutId);
  }

  doRefresh(refresher) {
    console.log(`Refresh at ${moment().format('LTS')}`);
    this.oldDemandCount = this.demandCount;
    this.oldResponseCount = this.responseCount;

    this.consultationService.getDemandsByContact(this.currentUser, "0|2").then(consultations => {
      this.demandCount = consultations.length;
      this.consultationService.getResponsesByAuthor(this.currentUser).then(consultations => {
        this.responseCount = consultations.length;
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
          if(this.isHome) this.app.getRootNav().setRoot(HomePage);
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
          if(this.isHome) this.app.getRootNav().setRoot(HomePage);
        }
      });
    });
  }
}
