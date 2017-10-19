import {Component, Input, OnInit}                     from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import {FormBuilder, FormGroup, Validators}   from '@angular/forms';
import {Consultation}                         from "../app/model/consultation";
import {Specialty}                            from "../app/model/specialty";
import {SpecialtyService} from "../providers/specialty.service";
import {UserService} from "../providers/user.service";
import {User} from "../app/model/user";
import {ConsultationService} from "../providers/consultation.service";
import {AuthService} from "../providers/auth-service/auth-service";
import {
  Loading, LoadingController, NavController, ActionSheetController, Platform,
  ToastController, ModalController
} from "ionic-angular";
import {TabsPage} from "../pages/tabs/tabs";
import {Patient} from "../app/model/patient";
import {PatientService} from "../providers/patient.service";
import {ShowPhotoPage} from "../pages/show-photo/show-photo";

declare var cordova: any;

@Component({
  selector: 'consult-form',
  templateUrl: 'consult-form.html'
})
export class ConsultFormComponent implements OnInit{
  loading: Loading;
  consultation: Consultation;
  patient: Patient;

  consultations : Consultation[];//for debbugging

  specialties: Specialty[];
  contacts: User[];
  selectedContact: User;
  selectedSpecialty: Specialty;
  consultForm: FormGroup;
  isAnonymousPatient: boolean = true;
  timeUnits: Array<any>;
  images: Array<string> = [];



  constructor(private fb: FormBuilder, private specialtyService: SpecialtyService, private userService: UserService,
              private authService: AuthService, private consultationService: ConsultationService, private loadingCtrl: LoadingController,
            private navCtrl: NavController, private  patientService: PatientService, private camera: Camera,
              private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform,
              public modalCtrl: ModalController) { // <--- inject FormBuilder
    this.createForm();
    this.timeUnits = consultationService.getTimeUnits();
    console.log(this.timeUnits);
  }

  public deleteImage(index){
    this.file.removeFile(cordova.file.dataDirectory, this.images[index]).then(success => {
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
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
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
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.images.push(newFileName);
    }, error => {
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
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  createForm() {
    this.consultForm = this.fb.group({
      specialty: ['', Validators.required ], // <--- the FormControl called "name"
      contact: ['', Validators.required ], // <--- the FormControl called "name"
      anonymous_patient:[''],
      age: ['', Validators.required ], // <--- the FormControl called "name"
      sex: ['', Validators.required ], // <--- the FormControl called "name"
      description: ['', Validators.required ], // <--- the FormControl called "name"
      antecedent: ['' ], // <--- the FormControl called "name"
      traitementEnCours: ['' ], // <--- the FormControl called "name"
      debut_symptome: ['' ], // <--- the FormControl called "name"
      debut_symptome_unit: ['0' ], // <--- the FormControl called "name"
      patient_name: ['', Validators.required ],
      patient_forname: ['', Validators.required ],
      patient_birthdate: ['', Validators.required ],
      patient_identification: ['', Validators.required ],

      any: ''
    });
  }

  doAnonymous(){
    this.isAnonymousPatient = this.consultForm.value.anonymous_patient;
  }
  onSelectSpecialty(specialty: Specialty): void {
    this.selectedSpecialty = specialty;
    this.userService.getUsersBySpecialty(this.selectedSpecialty.id).then(users => this.contacts = users);

  }

  onSelectContact(contact: User): void {
    this.selectedContact = contact;
  }

    ngOnInit(): void {
    this.specialtyService.getSpecialties().then(specialties => this.specialties = specialties);
  }

  onSubmit() {
    console.log("submit form");
    this.showLoading()

    if(!this.isAnonymousPatient) {
      this.patient = this.prepareSavePatient();


      this.patientService.createPatient(this.patient).then(patient => {
        this.patient = patient;
        console.log("Patient" + JSON.stringify(patient));
        this.doSaveConsultation();
      });
    } else {
      this.doSaveConsultation();
    }

    //console.log("form submitted" + this.consultation.id);
  }

  doSaveConsultation(){
    this.consultation = this.prepareSaveConsultation();
    this.consultationService.createConsultation(this.consultation).then(consultation => {
      this.consultation = consultation;
      console.log("ConsultationData: " + JSON.stringify(this.consultation));
      this.loading.dismiss();
    });
  }

  prepareSavePatient(): Patient{
    const formModel = this.consultForm.value;
    const savePatient = new Patient();
    savePatient.name = formModel.patient_name;
    savePatient.forname = formModel.patient_forname;
    savePatient.birthdate = formModel.patient_birthdate;
    savePatient.sex = formModel.sex;
    savePatient.identification = formModel.patient_identification;

    return savePatient;

  }

  prepareSaveConsultation(): Consultation{
    const formModel = this.consultForm.value;
    const saveConsultation = new Consultation();
    saveConsultation.sex = formModel.sex;
    saveConsultation.age = formModel.age;
    saveConsultation.description = formModel.description;
    saveConsultation.antecedent = formModel.antecedent;
    saveConsultation.traitementEnCours = formModel.traitementEnCours;
    saveConsultation.debut_symptome = formModel.debut_symptome;
    saveConsultation.debut_symptome_unit = formModel.debut_symptome_unit;
    saveConsultation.author_id= this.authService.getUserInfo().id;
    saveConsultation.author= this.authService.getUserInfo();
    saveConsultation.contact_id = formModel.contact;
    saveConsultation.contact = this.selectedContact;
    saveConsultation.xchangeStatus = 0;
    saveConsultation.is_anonymous = formModel.anonymous_patient;
    if (!this.isAnonymousPatient) {
      saveConsultation.patient_id = this.patient.id;
      saveConsultation.patient = this.patient;
      saveConsultation.age = 101; //A FAIRE CALCUL AGE EN FONCTION DATE DE NAISSANCE
    } else {
      saveConsultation.patient_id = null;
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
    this.navCtrl.setRoot(TabsPage);
  }

}
