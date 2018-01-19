import {Component, Input, OnInit}                     from '@angular/core';
import {FormBuilder, FormGroup, Validators}   from '@angular/forms';
import {Consultation}                         from "../app/model/consultation";
import {ConsultationService} from "../providers/consultation.service";
import {Loading, LoadingController} from "ionic-angular";
import {responseStatus} from "../app/functions"

@Component({
  selector: 'response-form',
  templateUrl: 'response-form.component.html'

})
export class ResponseFormComponent implements OnInit{
  loading: Loading;
  @Input() consultation: Consultation;
  responseStatus: Array<string>;
  responseForm: FormGroup;
  timeUnits: Array<any>;
  closed: boolean = false;
  submitAttempt: boolean = false;
  selectOptions: any =  {cssClass: 'background-third'};

  constructor(private fb: FormBuilder, private consultationService: ConsultationService, private loadingCtrl: LoadingController) { // <--- inject FormBuilder
    this.createForm();
    this.timeUnits = consultationService.getTimeUnits();
  }

  createForm() {
    this.responseForm = this.fb.group({
      response: ['', Validators.required ], // <--- the FormControl called "name"
      treatment: ['' ], // <--- the FormControl called "name"
      status: ['', Validators.required ], // <--- the FormControl called "name"
      rdv_number: ['1', Validators.required ], // <--- the FormControl called "name"
      rdv_unit: ['0', Validators.required ], // <--- the FormControl called "name"
    });
  }

  ngOnInit(): void {
    this.responseStatus = responseStatus;
  }

  onSubmit() {
    console.log("submit form response");
    this.submitAttempt = true;

    if(this.responseForm.valid) {
      this.submitAttempt = false;
      this.showLoading();

      this.prepareUpdateConsultation();
      this.consultationService.update(this.consultation).then(consultation => {
        this.loading.dismiss();
        this.consultation = consultation;

      });
      //console.log("form submitted" + this.consultation.id);
    }
  }

  prepareUpdateConsultation(){
    const formModel = this.responseForm.value;
    this.consultation.dateResponse = "" + Date.now();
    console.log("this.consultation.dateResponse" + this.consultation.dateResponse);
    this.consultation.response = formModel.response;
    this.consultation.treatment = formModel.treatment;

    if(formModel.status == 0) this.consultation.rdvStatus = formModel.status * 1;

    else {
        this.consultation.rdvStatus = formModel.rdv_number * 1;
        this.consultation.rdvUnit = formModel.rdv_unit * 1;
    }
    this.consultation.xchangeStatus = 3;//status consultation répondu en attente fermeture
    this.consultation.isResponse = true;
    console.log("prepareUpdateConsultation" + JSON.stringify(this.consultation));
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }



}
