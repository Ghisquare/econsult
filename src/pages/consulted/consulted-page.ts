import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Consultation} from "../../app/model/consultation";
import {afficheDate} from "../../app/functions";
import {HomePage} from "../home/home";
import {Message} from "../../app/model/message";
import {MessageService} from "../../providers/message.service";

@Component({
  selector: 'page-consulted',
  templateUrl: 'consulted-page.html'
})
export class ConsultedPage {
  selectedDemand: Consultation;
  infoComp: boolean = false;
  sentMessage: Message;
  messages: Message[];
  hasMessages: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private messageService: MessageService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedDemand = navParams.get('demand');
    console.log("ConsultedPage.construct D" + this.selectedDemand.id);
  }

  ngOnInit() {
    //demande d'info comp
    this.messageService.getMessagesByConsultationId(this.selectedDemand.id).then(messages => {
      this.messages = messages;
      this.hasMessages= (this.messages.length > 0);
    });
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

  afficheDate(ts: number) {
    return afficheDate(ts);
  }

  doInfoComp() {
    this.infoComp = true;
  }

  outputMessage(event) {
    console.log("outputMessage(event)" + JSON.stringify(event));
    if(event==null) {
      this.infoComp = false;
    } else {
      console.log("Cancel Message: false")
      this.sentMessage = event;
    }
  }
}
