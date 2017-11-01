import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {TabsPage} from "../tabs/tabs";
import {afficheDate} from "../../app/functions";
import {ResponsePage} from "./response";

@Component({
  selector: 'page-myresponses',
  templateUrl: 'myresponses.html'
})
export class MyResponsesPage implements OnInit {
  responses: Consultation[];
  loading: Loading;


  constructor(public navCtrl: NavController,
              private authService: AuthService, private consultationService: ConsultationService, private loadingCtrl: LoadingController) {
  }

  itemTapped(event, response) {
    this.navCtrl.push(ResponsePage, {'response' : response});
    console.log('itemTapped' + response.id)
  }

  ngOnInit(): void {
    console.log("call: this.consultationService.getResponsesByXchangeStatus("+this.authService.getUserInfo()+", 1)");
    this.consultationService.getResponsesByXchangeStatus(this.authService.getUserInfo(), "1|3").then(consultations => {
      this.responses = consultations;
    });
  }
  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }
  afficheDate(ts: number) {
    return afficheDate(ts);
  }

}
