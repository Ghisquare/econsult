import {Component, Input, OnInit} from '@angular/core';

import {afficheDate, responseStatus} from "../../app/functions";
import {Consultation} from "../../app/model/consultation";
import {ConsultationService} from "../../providers/consultation.service";


@Component({
  selector: 'response-resume',
  templateUrl: 'response-resume.html'
})
export class ResponseResumeComponent implements OnInit{
  @Input() consultation: Consultation;
  @Input() own: boolean = false;

  statusText: string;


  constructor(private consultationService: ConsultationService) {
  }

  ngOnInit(){
    if(this.consultation.rdvStatus == 0) {
      this.statusText = responseStatus[this.consultation.rdvStatus];
    } else {
      this.statusText = responseStatus[1] + " " + this.consultation.rdvStatus + " " + this.consultationService.getTimeUnit(this.consultation.rdvUnit);
    }
  }

  afficheDate(ts: number) {
    return afficheDate(ts);
  }
}
