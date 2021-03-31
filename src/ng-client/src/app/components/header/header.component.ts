import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('header_trigger', [
      state('relative', style({
        position: "absolute",
        top: "100%"
      })),
      state('sticky', style({
        position: "fixed",
        top: "0px"
      }))
    ]),
    trigger('header_content_trigger', [
      state('relative', style({
      })),
      state('sticky', style({
      }))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  state: string = "unlocked";
  options: FormGroup;

  links = [
    {title: "About Me", link: "AboutMe"},
    {title: "Projects", link: "Projects"},
    {title: "Skills", link: "Skills"},
    {title: "Tools", link: "Tools"},
    {title: "Contact Me", link: "ContactMe"},
  ]
  @Output() scrollToComponent: EventEmitter<string> = new EventEmitter();

  scrollTo(link) {
    console.log(link)
    this.scrollToComponent.emit(link);
  }
  import anime from 'animejs/lib/anime.es';
  ngOnInit() {}

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }
  @HostListener('window:scroll', ['$event']) 
  doSomething(event) {
    if (window.pageYOffset >= window.innerHeight) {
      this.state = "sticky"
    } else {
      this.state = "relative"
    }
  }
}