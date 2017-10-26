import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Consultation} from "../../app/model/consultation";
import {afficheDate} from "../../app/functions";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-consulted',
  templateUrl: 'consulted-page.html'
})
export class ConsultedPage {
  selectedDemand: Consultation;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedDemand = navParams.get('demand');
    console.log("ConsultedPage.construct D" + this.selectedDemand.id);
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

  afficheDate(ts: number) {
    return afficheDate(ts);
  }
}
