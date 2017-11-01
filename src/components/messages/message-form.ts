import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


import {Message} from "../../app/model/message";
import {Consultation} from "../../app/model/consultation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConsultationService} from "../../providers/consultation.service";
import {Loading, LoadingController} from "ionic-angular";
import {MessageService} from "../../providers/message.service";


@Component({
  selector: 'message-form',
  templateUrl: 'message-form.html'
})
export class MessageFormComponent implements OnInit {
  @Input() consultation: Consultation;
  @Input() consulted: boolean;
  @Input() demand: boolean = true;

  @Output() outputMessage = new EventEmitter<Message>();
  loading: Loading;
  msg: Message;
  private msgForm: FormGroup;
  titreForm: string;
//  @Input() question: boolean = true;
//  @Input() response: boolean = false;


  constructor(private fb: FormBuilder, private consultationService: ConsultationService, private loadingCtrl: LoadingController, private messageService: MessageService) {
    this.createForm();
  }

  createForm() {
    this.msgForm = this.fb.group({
      message: ['', Validators.required ],
    });
  }

  ngOnInit(): void {
    console.log("msg-form construct ID " + this.consultation.id + "consulted = " + this.consulted);
    if(this.demand) {
      this.titreForm = "Demande d'info complémentaire";
    } else {
      this.titreForm = "Votre réponse";
    }
  }

  prepareSaveMessage() {

    const formModel = this.msgForm.value;

    this.msg = new Message();
    this.msg.content = formModel.message;
    this.msg.date = Date.now();
    this.consultation.date_modified = this.msg.date;
    this.msg.consultation_id = this.consultation.id;
    if(this.consulted) {
      if(this.demand) this.consultation.xchangeStatus = 1; else this.consultation.xchangeStatus = 3; // status consultation pending, waiting for info response
      this.msg.author_id = this.consultation.contact_id;
      this.msg.author = this.consultation.contact;
      this.msg.to_id = this.consultation.author_id;
      this.msg.to = this.consultation.author;
    } else {
      if(this.demand) this.consultation.xchangeStatus = 2; else this.consultation.xchangeStatus = 0;// status message sent to consulted waiting for answer
      this.msg.author_id = this.consultation.author_id;
      this.msg.author = this.consultation.author;
      this.msg.to_id = this.consultation.contact_id;
      this.msg.to = this.consultation.contact;
    }
  }

  closeMessage() {
    this.outputMessage.emit(null);
  }

  onSubmit(){
    this.showLoading()

    this.prepareSaveMessage();
    this.consultationService.update(this.consultation).then(consultation => {
      this.messageService.createMessage(this.msg).then(message => {
        this.msg = message;

        this.loading.dismiss();

      });

    });
    this.outputMessage.emit(this.msg);

    //console.log("form submitted" + this.consultation.id);

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }
}
