import { trigger, transition, style, animate, state } from '@angular/animations';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    trigger('fade', [
      state("hidden", style({opacity: 0})),
      transition('hidden => show', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('show => hidden',[
        style({opacity: 0})
      ]),
    ])
  ]
})
export class AboutMeComponent implements OnInit {

  $profile: Observable<any>;
  columnCount = 4;

  constructor(private dataService: DataService) { }
 
  ngOnInit() {
    this.columnCount = (window.innerWidth <= 400) ? 2 : 6;
    console.log(this.columnCount);
    this.$profile = this.dataService.createCollection('profile');
  }

  @ViewChild("AboutMe", { read: ElementRef }) this_component: ElementRef;

  state: string = "hidden";
  init = true;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event) {
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.8) {
      this.state = "show";
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y >= window.innerHeight) {
      this.state = "hidden";
    }
  }

  onResize(event) {
    console.log(this.columnCount);
    this.columnCount = (event.target.innerWidth <= 400) ? 2 : 6;
  }
}