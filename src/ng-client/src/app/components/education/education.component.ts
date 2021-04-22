import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  @ViewChild("Education", { read: ElementRef }) this_component: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
