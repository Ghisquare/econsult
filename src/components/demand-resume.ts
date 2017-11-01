import { Component, OnInit, Input } from '@angular/core';


import {Consultation} from "../app/model/consultation";
import {sexText, getSpecialtyName, afficheDate} from "../app/functions";
import {responseStatus} from "../app/functions"
import {ConsultationService} from "../providers/consultation.service";
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
  symptomeUnit: string;
  images: Array<Image> = [];
  dateAffiche: string;


  constructor(private consultationService: ConsultationService,
              private imgService: ImageService, private modalCtrl: ModalController) {
  }

 /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ConsultListPage, {
      item: item
    });
  }
*/
  ngOnInit(): void {

    console.log("DemandResumeConstruct ID" + this.consultation.id);

    this.imgService.getImagesByConsultationId(this.consultation.id).then(images => {
      this.images = images;
    });


    this.sexTexte = sexText(this.consultation.sex);
    this.authorSpecialty = getSpecialtyName(this.consultation.author.specialty_id);
    if(this.question) {
      this.titreMedecin = "Médecin demandant";
      this.nomTitreMedecin = this.consultation.author.forname + " " + this.consultation.author.name;
      this.authorSpecialty = getSpecialtyName(this.consultation.author.specialty_id);
      var options = {
        year: "numeric", month: "numeric",
        day: "numeric", hour: "2-digit", minute: "2-digit"
      };
      this.dateAffiche = afficheDate(this.consultation.date_creation);
    } else {
      this.titreMedecin = "Médecin contacté";
      this.nomTitreMedecin = this.consultation.contact.forname + " " + this.consultation.contact.name;
      this.authorSpecialty = getSpecialtyName(this.consultation.contact.specialty_id);
      this.dateAffiche =  afficheDate(this.consultation.date_response);
    }

    this.symptomeUnit = this.consultationService.getTimeUnit(this.consultation.debut_symptome_unit);
  }

  public pathForImage(img) {
    return this.imgService.pathForImage(img);
  }

  public showImage(index){
    const photoModal = this.modalCtrl.create(ShowPhotoPage, { imageFile:  this.pathForImage(this.images[index].uri) });
    photoModal.present();
  }
}
