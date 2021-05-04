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
        style({ opacity: 0, transform: 'translate(0px, 100px)' }),
        animate(300, style({ opacity: 1, transform: 'translate(0px)' }))
      ]),
      transition('show => hidden',[
        style({opacity: 0, transform: 'translate(0px, 100px)'})
      ]),
    ])
  ]
})
export class IntroComponent implements OnInit {
  @ViewChild("Intro", { read: ElementRef }) this_component: ElementRef;
  @ViewChild("IntroBody", { read: ElementRef }) this_body_component: ElementRef;
  @ViewChild("IntroImageContainer", { read: ElementRef }) this_image_component: ElementRef;
  $profile: Observable<any>;
  columnCount = 3;
  imageColumns = 2;
  rowHeight = 100;
  titleRowSpan = 4;
  bodyRowSpan = 1;

  constructor(private dataService: DataService) { }
 
  ngOnInit() {
    this.$profile = this.dataService.createCollection('profile');
    setTimeout(() => {
      this.onResize(null);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onResize(null);
    });
  }

  state: string = "hidden";
  init = true;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event) {
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.7) {
      console.log("show");
      this.state = "show";
      this.fadeInRow();
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y > window.innerHeight) {
      console.log("hide");
      this.state = "hidden";
      this.introStates.forEach((project) => {
        project.state = "hidden";
      })
    }
  }

  introStates = [
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"}
  ]

  getState(index) {
    return this.introStates[index].state;
  }

  fadeInRow() {
    setTimeout(() => {this.introStates[0].state = "show"});
    setTimeout(() => {this.introStates[1].state = "show"}, 100);
    setTimeout(() => {this.introStates[2].state = "show"}, 200);
  }

  onResize(event) {
    console.log(this.rowHeight)
    this.setImageSize();
    console.log(this.rowHeight)
    this.setColumnCount();
    console.log(this.rowHeight)
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

    console.log(this.this_body_component.nativeElement.getBoundingClientRect().height)
    console.log(this.rowHeight)
    console.log(Math.ceil(this.this_body_component.nativeElement.getBoundingClientRect().height / this.rowHeight))
    this.bodyRowSpan = Math.ceil(this.this_body_component.nativeElement.getBoundingClientRect().height / this.rowHeight);
  }

  setImageSize() {
    this.rowHeight = this.this_image_component.nativeElement.getBoundingClientRect().width / 4.0;
  }
}