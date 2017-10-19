import {Specialty} from "./specialty";
import {Profession} from "./profession";
export class User {
  id: number;
  user_type: number;
  accept_patient: boolean;
  sex: number;
  birthdate: Date;
  name: string;
  forname: string;
  identification: string;
  email: string;
  pwd: string;
  tel: string;
  skype: string;
  facetime: string;
  specialty_id: number;
  specialty: Specialty;
  profession_id: number;
  profession: Profession;
  online: boolean;

  init(id: number, name: string, forname: string, email: string, pwd: string, specialty_id: number, online: boolean) {
    this.id = id;
    this.name = name;
    this.forname = forname;
    this.email = email;
    this.pwd = pwd;
    this.specialty_id = specialty_id;
    this.online = online;
  }
  constructor(){}
}
