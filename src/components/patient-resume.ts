///<reference path="../app/functions.ts"/>
import { Component, OnInit, Input } from '@angular/core';


import {Patient} from "../app/model/patient";
import {age, sexText} from "../app/functions";


@Component({
  selector: 'patient-resume',
  templateUrl: 'patient-resume.html'
})
export class PatientResumeComponent implements OnInit {
  @Input() patient: Patient;
//  @Input() question: boolean = true;
//  @Input() response: boolean = false;

  sexText: string;
  age: number;

  constructor() {
  }

  ngOnInit(): void {
 //   this.userService.getUsersBySpecialty(this.specialty.id).then(users => this.contacts = users);
 //   console.log("c-select.OnInit" + this.specialty.id);
    console.log("PatientResume Init:" + this.patient.id);
    this.sexText = sexText(this.patient.sex);
    this.age = age(this.patient.birthdate);
  }
}
