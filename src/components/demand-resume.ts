import { Component, OnInit, Input } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';


import {Consultation} from "../app/model/consultation";
import {sexText, getSpecialtyName} from "../app/functions";
import {responseStatus} from "../app/functions"
import {ConsultationService} from "../providers/consultation.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageService} from "../providers/image.service";
import {Image} from "../app/model/image";
import {ShowPhotoPage} from "../pages/show-photo/show-photo";
import {ModalController} from "ionic-angular";


@Component({
  selector: 'demand-resume',
  templateUrl: 'demand-resume.html'
})
export class DemandResumeComponent implements OnInit {
  @Input() consultation: Consultation;
  @Input() question: boolean = true;
  @Input() response: boolean = false;

  sexTexte: string;
  authorSpecialty: string;
  titreMedecin: string;
  nomTitreMedecin: string;
  statusText: string;
  symptomeUnit: string;
  telNumber: string;
  skype: string;
  images: Array<Image>;


  constructor(private consultationService: ConsultationService, private callNumber: CallNumber, private sanitizer:DomSanitizer,
              private imgService: ImageService, private modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  sanitizeSkype(){
    return this.sanitizer.bypassSecurityTrustUrl('skype:'+this.skype+'?call');
  }
 /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ConsultListPage, {
      item: item
    });
  }
*/
  ngOnInit(): void {
 //   this.userService.getUsersBySpecialty(this.specialty.id).then(users => this.contacts = users);
 //   console.log("c-select.OnInit" + this.specialty.id);
    this.imgService.getImagesByConsultationId(this.consultation.id).then(images => {
      this.images = images;
      console.log("images:" + images);
    });

    this.sexTexte = sexText(this.consultation.sex);
    this.authorSpecialty = getSpecialtyName(this.consultation.author.specialty_id);
    if(this.question) {
      this.titreMedecin = "Médecin demandant";
      this.nomTitreMedecin = this.consultation.author.forname + " " + this.consultation.author.name;
      this.authorSpecialty = getSpecialtyName(this.consultation.author.specialty_id);
      this.telNumber = this.consultation.author.tel;
      this.skype = this.consultation.author.skype;
    } else {
      this.titreMedecin = "Médecin contacté";
      this.nomTitreMedecin = this.consultation.contact.forname + " " + this.consultation.contact.name;
      this.authorSpecialty = getSpecialtyName(this.consultation.contact.specialty_id);
      this.telNumber = this.consultation.contact.tel;
      this.skype = this.consultation.contact.skype;

    }
    if(this.consultation.rdvStatus == 0) {
      this.statusText = responseStatus[this.consultation.rdvStatus];
    } else {
      this.statusText = responseStatus[1] + " " + this.consultation.rdvStatus + " " + this.consultationService.getTimeUnit(this.consultation.rdvUnit);
    }
    this.symptomeUnit = this.consultationService.getTimeUnit(this.consultation.debut_symptome_unit);
  }

  launchTelCall(){
    this.callNumber.callNumber(this.telNumber, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  public pathForImage(img) {
    return this.imgService.pathForImage(img);
  }

  public showImage(index){
    const photoModal = this.modalCtrl.create(ShowPhotoPage, { imageFile:  this.pathForImage(this.images[index].uri) });
    photoModal.present();
  }
}
