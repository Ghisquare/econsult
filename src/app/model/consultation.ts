import {User} from "./user";
import {Patient} from "./patient";

export class Consultation {
  id: number;

  date_creation: number;
  date_response: number;
  date_close: number;

  sex: number;
  age: number;

  description: string;
  antecedent: string;
  traitementEnCours: string;
  debut_symptome: number;
  debut_symptome_unit: number;
  author_id: number;
  author: User;
  contact_id: number;
  contact: User;
  response: string;
  treatment: string;
  rdvStatus: number;
  rdvUnit: number;
  xchangeStatus: number;
  is_anonymous: boolean;
  patient_id: number;
  patient: Patient;

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
