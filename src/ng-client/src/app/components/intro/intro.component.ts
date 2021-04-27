import { trigger, transition, style, animate, state } from '@angular/animations';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import * as $ from "jquery"
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [
    trigger('fade', [
      state("hidden", style({opacity: 0})),
      transition('hidden => show', [
        style({ opacity: 0, top: '100px' }),
        animate(700, style({ opacity: 1, top: '0px' }))
      ]),
      transition('show => hidden',[
        style({opacity: 0, top: '100px'})
      ]),
    ])
  ]
})
export class IntroComponent implements OnInit {
  @ViewChild("Intro", { read: ElementRef }) this_component: ElementRef;
  @ViewChild("IntroImageContainer", { read: ElementRef }) this_image_component: ElementRef;
  $profile: Observable<any>;
  columnCount = 3;
  imageColumns = 2;
  rowHeight = 100;
  titleRowSpan = 4;

  constructor(private dataService: DataService) { }
 
  ngOnInit() {
    this.$profile = this.dataService.createCollection('profile');
  }

  ngAfterViewInit() {
    console.log(this.this_image_component);
    this.setColumnCount();
    setTimeout(() => {
      this.setImageSize()
    });
  }

  state: string = "hidden";
  init = true;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event) {
    console.log(this.this_component.nativeElement.getBoundingClientRect().y)
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.6) {
      this.state = "show";
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y >= window.innerHeight) {
      this.state = "hidden";
    }
  }

  onResize(event) {
    this.setColumnCount();
    this.setImageSize();
  }

  setColumnCount() {
    if (window.innerWidth <= 750) {
      this.columnCount = 1;
      this.imageColumns = 1;
      this.titleRowSpan = 2;
    } else {
      this.columnCount = 3;
      this.imageColumns = 2;
      this.titleRowSpan = 4;
    }
  }

  setImageSize() {
    console.log(this.this_image_component.nativeElement.getBoundingClientRect().width / 4.0);
    this.rowHeight = this.this_image_component.nativeElement.getBoundingClientRect().width / 4.0;
  }
}