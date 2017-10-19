import { Component, OnInit } from '@angular/core';

import { Specialty } from '../app/model/specialty';
import { SpecialtyService } from '../providers/specialty.service';

@Component({
  selector: 'specialty-select',
  templateUrl: 'specialty-select.html'
})
export class SpecialtySelectComponent implements OnInit {
  selectedItem: any;
  icons: string[];
  specialties: Specialty[];
  selectedSpecialty: Specialty;

  constructor(private specialtyService: SpecialtyService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  onSelectSpecialty(specialty: Specialty): void {
    alert('test');
    this.selectedSpecialty = specialty;
    console.log("selectedSpecialty="+this.selectedSpecialty);
  }
  ngOnInit(): void {
    this.specialtyService.getSpecialties().then(specialties => this.specialties = specialties);
  }
}
