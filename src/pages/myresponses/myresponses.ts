import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-myresponses',
  templateUrl: 'myresponses.html'
})
export class MyResponsesPage implements OnInit {
  selectedResponse: Consultation;
  responses: Consultation[];
  loading: Loading;


  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
              private authService: AuthService, private consultationService: ConsultationService, private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedResponse = navParams.get('response');
  }

  itemTapped(event, response) {
    this.selectedResponse = response;
    console.log('itemTapped' + this.selectedResponse.id)
  }

  ngOnInit(): void {
    this.consultationService.getResponsesByXchangeStatus(this.authService.getUserInfo(), 1).then(consultations => {
      this.responses = consultations;
      if(consultations.length == 1) this.selectedResponse = consultations[0];
    });
  }
  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  closeConsultation(){

    console.log("closeConsult debut");
    this.showLoading()

    console.log("closeConsult showloading");

    let consultation = this.selectedResponse;
    console.log(" let consultation");
    consultation.xchangeStatus = 2;
    consultation.date_close = Date.now();
    console.log("consultation.xchangeStatus = 2");

    this.consultationService.update(consultation).then(consultation => {
      this.selectedResponse = consultation;
      this.loading.dismiss();
      this.goHome();

    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

}
