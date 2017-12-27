import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../providers/user.service";
import {userTypes} from "../../app/functions";
import {Specialty} from "../../app/model/specialty";
import {Profession} from "../../app/model/profession";
import {ProfessionService} from "../../providers/profession.service";
import {SpecialtyService} from "../../providers/specialty.service";
import {User} from "../../app/model/user";
import {AuthService} from "../../providers/auth-service/auth-service";
import {UsernameValidator} from "../../validators/username";
import {HomePage} from "../home/home";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit{
  loading: Loading;
  registerForm: FormGroup;
  userTypes: Array<string>;
  civilities: Array<string>;
  visibleStatus: Array<string>;
  specialties: Specialty[];
  professions: Profession[];
  selectedType: number;
  selectedProfession: Profession;
  selectedSpecialty: Specialty;
  isSpecialist: boolean;
  user: User;
  identificationTitle: string = "Identification";
  submitAttempt: boolean = false;
  formSuccess: boolean = false;
  @ViewChild(Content) content: Content;

  userTypeValid: boolean;
  birthdateValid: boolean;

  selectOptions: any =  {cssClass: 'background-primary'};


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private loadingCtrl: LoadingController,
               private userService: UserService, private professionService: ProfessionService, private specialtyService: SpecialtyService,
               private authService: AuthService) {
  }

  createForm() {
    this.registerForm = this.fb.group({
      userType: [this.user.user_type, Validators.required ],
      visible: [this.user.visible],
      profession: [this.user.profession_id], // <--- the FormControl called "name"
      generalist: [(this.user.specialty_id == 19 ? 0:1)], // <--- the FormControl called "name"
      specialty: [this.user.specialty_id],
      birthdate: [this.user.birthdate], // <--- the FormControl called "name"
      sex: [this.user.sex, Validators.required ], // <--- the FormControl called "name"
      civility: [this.user.civility, Validators.required ], // <--- the FormControl called "name"
      name: [this.user.name,  Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Zéèçàê ]*'), Validators.required]) ],
      forname: [this.user.forname,  Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Zéèçàê ]*'), Validators.required]) ],
      identification: [this.user.identification, [Validators.minLength(10), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required] ],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email]) /*, new UsernameValidator(this.userService).checkUsername*/ ],
      tel: [this.user.tel, Validators.required ],
      skype: [this.user.skype],
      facetime: [this.user.facetime],
      accept_patient: [this.user.accept_patient, Validators.required],


//      email_confirm: ['', Validators.required ],
      pwd: [this.user.pwd, Validators.required ],
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
    this.identificationTitle = "Numéro de sécurité sociale";
    this.doCivilities();
    this.registerForm.controls.birthdate.setValidators(Validators.required);
    this.registerForm.controls.birthdate.updateValueAndValidity();
    this.registerForm.controls['profession'].clearValidators();
    this.registerForm.controls.profession.updateValueAndValidity();
    this.registerForm.controls['generalist'].clearValidators();
    this.registerForm.controls.generalist.updateValueAndValidity();
  }

  doProf(){
    console.log('doProf RegisterPage' +this.selectedType);
    this.identificationTitle = "Numéro d'idenfication professionnel";
    this.doCivilities();
    this.registerForm.controls['birthdate'].clearValidators();
    this.registerForm.controls.birthdate.updateValueAndValidity();
    this.registerForm.controls['generalist'].clearValidators();
    this.registerForm.controls.generalist.updateValueAndValidity();
    this.registerForm.controls.profession.setValidators(Validators.required);
    this.registerForm.controls.profession.updateValueAndValidity();


  }
  doMedic(){
    console.log('doMedic RegisterPage'+this.selectedType);
    this.identificationTitle = "Numéro RPPS";
    this.doCivilities();
    this.registerForm.controls['birthdate'].clearValidators();
    this.registerForm.controls.birthdate.updateValueAndValidity();
    this.registerForm.controls['profession'].clearValidators();
    this.registerForm.controls.profession.updateValueAndValidity();
    this.registerForm.controls.generalist.setValidators(Validators.required);
    this.registerForm.controls.generalist.updateValueAndValidity();

  }

  doCivilities(){
    this.civilities = this.userService.getCivilities();
    if(this.selectedType == 2) {
      this.civilities.splice(0, 3);
    } else {
      this.civilities.splice(3,2);
    }
  }

  doGeneralist(){
    this.isSpecialist = false;
    this.registerForm.controls['specialty'].clearValidators();
    this.registerForm.controls.specialty.updateValueAndValidity();  }

  doSpecialist(){
    this.isSpecialist = true;
    this.registerForm.controls.specialty.setValidators(Validators.required);
    this.registerForm.controls.specialty.updateValueAndValidity();

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }


  onSubmit(){

    this.userTypeValid = this.registerForm.controls.userType.valid;
    this.birthdateValid = this.registerForm.controls.birthdate.valid;

    this.submitAttempt = true;


    if(this.registerForm.valid) {
      this.submitAttempt = false;

      this.showLoading();

      this.user = this.prepareSaveUser();

      this.userService.update(this.user).then(user => {
        this.user = user;
        this.authService.refreshUsers();
        this.formSuccess = true;
        this.loading.dismiss();
        console.log("User updated: " + JSON.stringify(this.user));

      });
    } else {
      this.scrollToTop();
    }

  }

  prepareSaveUser(){
    const formModel = this.registerForm.value;
    const user = this.user;
    user.user_type = formModel.userType;
    user.visible = formModel.visible;
    user.sex = formModel.sex;
    if(formModel.userType == 0) user.birthdate = formModel.birthdate; else user.birthdate = null;
    user.civility = formModel.civility;
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
    this.user = this.authService.currentUser;
    console.log(JSON.stringify("settings Init" + this.user));
    this.createForm();

    this.specialtyService.getSpecialties().then(specialties => {
      this.specialties = specialties;
      this.professionService.getProfessions().then(professions => {
        this.professions = professions;
        this.userTypes = userTypes;
        this.civilities = this.userService.getCivilities();
        this.visibleStatus = this.userService.getVisibleStatus();

        this.onSelectType(this.user.user_type);
        if(this.user.specialty_id == 19) this.doGeneralist(); else this.doSpecialist();

      });

    });

    console.log(this.registerForm.controls['skype']);
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
