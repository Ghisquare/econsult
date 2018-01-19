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
  selectOptions: any =  {cssClass: 'background-primary'};


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
      name: ['',  Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ]*'), Validators.required]) ],
      forname: ['',  Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ]*'), Validators.required]) ],
      identification: ['', [Validators.minLength(10), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required] ],
      email: ['', Validators.compose([Validators.required, Validators.email]) /*, new UsernameValidator(this.userService).checkUsername*/ ],
      tel: ['', Validators.required ],
      skype: [''],
      facetime: [''],
      acceptPatient: [true, Validators.required],


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

      this.userService.createUser(this.user).then(user => {
        this.user = user;
        console.log("Register.onSubmit.afterCreateUser:" + JSON.stringify(this.user));
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
    user.userType = formModel.userType * 1;
    user.sex = formModel.sex * 1;
    if(formModel.userType == 0) user.birthdate = formModel.birthdate; else user.birthdate = null;
    user.civility = formModel.civility * 1;
    if(formModel.userType == 2) user.civility = user.civility + 3;
    user.name = formModel.name;
    user.forname = formModel.forname;
    user.tel = formModel.tel;
    user.identification = formModel.identification;
    user.email = formModel.email;
    user.pwd = formModel.pwd;
    user.acceptPatient = formModel.acceptPatient;
    user.skype = formModel.skype;
    user.facetime = formModel.facetime;
    if(formModel.userType == 1) {
      user.professionId = formModel.profession * 1;
      user.profession = "professions/" + this.selectedProfession.id;
    } else {
      user.professionId = null;
      user.profession = null
    }
    if(formModel.userType == 2 && formModel.generalist == 1) {
      user.specialtyId = formModel.specialty * 1;
      user.specialty = "specialties/" + this.selectedSpecialty.id;

    }

    if(formModel.userType == 2 && formModel.generalist == 0) {
      user.specialtyId = 1;
      const specialty = new Specialty();
      specialty.id = 1; specialty.name = "Médecine générale";
      user.specialty = "specialties/1";
    }
    console.log("register.prepareSaveUser User: " + user);
    console.log("register.prepareSaveUser JSON: " + JSON.stringify(user));
    return user;
  }

  ngOnInit(): void {
    this.specialtyService.getSpecialties().then(specialties => {
      this.specialties = specialties;
      console.log("Register.OnInit specialties");
      console.log(specialties);
    }).catch(this.handleError);
    this.professionService.getProfessions().then(professions => this.professions = professions);
    this.userTypes = userTypes;
    this.civilities = this.userService.getCivilities();

    console.log("Civilities" + this.civilities);

    this.createForm();

    console.log(this.registerForm.controls['skype']);
  }

  goHome(){
    console.log("register.goHome");
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred - SpecialtyService', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
