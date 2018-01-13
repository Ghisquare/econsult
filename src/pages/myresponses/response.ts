import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {ConsultationService} from "../../providers/consultation.service";
import {Consultation} from "../../app/model/consultation";
import {afficheDate, sexText} from "../../app/functions";
import {MessageService} from "../../providers/message.service";
import {Message} from "../../app/model/message";
import {HomePage} from "../home/home";
import {EmailComposer} from "@ionic-native/email-composer";
import {AuthService} from "../../providers/auth-service/auth-service";

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



  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer, private authService: AuthService,
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
    this.navCtrl.setRoot(HomePage);
  }

  getResume() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        console.log('Email available');
      } else {
        console.log('Email not available');
      }
    });

    let body = "<h1>Résumé de votre consultation</h1>";
    body += "<b>Médecin contacté: </b> " + this.consultation.contact.forname + " " + this.consultation.contact.name + "<br />";
    body += "<b>Spécialité: </b>" + this.consultation.contact.specialty.name + "<br />";
    body += "<b>Envoyé le: </b>" + afficheDate(this.consultation.dateCreation) + "<br />";
    body += "<h2>Description du cas</h2>";
    body += "<b>Sexe: </b>" + sexText(this.consultation.sex) + "<br />";
    body += "<b>Antécédents: </b>" + this.consultation.antecedent + "<br />";
    body += "<b>Début symptome: </b>" + this.consultation.debutSymptome + "" + this.consultationService.getTimeUnit(this.consultation.debutSymptomeUnit) + "<br />";
    body += "<b>Description clinique: </b>" + this.consultation.description + "<br />";
    body += "<b>Traitement déjà initié: </b>" + this.consultation.traitementEnCours + "<br />";
    body += "<h2>Réponse de " + this.consultation.contact.forname + " " + this.consultation.contact.name + "</h2>";
    body += "<b>Diagnostic</b>: " + this.consultation.response+ "<br />";
    body += "<b>Délai de consultation conseillé</b>: ";
    body += (this.consultation.rdvStatus == 0) ? "Pas de consultation nécessaire" : this.consultation.rdvStatus + " " + this.consultationService.getTimeUnit(this.consultation.rdvUnit);
    body += "<br />";


    let email = {
      to: this.authService.currentUser.email,
//      bcc: ['john@doe.com', 'jane@doe.com'],
      subject: 'EConsult - Résumé de votre réponse',
      body: body,
      isHtml: true
    };

    this.emailComposer.open(email);

  }

  closeConsultation(){
    this.showLoading()

    let consultation = this.consultation;
    consultation.xchangeStatus = 4;
    consultation.dateClose = Date.now();

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
