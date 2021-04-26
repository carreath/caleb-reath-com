import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemingService } from 'src/app/services/theming.service';
import { IntroComponent } from '../intro/intro.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('header_trigger', [
      state('relative', style({
        position: "absolute",
        top: "50%"
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
    ]),
    trigger('navigation', [
      state('relative', style({
      })),
      state('sticky', style({
      }))
    ]),
    trigger('fade', [
      state("hidden", style({opacity: 0})),
      transition('hidden => show', [
        style({ opacity: 0, top: '100px' }),
        animate(300, style({ opacity: 1, top: '0px' }))
      ]),
      transition('show => hidden',[
        style({opacity: 0, top: '100px'})
      ]),
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @Input() component_list;

  themingSubscription: Subscription;
  isLight = true;
  state: string = "unlocked";
  options: FormGroup;
  nav = 0;

  links = [
    {title: "Intro", state: "hidden"},
    {title: "Education", state: "hidden"},
    {title: "Projects", state: "hidden"},
    {title: "Skills", state: "hidden"},
    {title: "Tools", state: "hidden"},
    {title: "Contact Me", state: "hidden"},
  ]
  @Output() scrollToComponent: EventEmitter<string> = new EventEmitter();

  scrollTo(index) {
    const element = this.component_list[index].this_component.nativeElement;
    const yOffset = -element.getBoundingClientRect().height / 6; 
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
  }

  ngOnInit() {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      console.log(theme)
      this.isLight = theme === "light-theme";
    });
  }

  constructor(private themingService: ThemingService, fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  getState(index) {
    return this.links[index].state;
  }

  @HostListener('window:scroll', ['$event']) 
  doSomething(event) {
    this.nav = -1;
    this.component_list.forEach(component => {
      if (component.this_component.nativeElement.getBoundingClientRect().top - window.innerHeight / 6 <= 0) {
        this.nav++;
      }
    });

    if (window.pageYOffset >= window.innerHeight * 0.5) {
      this.state = "sticky"
    } else {
      this.state = "relative"
    }

    if (this.links[0].state === "hidden" && this.component_list[0].this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.6) {
      this.fadeIn();
    } else if (this.links[0].state === "show" && this.component_list[0].this_component.nativeElement.getBoundingClientRect().y >= window.innerHeight) {
      this.links.forEach((link) => {
        link.state = "hidden";
      })
    }
  }

  fadeIn() {
    this.links[0].state = "show";
    setTimeout(() => {this.links[1].state = "show"}, 100);
    setTimeout(() => {this.links[2].state = "show"}, 200);
    setTimeout(() => {this.links[3].state = "show"}, 300);
    setTimeout(() => {this.links[4].state = "show"}, 400);
    setTimeout(() => {this.links[5].state = "show"}, 500);
  }
}