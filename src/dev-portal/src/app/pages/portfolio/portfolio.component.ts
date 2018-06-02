import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../../core/services/window.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  public currentView = 0;
  public localizeNavbarToTop = false;
  private navBarInitialOffsetY = 0;

  @ViewChild("AboutMe", {read: ElementRef}) private AboutMe: ElementRef;
  @ViewChild("Skills", {read: ElementRef}) private Skills: ElementRef;
  @ViewChild("Experience", {read: ElementRef}) private Experience: ElementRef;
  @ViewChild("Projects", {read: ElementRef}) private Projects: ElementRef;
  @ViewChild("ContactMe", {read: ElementRef}) private ContactMe: ElementRef;

  @ViewChild("NavBar", {read: ElementRef}) private NavBar: ElementRef;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const scrollY = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (scrollY >= this.ContactMe.nativeElement.offsetTop - 400) {
      this.currentView = 5;
    } else if (scrollY >= this.Projects.nativeElement.offsetTop - 200) {
      this.currentView = 4;
    } else if (scrollY >= this.Experience.nativeElement.offsetTop - 200) {
      this.currentView = 3;
    } else if (scrollY >= this.Skills.nativeElement.offsetTop - 200) {
      this.currentView = 2;
    } else if (scrollY >= this.AboutMe.nativeElement.offsetTop - 200) {
      this.currentView = 1;
    } else {
      this.currentView = 0;
    }

    if (!this.localizeNavbarToTop) {
      this.navBarInitialOffsetY = this.NavBar.nativeElement.offsetTop;
    }
    if (scrollY > this.AboutMe.nativeElement.offsetTop) {
      this.localizeNavbarToTop = true;
    } else {
      this.localizeNavbarToTop = false;
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public scroll(element) {
    element.scrollIntoView({behavior: "smooth", block: "start"});
  }

}
