import { trigger, state, style, transition, animate } from '@angular/animations';
import { HostListener } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
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
export class EducationComponent implements OnInit {
  @ViewChild("Education", { read: ElementRef }) this_component: ElementRef;

  rowHeight = 120;
  reactive_tile_colspan = 1;
  state = 'hidden';

  experience_list = [
    {
      primary_text: "Tarka Labs",
      secondary_text: "Full Stack Web Developer",
      date: "04/2020 – Present",
      location: "Fredericton, NB, CA",
      row_height: "180px",
      ROW_HEIGHT: 180,
      bullet_points: [
        "Contract full-stack developer tasked with designing, implementing, and bug fixing features.",
        "Effectively working from a remote environment since May 2020.",
        "Gaining experience with Ruby on Rails, ReactJS, and MariaDB"
      ]
    },
    {
      primary_text: "The Legislative Assembly of New Brunswick",
      secondary_text: "Co-op Full Stack Web Developer ",
      date: "01/2018 – 05/2019",
      location: "Fredericton, NB, CA",
      row_height: "90px",
      ROW_HEIGHT: 90,
      bullet_points: [
        "Project lead on internal and external web applications."
      ]
    },
    {
      primary_text: "Sprypoint Solutions",
      secondary_text: "Co-op Web Developer",
      date: "05/2017 – 08/2017",
      location: "Charlottetown, PEI, CA",
      row_height: "90px",
      ROW_HEIGHT: 90,
      bullet_points: [
        "Junior developer tasked with refactoring and testing KnockoutJS"
      ]
    },
    {
      primary_text: "Blue Spurs Consulting",
      secondary_text: "Co-op Web Developer",
      date: "09/2016 – 12/2016",
      location: "Fredericton, NB, CA",
      row_height: "130px",
      ROW_HEIGHT: 130,
      bullet_points: [
        "Junior developer tasked with elastic search integration in a client CMS tool using AngularJS "
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.9) {
      console.log("show");
      this.state = "show";
      this.fadeInRow();
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y > window.innerHeight) {
      console.log("hide");
      this.state = "hidden";
      this.educationStates.forEach((project) => {
        project.state = "hidden";
      })
    }
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.setColumnCount();
    });
  }

  educationStates = [
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"}
  ]

  getState(index) {
    return this.educationStates[index].state;
  }

  fadeInRow() {
    setTimeout(() => {this.educationStates[0].state = "show"});
    setTimeout(() => {this.educationStates[1].state = "show"}, 100);
    setTimeout(() => {this.educationStates[2].state = "show"}, 200);
    setTimeout(() => {this.educationStates[3].state = "show"}, 300);
    setTimeout(() => {this.educationStates[4].state = "show"}, 400);
  }

  onResize(event) {
    this.setColumnCount();
  }

  setColumnCount() {
    console.log(this.experience_list[0].ROW_HEIGHT + 60 + "px")
    if (window.innerWidth <= 450) {
      this.reactive_tile_colspan = 0;
      this.experience_list.forEach((experience, i) => {
        experience.row_height = experience.ROW_HEIGHT + 10 + "px";
      });
    } else if (window.innerWidth <= 550) {
      this.reactive_tile_colspan = 0;
      this.experience_list.forEach((experience, i) => {
        experience.row_height = experience.ROW_HEIGHT + 40 + "px";
      });
    } else if (window.innerWidth <= 700) {
      this.experience_list.forEach((experience, i) => {
        experience.row_height = experience.ROW_HEIGHT + 20 + "px";
      });
    } else {
      this.experience_list.forEach((experience, i) => {
        experience.row_height = experience.ROW_HEIGHT + "px";
      });
    }
  }
}
