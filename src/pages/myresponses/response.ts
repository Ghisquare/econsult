import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {TabsPage} from "../tabs/tabs";
import {afficheDate} from "../../app/functions";

@Component({
  selector: 'response',
  templateUrl: 'response.html'
})
export class ResponsePage {
  selectedResponse: Consultation;
  responses: Consultation[];
  loading: Loading;
  closed: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private consultationService: ConsultationService, private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedResponse = navParams.get('response');
  }

  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  closeConsultation(){
    this.showLoading()

    let consultation = this.selectedResponse;
    consultation.xchangeStatus = 2;
    consultation.date_close = Date.now();

    this.consultationService.update(consultation).then(consultation => {
      this.selectedResponse = consultation;
      this.loading.dismiss();
      this.closed = true;
    });
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
