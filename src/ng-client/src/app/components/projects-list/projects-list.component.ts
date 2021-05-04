import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';

import anime from 'animejs/lib/anime.es';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
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
    ]),
    trigger('spin', [
      state('default', style({
        transform: 'rotateZ(0deg) scale(1)',
      })),
      state('spinning', style({
        transform: "rotateZ(0deg)",
        "animation-iteration-count": "infinite"
      })),
      transition('* <=> *', [
        animate('2000ms', keyframes([
          style({
            transform: 'rotateZ(0deg)', offset: 0
          }),
          style({
            transform: 'rotateZ(-360deg)', offset: 1.0
          })
        ]))]
      )
    ]),
    trigger('shrink', [
      state('default', style({
        transform: 'scale(1)',
      })),
      state("shrink", style({
        transform: 'scale(0)',
      })),
      transition('default => shrink', [
        style({
          transform: 'scale(1)'
        }),
        animate(1000, style({
          transform: 'scale(0)'
        }))
      ]),
      transition('shrink => default', [
        style({
          transform: 'scale(0)'
        }),
        animate(1000, style({
          transform: 'scale(1)'
        }))
      ])
    ])
  ]
})
export class ProjectsListComponent implements OnInit {
  textFadeState = "hidden";

  _state: string = 'spin';
  _shrinkState: string = "default"

  animationContainerTimeline = null;
  animationGroupTimeline = null;
  animationItemTimelines = [];

  projects: {
    name: string,
    subtitle: string,
    image: string,
    description: string,
    url: string
  }[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.projects.push({
      name: "Poker Squares AI Player",
      subtitle: "Java",
      image: "AI_white.png",
      description: "This poker squares AI was developed by myself for CS4725: Introduction to AI. I was very pleased with my results on this project. I was able to consistently score over 45 points in the British scoring system. And my AI came 2nd in the class.",
      url: "https://github.com/carreath/Poker-Squares-AI"
    }, {
      name: "Personal Portfolio",
      subtitle: "Angular 11 / Firebase / GCP",
      image: "portfolio.png",
      description: "My personal portfolio website is a project I have created to develop my skills in full stack web design. It is also designed to introduce myself and who I am. I made it using my preferred web framework Angular 11 and I am hosting it using services provided by Google Cloud and Firebase. ",
      url: "https://github.com/carreath/caleb-reath-com"
    }, {
      name: "Unity Ball Maze",
      subtitle: "C# / Unity",
      image: "BallMaze.png",
      description: "I was part of a team of 4 students on this project. We had to create a game with a cohesive story and balanced gameplay. We settled on a ball maze for its simplicity and freedom of creativity. The game runs entirely on scripts in Unity.",
      url: "https://github.com/carreath/CS2053-Unity-BallMaze"
    }, {
      name: "ByteChat",
      subtitle: "Java",
      image: "ByteChat.png",
      description: "A multi-threaded java chat program using sockets. I made this project to further dive deeper into internet architecture and practice working with and building my own communication software",
      url: "https://github.com/carreath/ByteChat-Client"
    }, {
      name: "Kattis Solutions",
      subtitle: "Java / Python / C",
      image: "Kattis.png",
      description: "I like to practice on Kattis because of how simple and easy the judging software is made. It is quite relaxing and fun to complete these complicated questions but it is also good practice and a nice way to continuously hone my ability to make scalable resource concious programs.",
      url: "https://github.com/carreath/Kattis"
    }, {
      name: "Jumpy Husky",
      subtitle: "Java",
      image: "Husky.png",
      description: "This game is the 8th iteration of my flappy bird clones. I never posted them anywhere as they were not intended to be games rather they were made to test my skills throughout high school and finally at the end of my first year of University, I can lay this projct to bed as it has done everything and more that I had intended for it.",
      url: "https://github.com/carreath/JumpyHusky"
    });
  }

  @ViewChild("Projects", { read: ElementRef }) this_component: ElementRef;

  state: string = "hidden";
  init = true;
  rowHeight = 500;
  projectCardStyles = {}
  animationStyles = {}
  columnCount = 3;
  descriptionHeight = {
    'height': '200px'
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y > window.innerHeight) {
      console.log("hide");
      this.state = "hidden";
      this.projectStates.forEach((project) => {
        project.state = "hidden";
      })
    }
    let root = this;
    $('.project-container').each(function(index, el ){
      if (root.projectStates[index].state == 'hidden' && el.getBoundingClientRect().top - window.innerHeight * 0.9 <= 0) {
        root.state = "show";
        root.fadeInRow(index);
      }
    });
  }

  onResize(event) {
    this.setColumnCount();

    let size = ((this.this_component.nativeElement.getBoundingClientRect().width - 40) / this.columnCount) - 20;
    this.projectCardStyles = {
      'min-width': size + "px",
      'min-height': size + "px",
      'max-width': size + "px",
      'max-height': size + "px",
      'margin': "auto",
      'font-size': 2 / this.columnCount + "em"
    }

    let animWidth = size - 40;
    if (animWidth > 280) {
      animWidth = 280;
    }

    this.animationStyles = {
      'width': "68px",
      'height': animWidth + "px",
      'min-width': "68px",
      'min-height': animWidth + "px",
      'max-width': "68px",
      'max-height': animWidth + "px",
      'margin': ((size - 40 - animWidth) / 2) + "px auto",
      'font-size': "1em"
    }

    this.descriptionHeight = {
      'height': this.rowHeight - size - 100 + 'px'
    }
  }

  setColumnCount() {
    if (window.innerWidth <= 275) {
      this.columnCount = 1;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 2;
    } else if (window.innerWidth <= 300) {
      this.columnCount = 1;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 1.7;
    } else if (window.innerWidth <= 340) {
      this.columnCount = 1;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 1.6;
    } else if (window.innerWidth <= 370) {
      this.columnCount = 1;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 1.48;
    } else if (window.innerWidth <= 500) {
      this.columnCount = 1;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 1.38;
    } else if (window.innerWidth <= 720) {
      this.columnCount = 1;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 1.25;
    } else if (window.innerWidth <= 1080) {
      this.columnCount = 2;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 0.75;
    } else if (window.innerWidth <= 1250) {
      this.columnCount = 2;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 0.67;
    } else if (window.innerWidth <= 1500) {
      this.columnCount = 2;
      this.rowHeight = this.this_component.nativeElement.getBoundingClientRect().width * 0.8;
    } else if (window.innerWidth <= 1920) {
      this.columnCount = 3;
      this.rowHeight = 550;
    } else {
      this.columnCount = 3;
      this.rowHeight = 600;
    }
  }

  ngAfterViewInit(): void {
    this.startAll()
    setTimeout(this.onResize.bind(this));
  }

  startSpinAnimation(duration = 1000, easeFunction = "spring(1, 80, 10, 0)") {
    this.stopAnimationContainerAndChildren();

    this.animationContainerSpin(duration, easeFunction);
    this.animationGroupSpin(duration, easeFunction);
    this.animationItemSpin();
  }

  stopAnimationContainerAndChildren() {
    this.animationContainerTimeline?.pause();
    this.animationGroupTimeline?.pause();
    this.animationItemTimelines.forEach(itemTimeline => {
      itemTimeline?.pause();
    });
  }

  get spinState() {
    return this._state;
  }
  get shrinkState() {
    return this._shrinkState;
  }

  shrink() {
    this._shrinkState = "shrink";
  }

  shrinkDone(colour) {

  }

  projectStates = [
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"},
    {state: "hidden"}
  ]

  getState(index) {
    return this.projectStates[index].state;
  }

  fadeInRow(row) {
    switch (row) {
      case 5: setTimeout(() => {this.projectStates[5].state = "show"});
      case 4: setTimeout(() => {this.projectStates[4].state = "show"});
      case 3: setTimeout(() => {this.projectStates[3].state = "show"});
      case 2: setTimeout(() => {this.projectStates[2].state = "show"});
      case 1: setTimeout(() => {this.projectStates[1].state = "show"});
      case 0: setTimeout(() => {this.projectStates[0].state = "show"});
    }
  }

  startAll() {
    this.startSpinAnimation();
  }

  animationContainerSpin(duration, easeFunction) {
    let size = ((this.this_component.nativeElement.getBoundingClientRect().width - 40) / this.columnCount) - 20;
    
    let animWidth = size / 1.5
    if (size / 1.5 < 160) {
      animWidth = size - 20;
    }

    this.animationContainerTimeline = anime.timeline({ loop: true })
      .add({
        targets: '.animation-container',
        rotateZ: [anime.stagger([120, 360]), anime.stagger([240, 480])],
        duration: duration,
        easing: easeFunction
      }).add({
        targets: '.animation-container',
        rotateZ: [anime.stagger([240, 480]), anime.stagger([360, 600])],
        duration: duration,
        easing: easeFunction
      }).add({
        targets: '.animation-container',
        rotateZ: [anime.stagger([360, 600]), anime.stagger([480, 720])],
        duration: duration,
        easing: easeFunction
      });
  }

  animationGroupSpin(duration, easeFunction) {
    this.animationGroupTimeline = anime.timeline({ loop: true })
      .add({
        targets: '.animation-group',
        rotateZ: [anime.stagger([-120, -360]), anime.stagger([-240, -480])],
        duration: duration,
        easing: easeFunction
      }).add({
        targets: '.animation-group',
        rotateZ: [anime.stagger([-240, -480]), anime.stagger([-360, -600])],
        duration: duration,
        easing: easeFunction
      }).add({
        targets: '.animation-group',
        rotateZ: [anime.stagger([-360, -600]), anime.stagger([-480, -720])],
        duration: duration,
        easing: easeFunction
      });
  }

  animationItemSpin() {
    this.animationItemTimelines[0] = anime.timeline({ loop: true })
      .add({
        targets: '.animation-item-1',
        duration: 1000,
        easing: 'easeInOutSine',
        rotateZ: '-1turn'
      }).add({
        targets: '.animation-item-1',
        duration: 665,
        easing: 'linear'
      }).add({
        targets: '.animation-item-1',
        duration: 1000,
        easing: 'easeInOutSine',
        rotateZ: '0turn'
      }).add({
        targets: '.animation-item-1',
        duration: 665,
        easing: 'linear'
      });

    this.animationItemTimelines[1] = anime.timeline({ loop: true })
      .add({
        targets: '.animation-item-2',
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)',
        rotateZ: '1turn'
      }).add({
        targets: '.animation-item-2',
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)',
        rotateZ: '0turn'
      });

    this.animationItemTimelines[2] = anime.timeline({ loop: true })
      .add({
        targets: '.animation-item-3',
        rotateZ: [0, -60],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [-60, 45],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [45, -15],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [-15, 0],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [0, 0],
        duration: 665,
        easing: 'linear'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [0, 60],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [60, -45],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [-45, 15],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [15, 0],
        duration: 250,
        easing: 'easeInOutSine'
      }).add({
        targets: '.animation-item-3',
        rotateZ: [0, 0],
        duration: 665,
        easing: 'linear'
      });
  }
}