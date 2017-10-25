import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {TabsPage} from "../tabs/tabs";
import {afficheDate} from "../../app/functions";

@Component({
  selector: 'page-mydemands',
  templateUrl: 'mydemands.html'
})
export class MyDemandsPage implements OnInit {
  selectedDemand: Consultation;
  demands: Consultation[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
              private authService: AuthService, private consultationService: ConsultationService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedDemand = navParams.get('demand');
  }

  itemTapped(event, demand) {
    this.selectedDemand = demand;
    console.log('itemTapped' + this.selectedDemand.id)
  }

  ngOnInit(): void {
    this.consultationService.getDemandsByContact(this.authService.getUserInfo(), 0).then(consultations => {
      this.demands = consultations;
      if(consultations.length == 1) this.selectedDemand = consultations[0];
    });
  }
  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  afficheDate(ts: number) {
    return afficheDate(ts);

  }
}
