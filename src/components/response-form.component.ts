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


  constructor(private fb: FormBuilder, private consultationService: ConsultationService, private loadingCtrl: LoadingController,
            ) { // <--- inject FormBuilder
    this.createForm();
    this.timeUnits = consultationService.getTimeUnits();
  }

  createForm() {
    this.responseForm = this.fb.group({
      response: ['', Validators.required ], // <--- the FormControl called "name"
      treatment: ['', Validators.required ], // <--- the FormControl called "name"
      status: ['', Validators.required ], // <--- the FormControl called "name"
      rdv_number: ['', Validators.required ], // <--- the FormControl called "name"
      rdv_unit: ['0', Validators.required ], // <--- the FormControl called "name"
    });
  }

  ngOnInit(): void {
    this.responseStatus = responseStatus;
  }

  onSubmit() {
    console.log("submit form response");
    this.showLoading()

    this.prepareUpdateConsultation();
    this.consultationService.update(this.consultation).then(consultation => {
      this.consultation = consultation;
      this.loading.dismiss();

    });
    //console.log("form submitted" + this.consultation.id);
  }

  prepareUpdateConsultation(){
    const formModel = this.responseForm.value;
    this.consultation.response = formModel.response;
    this.consultation.treatment = formModel.treatment;

    if(formModel.status == 0) this.consultation.rdvStatus = formModel.status;
    else {
        this.consultation.rdvStatus = formModel.rdv_number;
        this.consultation.rdvUnit = formModel.rdv_unit;
    }
    this.consultation.xchangeStatus = 1;
    console.log("prepareUpdateConsultation" + JSON.stringify(this.consultation));

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

}
