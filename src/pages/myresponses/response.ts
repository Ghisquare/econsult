import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {TabsPage} from "../tabs/tabs";
import {afficheDate} from "../../app/functions";
import {MessageService} from "../../providers/message.service";
import {Message} from "../../app/model/message";

@Component({
  selector: 'response',
  templateUrl: 'response.html'
})
export class ResponsePage implements OnInit {
  consultation: Consultation;
  loading: Loading;
  closed: boolean = false;
  messages: Message[];
  hasMessages: boolean = false;
  infoComp: boolean = false;
  sentMessage: Message;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              private consultationService: ConsultationService, private loadingCtrl: LoadingController, private messageService: MessageService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.consultation = navParams.get('response');
  }

  ngOnInit() {
    //demande d'info comp
      this.messageService.getMessagesByConsultationId(this.consultation.id).then(messages => {
        this.messages = messages;
        this.hasMessages= (this.messages.length > 0);
      });
  }

  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  closeConsultation(){
    this.showLoading()

    let consultation = this.consultation;
    consultation.xchangeStatus = 4;
    consultation.date_close = Date.now();

    this.consultationService.update(consultation).then(consultation => {
      this.consultation = consultation;
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
      this.closed = true;
    }
  }
}
