import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemingService } from 'src/app/services/theming.service';

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
    ]),
    trigger('navigation', [
      state('relative', style({
      })),
      state('sticky', style({
      }))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  themingSubscription: Subscription;
  isLight = true;
  state: string = "unlocked";
  options: FormGroup;
  nav = 0;

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
  @HostListener('window:scroll', ['$event']) 
  doSomething(event) {
    this.nav = 0;
    if (window.pageYOffset > window.innerHeight + 600) {
      this.nav = 1;
    }
    if (window.pageYOffset > window.innerHeight + 800) {
      this.nav = 2;
    }
    if (window.pageYOffset > window.innerHeight + 1000) {
      this.nav = 3;
    }
    if (window.pageYOffset > window.innerHeight + 1200) {
      this.nav = 4;
    }

    if (window.pageYOffset >= window.innerHeight) {
      this.state = "sticky"
    } else {
      this.state = "relative"
    }
  }
}