
export class Consultation {
  id: number;

  dateCreation: any;
  dateModified: any;
  dateResponse: any;
  dateClose: any;

  sex: number;
  age: number;

  description: string;
  antecedent: string;
  traitementEnCours: string;
  debutSymptome: number;
  debutSymptomeUnit: number;
  authorId: number;
  author: any;
  contactId: number;
  contact: any;
  response: string;
  treatment: string;
  rdvStatus: number;
  rdvUnit: number;
  xchangeStatus: number;
  isResponse: boolean;
  isAnonymous: boolean;
  patientId: number;
  patient: any;

  //__OK antécédent >> texte
  //__OK traitement en cours >> texte
  //__OK début des symptomes >> nb jours
  //donnée patient n° sécu
  //=> auto complétion

  // USER n° RTPS
  // Formulaire enregistrement médecin
  // Tél mail

  // Réponse rdv conseillé > nb / jours
  // bouton appel tél ou vidéo >> skype
  // Traitement à initier >> texte
  //  personnalisation auto
  // Docto Lib

  // Form Register

  //code couleur Orange / Bleu
  constructor() {

  }

  public getAuthorName():string {
    return this.author.forname + " " + this.author.name;
  }
}
