import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {
  constructor(@Inject(DOCUMENT) document) {
  }

  ngOnInit(): void {
  }

  scrollTo(link) {
    console.log(document)
    document.getElementById(link).scrollIntoView();
  }
}
