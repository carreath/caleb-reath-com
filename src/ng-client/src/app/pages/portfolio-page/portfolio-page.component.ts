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

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss'],
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
export class PortfolioPageComponent implements OnInit {
  @HostBinding('class') public cssClass: string;

  component_list = [];
  @ViewChild(IntroComponent) intro_component;
  @ViewChild(EducationComponent) education_component: ElementRef;
  @ViewChild(ProjectsListComponent) projects_component: ElementRef;
  @ViewChild(SkillsListComponent) skills_component: ElementRef;
  @ViewChild(ToolsListComponent) tools_component: ElementRef;
  @ViewChild(ContactFormComponent) contact_me_component: ElementRef;
  
  themingSubscription: Subscription;
  themes: string[];
  state: string = "unlocked";

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
    console.log(this.intro_component);
    this.component_list = [
      this.intro_component,
      this.education_component,
      this.projects_component,
      this.skills_component,
      this.tools_component,
      this.contact_me_component
    ];
  }

  changeTheme(theme: string) {
    this.themingService.theme.next(theme);
  }
  @HostListener('window:scroll', ['$event']) 
  doSomething(event) {
    if (window.pageYOffset >= window.innerHeight) {
      this.state = "sticky"
    } else {
      this.state = "relative"
    }

   // $(".fade-item").each(item => {
      //if ($(this).hasClass(""))
    //})
    //console.log()
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
