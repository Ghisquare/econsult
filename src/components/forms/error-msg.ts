import { Component, Input } from '@angular/core';



@Component({
  selector: 'error-msg',
  templateUrl: 'error-msg.html'
})
export class ErrorMsgComponent {
  @Input() text: String[];

  constructor() {
  }

}
