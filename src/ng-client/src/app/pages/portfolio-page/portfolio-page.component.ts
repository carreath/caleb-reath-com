import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from 'src/app/services/theming.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { trigger, state, style } from '@angular/animations';
import * as $ from "jquery"
import { IntroComponent } from 'src/app/components/intro/intro.component';
import { EducationComponent } from 'src/app/components/education/education.component';
import { ProjectsListComponent } from 'src/app/components/projects-list/projects-list.component';
import { SkillsListComponent } from 'src/app/components/skills-list/skills-list.component';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';
import { ToolsListComponent } from 'src/app/components/tools-list/tools-list.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HomeComponent } from 'src/app/components/home/home.component';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss'],
  animations: [
    trigger('header_trigger', [
      state('relative', style({
        position: "absolute",
        top: '83.3%'
      })),
      state('reactive-relative', style({
        position: "absolute",
        top: '100%'
      })),
      state('sticky', style({
        position: "fixed",
        top: "0%"
      }))
    ])
  ]
})
export class PortfolioPageComponent implements OnInit {
  @HostBinding('class') public cssClass: string;

  component_list = [];
  @ViewChild(HomeComponent) home_component: HomeComponent;
  @ViewChild(HeaderComponent) header_component: HeaderComponent;
  @ViewChild(IntroComponent) intro_component: ElementRef;
  @ViewChild(EducationComponent) education_component: ElementRef;
  @ViewChild(ProjectsListComponent) projects_component: ElementRef;
  @ViewChild(SkillsListComponent) skills_component: ElementRef;
  
  themingSubscription: Subscription;
  themes: string[];
  state: string = "unlocked";
  headerTop = '100%';

  constructor(
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit() {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
  }  

  ngAfterViewInit() {
    setTimeout(() => this.component_list = [
      this.intro_component,
      this.education_component,
      this.projects_component,
      this.skills_component
    ]);
  }

  changeTheme(theme: string) {
    this.themingService.theme.next(theme);
  }
  @HostListener('window:scroll', ['$event']) 
  doSomething(event) {
    if (window.innerWidth <= 1200 && window.pageYOffset >= this.home_component.this_component.nativeElement.getBoundingClientRect().height) {
      this.state = "sticky"
    } else if (window.innerWidth > 1200 && window.pageYOffset >= this.home_component.this_component.nativeElement.getBoundingClientRect().height - window.innerHeight / 6) {
      this.state = "sticky"
      this.headerTop = (window.innerHeight - 330) / 2 + ' !important';
    } else {
      if (window.innerWidth <= 1200) {
        this.state = 'reactive-relative';
      } else {
        this.state = "relative"
      }
      this.headerTop = '100%';
    }
  }

  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }

    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  scrollTo(link) {
    console.log(document)
    document.getElementById(link).scrollIntoView();
  }
}
