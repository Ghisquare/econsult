import { Component, Input } from '@angular/core';

import {Message} from "../../app/model/message";

import {afficheDate} from "../../app/functions";
import {Consultation} from "../../app/model/consultation";


@Component({
  selector: 'message-list',
  templateUrl: 'message-list.html'
})
export class MessageListComponent {
  @Input() messages: Message[];

  constructor() {
    console.log("MessageListConstruct");
  }

  afficheDate(ts: number) {
    return afficheDate(ts);
  }
}
