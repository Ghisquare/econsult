import {Component, Input} from '@angular/core';
import {Consultation} from "./model/consultation";

@Component({
  selector: 'consultation-detail',
  templateUrl: 'consultation-detail.html'
})
export class ConsultationDetailComponent {
  @Input() consultation: Consultation;
}
