import {Component, OnInit} from '@angular/core';
import {Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../providers/user.service";
import {userTypes} from "../../app/functions";
import {Specialty} from "../../app/model/specialty";
import {Profession} from "../../app/model/profession";
import {ProfessionService} from "../../providers/profession.service";
import {SpecialtyService} from "../../providers/specialty.service";
import {User} from "../../app/model/user";
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit{
  loading: Loading;
  registerForm: FormGroup;
  userTypes: Array<string>;
  specialties: Specialty[];
  professions: Profession[];
  selectedType: number;
  selectedProfession: Profession;
  selectedSpecialty: Specialty;
  isSpecialist: boolean;
  user: User;
  identificationTitle: string = "Identification";


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private loadingCtrl: LoadingController,
               private userService: UserService, private professionService: ProfessionService, private specialtyService: SpecialtyService,
               private authService: AuthService) {
    this.userTypes = userTypes;
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      userType: ['', Validators.required ], // <--- the FormControl called "name"
      profession: ['', Validators.required ], // <--- the FormControl called "name"
      generalist: ['', Validators.required ], // <--- the FormControl called "name"
      specialty: [''],
      birthdate: ['', Validators.required ], // <--- the FormControl called "name"
      sex: ['', Validators.required ], // <--- the FormControl called "name"
      name: ['', Validators.required ],
      forname: ['', Validators.required ],
      identification: ['', Validators.required ],
      email: ['', Validators.required ],
      tel: ['', Validators.required ],
      skype: [''],
      facetime: [''],
      accept_patient: ['', Validators.required ],


//      email_confirm: ['', Validators.required ],
      pwd: ['', Validators.required ],
//      pwd_confirm: ['', Validators.required ],
    });
  }

  onSelectType(index: number) {
    this.selectedType = index;
    switch (index) {
      case 0: this.doPatient(); break;
      case 1: this.doProf(); break;
      case 2: this.doMedic(); break;
    }
  }

  onSelectProfession(profession: Profession){
    this.selectedProfession = profession;
  }

  onSelectSpecialty(specialty: Specialty) {
    this.selectedSpecialty = specialty;
  }

  doPatient(){
    console.log('doPatient RegisterPage'+this.selectedType);
    this.identificationTitle = "Numéro de sécurité sociale";
  }
  doProf(){
    console.log('doProf RegisterPage' +this.selectedType);
    this.identificationTitle = "Numéro d'idenfication professionnel";
  }
  doMedic(){
    console.log('doMedic RegisterPage'+this.selectedType);
    this.identificationTitle = "Numéro RPPS";

  }

  doGeneralist(){
    console.log('doGeneralist RegisterPage'+this.selectedType);
    this.isSpecialist = false;
  }

  doSpecialist(){
    console.log('doSpecialist RegisterPage'+this.selectedType);
    this.isSpecialist = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }


  onSubmit(){
    console.log('register.onSubmit');
    this.showLoading();

    this.user = this.prepareSaveUser();

    this.userService.createUser(this.user).then(user => {
      this.user = user;
      console.log("onSubmit.promiseReturn");
      this.authService.refreshUsers();
      this.loading.dismiss();

    });


  }

  prepareSaveUser(){
    const formModel = this.registerForm.value;
    const user = new User();
    user.user_type = formModel.userType;
    user.sex = formModel.sex;
    if(formModel.userType == 0) user.birthdate = formModel.birthdate; else user.birthdate = null;
    user.name = formModel.name;
    user.forname = formModel.forname;
    user.tel = formModel.tel;
    user.identification = formModel.identification;
    user.email = formModel.email;
    user.pwd = formModel.pwd;
    user.accept_patient = formModel.accept_patient;
    user.skype = formModel.skype;
    user.facetime = formModel.facetime;
    if(formModel.userType == 1) {
      user.profession_id = formModel.profession;
      user.profession = this.selectedProfession;
    } else {
      user.profession_id = null;
      user.profession = null
    }
    if(formModel.userType == 2 && formModel.generalist == 1) {
      user.specialty_id = formModel.specialty;
      user.specialty = this.selectedSpecialty;
    }

    if(formModel.userType == 2 && formModel.generalist == 0) {
      user.specialty_id = 19;
      const specialty = new Specialty();
      specialty.id = 19; specialty.name = "Médecine générale";
      user.specialty = specialty;
    }

    return user;
  }

  ngOnInit(): void {
    this.specialtyService.getSpecialties().then(specialties => this.specialties = specialties);
    this.professionService.getProfessions().then(professions => this.professions = professions);
  }

  goHome(){
    this.navCtrl.setRoot(LoginPage);
  }


}
