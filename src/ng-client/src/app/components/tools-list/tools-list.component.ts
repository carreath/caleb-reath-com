import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss'],
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
export class ToolsListComponent implements OnInit {

  $tools: Observable<any>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.$tools = this.dataService.createCollection('tools-list');
  }

  @ViewChild("Tools", { read: ElementRef }) this_component: ElementRef;

  state: string = "hidden";
  init = true;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event) {
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.8) {
      this.state = "show";
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y > window.innerHeight) {
      this.state = "hidden";
    }
  }
}