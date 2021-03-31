import { animate, state, style, transition, trigger } from '@angular/animations';
import { HostListener } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Skill } from 'src/app/interfaces/skill.interface';
import { SKILLS } from './skills';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.scss'],
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
export class SkillsListComponent implements OnInit {
  constructor(
    private titleService: Title, 
    private metaTagService: Meta
  ) { }

  title = "List of skills";

  skills = SKILLS;

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: "skills",
      content: "andrewbateman.org",
    });
  }

  trackByFn(index: number, skill: Skill): number {
    return skill.id;
  }
  
  @ViewChild("Skills", { read: ElementRef }) this_component: ElementRef;

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