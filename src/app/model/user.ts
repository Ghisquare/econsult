
export class User {
  id: number;
  userType: number;
  civility: number;
  acceptPatient: boolean;
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
  specialtyId: number;
  specialty: any;
  professionId: number;
  profession: any;
  online: boolean;
  shortName: string;
  visible: number;

  init(id: number, name: string, forname: string, email: string, pwd: string, specialtyId: number, online: boolean) {
    this.id = id;
    this.name = name;
    this.forname = forname;
    this.email = email;
    this.pwd = pwd;
    this.specialtyId = specialtyId;
    this.online = online;
  }
  constructor(){}
}
