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
        style({ opacity: 0, transform: 'translate(0px, 100px)' }),
        animate(300, style({ opacity: 1, transform: 'translate(0px)' }))
      ]),
      transition('show => hidden',[
        style({opacity: 0, transform: 'translate(0px, 100px)'})
      ]),
    ])
  ]
})
export class SkillsListComponent implements OnInit {
  constructor(
    private metaTagService: Meta
  ) { }
  rowHeight = 250;
  columnCount = 3;

  containerStates = [
    {
      state: "hidden",
      skillStates: [
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"}
      ]
    },
    {
      state: "hidden",
      skillStates: [
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"}
      ]
    },
    {
      state: "hidden",
      skillStates: [
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"}
      ]
    },
    {
      state: "hidden",
      skillStates: [
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"}
      ]
    },
    {
      state: "hidden",
      skillStates: [
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"}
      ]
    },
    {
      state: "hidden",
      skillStates: [
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"},
        {state: "hidden"}
      ]
    },
  ]

  skillGroups = [
    {
      title: "Programming Languages",
      skills: [{
        title: "TypeScript",
        content: ""
      },{
        title: "Java",
        content: ""
      },{
        title: "Ruby",
        content: ""
      },{
        title: "C#",
        content: ""
      },{
        title: "Python",
        content: ""
      }]
    },
    {
      title: "Frameworks",
      skills: [{
        title: "Angular 11",
        content: ""
      },{
        title: "Ruby on Rails",
        content: ""
      },{
        title: "Flask",
        content: ""
      },{
        title: "ASP.NET",
        content: ""
      },{
        title: "Node.js / JQuery",
        content: ""
      }]
    },
    {
      title: "Tools",
      skills: [{
        title: "npm",
        content: ""
      },{
        title: "Git",
        content: ""
      },{
        title: "Azure",
        content: ""
      },{
        title: "CircleCI",
        content: ""
      },{
        title: "Docker",
        content: ""
      }]
    },
    {
      title: "Personal",
      skills: [{
        title: "Critical Thinking",
        content: ""
      },{
        title: "Self Management",
        content: ""
      },{
        title: "Attention to Detail",
        content: ""
      },{
        title: "Self Motivated",
        content: ""
      },{
        title: "Dependable",
        content: ""
      }]
    },
    {
      title: "Work",
      skills: [{
        title: "Eager to Learn",
        content: ""
      },{
        title: "Team Player",
        content: ""
      },{
        title: "Positive Attitude",
        content: ""
      },{
        title: "Flexible and Adaptive",
        content: ""
      },{
        title: "Collaborative",
        content: ""
      }]
    },
    {
      title: "Hobbies",
      skills: [{
        title: "Scuba Diving",
        content: ""
      },{
        title: "Sailing",
        content: ""
      },{
        title: "Weight Lifting",
        content: ""
      },{
        title: "Astronomy",
        content: ""
      },{
        title: "Programming",
        content: ""
      }]
    },
  ];

  ngOnInit(): void {
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
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.7) {
      this.state = "show";
      this.fadeInContainers()
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y > window.innerHeight) {
      this.state = "hidden";
      this.containerStates.forEach((container) => {
        container.state = "hidden";
        container.skillStates.forEach((skill) => {
          skill.state = "hidden";
        })
      })
    }
  }

  getContainerState(containerIndex) {
    return this.containerStates[containerIndex].state;
  }

  getSkillState(containerIndex, skillIndex) {
    return this.containerStates[containerIndex].skillStates[skillIndex].state;
  }

  fadeInContainers() {
    setTimeout(() => {
      this.containerStates[0].state = "show"
      this.fadeInSkills(0)
    });
    setTimeout(() => {
      this.containerStates[1].state = "show"
      this.fadeInSkills(1)
    }, 100);
    setTimeout(() => {
      this.containerStates[2].state = "show"
      this.fadeInSkills(2)
    }, 200);
    setTimeout(() => {
      this.containerStates[3].state = "show"
      this.fadeInSkills(3)
    }, 300);
    setTimeout(() => {
      this.containerStates[4].state = "show"
      this.fadeInSkills(4)
    }, 400);
    setTimeout(() => {
      this.containerStates[5].state = "show"
      this.fadeInSkills(5)
    }, 500);
  }


  fadeInSkills(containerIndex) {
    setTimeout(() => {this.containerStates[containerIndex].skillStates[0].state = "show"});
    setTimeout(() => {this.containerStates[containerIndex].skillStates[1].state = "show"}, 100);
    setTimeout(() => {this.containerStates[containerIndex].skillStates[2].state = "show"}, 200);
    setTimeout(() => {this.containerStates[containerIndex].skillStates[3].state = "show"}, 300);
    setTimeout(() => {this.containerStates[containerIndex].skillStates[4].state = "show"}, 400);
  }

  onResize(event) {
    this.setColumnCount();
  }

  setColumnCount() {
    console.log(window.innerWidth)
    console.log(this.this_component.nativeElement.getBoundingClientRect())
    if (window.innerWidth <= 460) {
      this.columnCount = 1;
      this.rowHeight = 250;
    } else if (window.innerWidth <= 1350) {
      this.columnCount = 2;
      this.rowHeight = 250;
    } else {
      this.columnCount = 3;
      this.rowHeight = 250;
    }
  }
}