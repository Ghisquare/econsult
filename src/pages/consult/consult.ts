import { NavParams } from 'ionic-angular';
import {Component, ErrorHandler, Inject, Input, OnInit, ViewChild}                     from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import {FormBuilder, FormGroup, Validators, FormControl }   from '@angular/forms';
import {Consultation}                         from "../../app/model/consultation";
import {Specialty}                            from "../../app/model/specialty";
import {SpecialtyService} from "../../providers/specialty.service";
import {UserService} from "../../providers/user.service";
import {User} from "../../app/model/user";
import {ConsultationService} from "../../providers/consultation.service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {
  Loading, LoadingController, NavController, ActionSheetController, Platform,
  ToastController, ModalController, Content
} from "ionic-angular";
import {Patient} from "../../app/model/patient";
import {PatientService} from "../../providers/patient.service";
import {ShowPhotoPage} from "../../pages/show-photo/show-photo";
import {Image} from "../../app/model/image";
import {ImageService} from "../../providers/image.service";
import {age} from "../../app/functions";
import {HomePage} from "../../pages/home/home";


declare var cordova: any;


@Component({
  selector: 'page-consult',
  templateUrl: 'consult.html'
})
export class ConsultPage implements OnInit{
  loading: Loading;
  consultation: Consultation;
  patient: Patient;

  specialties: Specialty[];
  contacts: User[];
  selectedContact: User;
  selectedSpecialty: Specialty;
  consultForm: FormGroup;
  isAnonymousPatient: boolean = true;
  timeUnits: Array<any>;
  images: Array<string> = [];
  closed: boolean = false;
  submitAttempt: boolean = false;
  selectOptions: any =  {cssClass: 'background-primary'};

  @ViewChild(Content) content: Content;

  constructor(public navParams: NavParams, private fb: FormBuilder, private specialtyService: SpecialtyService, private userService: UserService,
              private authService: AuthService, private consultationService: ConsultationService, private loadingCtrl: LoadingController,
              private navCtrl: NavController, private  patientService: PatientService, private camera: Camera,
              private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform,
              public modalCtrl: ModalController, private imgService: ImageService, private myErrorHandler: ErrorHandler) { // <--- inject FormBuilder
    this.createForm();
    this.timeUnits = consultationService.getTimeUnits();
  }

  public deleteImage(index){
    this.file.removeFile(cordova.file.dataDirectory, this.images[index]).then(success => {
      this.consultForm.removeControl('image' + this.images);
      if (index + 1 < this.images.length) {
        for(let i = index; i < this.images.length - 1; i++) {// need to move control value up
          let oldValue = this.consultForm.controls['image' + (i + 1)].value;
          console.log('old value:' + oldValue);
          this.consultForm.controls['image' + (i)].setValue(oldValue);
        }
      }
      this.consultForm.removeControl('image' + (this.images.length - 1));

      this.images.splice(index, 1);
    }, error => {
      this.presentToast('Error while storing file.');
      console.log(cordova.file.dataDirectory + this.images[index])
    });
  }

  public showImage(index){
    const photoModal = this.modalCtrl.create(ShowPhotoPage, { imageFile:  this.pathForImage(this.images[index]) });
    photoModal.present();
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choisissez la source de l\'image',
      buttons: [
        {
          text: 'Charger depuis la bibliothèque',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Prendre une photo',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      //Pro.getApp().monitoring.log("Take picture-sourceType" + sourceType + "path" + imagePath);


      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        //Pro.getApp().monitoring.log("this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY");
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        //Pro.getApp().monitoring.log("NOT this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY");

        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.myErrorHandler.handleError(err);
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    //Pro.getApp().monitoring.log("copyFileToLocalDir("+namePath+", "+currentName +", "+newFileName+")cordova.file.dataDirectory:" +cordova.file.dataDirectory);

    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      //Pro.getApp().monitoring.log("This.copyfile success. Length" + this.images.length);

      let controlName = 'image' + this.images.length;
      this.consultForm.addControl(controlName, new FormControl(""));
      this.images.push(newFileName);
      //Pro.getApp().monitoring.log("Error while storing file.");

    }, error => {
      //Pro.getApp().monitoring.log("Error while storing file. Length" + this.images.length);
      this.myErrorHandler.handleError(error);
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    return this.imgService.pathForImage(img);
  }

  createForm() {
    this.consultForm = this.fb.group({
      specialty: ['', Validators.required ], // <--- the FormControl called "name"
      contact: ['', Validators.required ], // <--- the FormControl called "name"
      anonymous_patient:[true],
      age: ['', Validators.required ], // <--- the FormControl called "name"
      sex: ['', Validators.required ], // <--- the FormControl called "name"
      description: ['', Validators.required ], // <--- the FormControl called "name"
      antecedent: ['' ], // <--- the FormControl called "name"
      traitementEnCours: ['' ], // <--- the FormControl called "name"
      debutSymptome: ['0', Validators.required ], // <--- the FormControl called "name"
      debutSymptomeUnit: ['0' ], // <--- the FormControl called "name"
      patient_name: ['' ],
      patient_forname: ['' ],
      patient_birthdate: ['' ],
      patientIdentification: [''],

      any: ''
    });
  }

  doAnonymous(){
    this.isAnonymousPatient = this.consultForm.value.anonymous_patient;
    if (this.isAnonymousPatient) {
      this.consultForm.controls.age.setValidators(Validators.required);
      this.consultForm.controls.age.updateValueAndValidity();
      this.consultForm.controls.patient_name.clearValidators();
      this.consultForm.controls.patient_name.updateValueAndValidity();
      this.consultForm.controls.patient_forname.clearValidators();
      this.consultForm.controls.patient_forname.updateValueAndValidity();
      this.consultForm.controls.patient_birthdate.clearValidators();
      this.consultForm.controls.patient_birthdate.updateValueAndValidity();
      this.consultForm.controls.patientIdentification.clearValidators();
      this.consultForm.controls.patientIdentification.updateValueAndValidity();
    } else {
      this.consultForm.controls.age.clearValidators();
      this.consultForm.controls.age.updateValueAndValidity();
      this.consultForm.controls.patient_name.setValidators(Validators.required);
      this.consultForm.controls.patient_name.updateValueAndValidity();
      this.consultForm.controls.patient_forname.setValidators(Validators.required);
      this.consultForm.controls.patient_forname.updateValueAndValidity();
      this.consultForm.controls.patient_birthdate.setValidators(Validators.required);
      this.consultForm.controls.patient_birthdate.updateValueAndValidity();
      this.consultForm.controls.patientIdentification.setValidators(Validators.required);
      this.consultForm.controls.patientIdentification.updateValueAndValidity();
    }
  }
  onSelectSpecialty(specialty: Specialty): void {
    this.selectedSpecialty = specialty;
    this.userService.getUsersBySpecialty(this.selectedSpecialty.id).then(users => this.contacts = users);

  }

  onSelectContact(contact: User): void {
    this.selectedContact = contact;
  }

  ngOnInit(): void {
    this.specialtyService.getSpecialties().then(specialties => {
      this.specialties = specialties;
    });
  }

  onSubmit() {
    console.log("submit form is valid ? " + this.consultForm.valid);

    this.submitAttempt = true;

    if(this.consultForm.valid) {
      this.showLoading();
      this.submitAttempt = false;
      if (!this.isAnonymousPatient) {
        this.patient = this.prepareSavePatient();


        this.patientService.createPatient(this.patient).then(patient => {
          this.patient = patient;
          console.log("Patient" + JSON.stringify(patient));
          this.doSaveConsultation();
        });
      } else {
        this.doSaveConsultation();
      }
    } else {
      console.log("Form not valid");
      this.content.scrollToTop();
    }
  }

  doSaveConsultation(){
    this.consultation = this.prepareSaveConsultation();
    this.consultationService.createConsultation(this.consultation).then(consultation => {
      this.consultation = consultation;
      console.log("ConsultationData: " + JSON.stringify(this.consultation));
      for(let i = 0; i < this.images.length; i++) {
        let saveImage = new Image();
        saveImage.uri = this.images[i];
        saveImage.description = this.consultForm.controls['image' + i].value;
        saveImage.consultationId = this.consultation.id;
        console.log("Saved Image before: " + JSON.stringify(saveImage));

        this.imgService.createImage(saveImage).then(image => {
          saveImage = image;
          console.log("Saved Image: " + JSON.stringify(saveImage));
          if(i == this.images.length - 1) this.closeForm();
        });

      }
      if(this.images.length == 0) this.closeForm();

    });
  }

  closeForm() {
    console.log("consult-form.close")
    this.loading.dismiss();
    this.closed = true;
  }

  prepareSavePatient(): Patient{
    const formModel = this.consultForm.value;
    const savePatient = new Patient();
    savePatient.name = formModel.patient_name;
    savePatient.forname = formModel.patient_forname;
    savePatient.birthdate = formModel.patient_birthdate;
    savePatient.sex = formModel.sex;
    savePatient.identification = formModel.patientIdentification;

    return savePatient;

  }

  prepareSaveConsultation(): Consultation{
    const formModel = this.consultForm.value;
    const saveConsultation = new Consultation();
    saveConsultation.dateCreation = Date.now();
    console.log("DateCreation" + saveConsultation.dateCreation );

    saveConsultation.sex = formModel.sex * 1;
    saveConsultation.age = formModel.age * 1;
    saveConsultation.description = formModel.description;
    saveConsultation.antecedent = formModel.antecedent;
    saveConsultation.traitementEnCours = formModel.traitementEnCours;
    saveConsultation.debutSymptome = formModel.debutSymptome * 1;
    saveConsultation.debutSymptomeUnit = formModel.debutSymptomeUnit * 1;
    saveConsultation.authorId= this.authService.getUserInfo().id;
    saveConsultation.author= "users/" + this.authService.getUserInfo().id;
    saveConsultation.contactId = formModel.contact * 1;
    saveConsultation.contact = "users/" + formModel.contact;
    saveConsultation.xchangeStatus = 0;
    saveConsultation.isResponse = false;
    saveConsultation.isAnonymous = formModel.anonymous_patient;
    if (!this.isAnonymousPatient) {
      saveConsultation.patientId = this.patient.id * 1;
      saveConsultation.patient = "patients/" + this.patient;
      saveConsultation.age = age(this.patient.birthdate) * 1; //A FAIRE CALCUL AGE EN FONCTION DATE DE NAISSANCE
    } else {
      saveConsultation.patientId = null;
      saveConsultation.patient = null;
    }


    console.log("prepareSaveConsultation JSON" + JSON.stringify(saveConsultation));

    return saveConsultation;

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }


}
