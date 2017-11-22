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
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/auth-service/auth-service";
import {UsernameValidator} from "../../validators/username";

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
  civilities: Array<string>;
  specialties: Specialty[];
  professions: Profession[];
  selectedType: number;
  selectedProfession: Profession;
  selectedSpecialty: Specialty;
  isSpecialist: boolean;
  user: User;
  identificationTitle: string = "Identification";
  navbarTitle: string = "S'enregister";
  submitAttempt: boolean = false;
  @ViewChild(Content) content: Content;

  userTypeValid: boolean;
  birthdateValid: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private loadingCtrl: LoadingController,
               private userService: UserService, private professionService: ProfessionService, private specialtyService: SpecialtyService,
               private authService: AuthService) {
  }

  createForm() {
    this.registerForm = this.fb.group({
      userType: ['', Validators.required ],
      profession: [''], // <--- the FormControl called "name"
      generalist: [''], // <--- the FormControl called "name"
      specialty: [''],
      birthdate: [''], // <--- the FormControl called "name"
      sex: ['', Validators.required ], // <--- the FormControl called "name"
      civility: ['', Validators.required ], // <--- the FormControl called "name"
      name: ['',  Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]) ],
      forname: ['',  Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]) ],
      identification: ['', [Validators.minLength(10), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required] ],
      email: ['', Validators.compose([Validators.required, Validators.email]) /*, new UsernameValidator(this.userService).checkUsername*/ ],
      tel: ['', Validators.required ],
      skype: [''],
      facetime: [''],
      accept_patient: [true, Validators.required],


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
    this.identificationTitle = "Numéro de sécurité sociale";
    this.doCivilities();
    this.registerForm.controls.birthdate.setValidators(Validators.required);
    this.registerForm.controls.birthdate.updateValueAndValidity();
    console.log('doPatient RegisterPage '+JSON.stringify(this.registerForm.controls.birthdate.valid));

  }

  doProf(){
    console.log('doProf RegisterPage' +this.selectedType);
    this.identificationTitle = "Numéro d'idenfication professionnel";
    this.doCivilities();
    this.registerForm.controls['birthdate'].clearValidators();
    this.registerForm.controls.birthdate.updateValueAndValidity();


  }
  doMedic(){
    console.log('doMedic RegisterPage'+this.selectedType);
    this.identificationTitle = "Numéro RPPS";
    this.doCivilities();
    this.registerForm.controls['birthdate'].clearValidators();
    this.registerForm.controls.birthdate.updateValueAndValidity();
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
    console.log('doGeneralist RegisterPage'+this.selectedType);
    this.isSpecialist = false;
  }

  doSpecialist(){
    console.log('doSpecialist RegisterPage'+this.selectedType);
    this.isSpecialist = true;
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }


  onSubmit(){
    console.log('register.onSubmit');

    console.log("BDType Valid ? " + this.registerForm.controls.birthdate.valid);
    this.userTypeValid = this.registerForm.controls.userType.valid;
    this.birthdateValid = this.registerForm.controls.birthdate.valid;

    this.submitAttempt = true;


    if(this.registerForm.valid) {
      this.submitAttempt = false;

      this.showLoading();

      this.user = this.prepareSaveUser();

      this.userService.createUser(this.user).then(user => {
        this.user = user;
        console.log("onSubmit.promiseReturn");
        this.authService.refreshUsers();
        this.loading.dismiss();

      });
    } else {
      this.scrollToTop();
    }

  }

  prepareSaveUser(){
    const formModel = this.registerForm.value;
    const user = new User();
    user.user_type = formModel.userType;
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
    this.specialtyService.getSpecialties().then(specialties => this.specialties = specialties);
    this.professionService.getProfessions().then(professions => this.professions = professions);
    this.userTypes = userTypes;
    this.civilities = this.userService.getCivilities();
    this.createForm();

    console.log(this.registerForm.controls['skype']);
  }

  goHome(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {

    let tabs = <HTMLElement>document.querySelector('.tabbar');
    console.log('Register will enter' + JSON.stringify(tabs));

    if ( tabs !== null ) {
      console.log("tabs is not null");
        tabs.style.transform = 'translateY(56px)';
        tabs.style.display = 'none';
    } else {console.log("tabs is null");}// end if
  }

  ionViewDidLeave() {
    let tabs = <HTMLElement>document.querySelector('.tabbar');
    if ( tabs !== null ) {
        tabs.style.transform = 'translateY(0)';
        tabs.style.display = 'flex';

    } // end if
  }

  scrollToTop() {
    this.content.scrollToTop();
  }


}
