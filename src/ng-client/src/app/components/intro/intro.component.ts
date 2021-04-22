import { trigger, transition, style, animate, state } from '@angular/animations';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

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
  $profile: Observable<any>;
  columnCount = 4;

  constructor(private dataService: DataService) { }
 
  ngOnInit() {
    this.columnCount = (window.innerWidth <= 400) ? 2 : 4;
    console.log(this.columnCount);
    this.$profile = this.dataService.createCollection('profile');
  }


  state: string = "hidden";
  init = true;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event) {
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.6) {
      this.state = "show";
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y >= window.innerHeight) {
      this.state = "hidden";
    }
  }

  onResize(event) {
    console.log(this.columnCount);
    this.columnCount = (event.target.innerWidth <= 400) ? 2 : 4;
  }
}