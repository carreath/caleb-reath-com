import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('show => hidden',[
        style({opacity: 0})
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
      transition('shrink => default',[
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
      name: "My Personal Portfolio Website",
      subtitle: "Made with Angular 11, Google Cloud, and Firebase",
      image: "",
      description: "My personal portfolio website is a project I have created to develop and display my skills to anyone who visits. I made it using my preferred web framework Angular 11 and I am hosting it using services provided by Google Cloud and Firebase. ",
      url: "https://github.com/carreath/caleb-reath-com"
    },{
      name: "My Personal Portfolio Website",
      subtitle: "Made with Angular 11, Google Cloud, and Firebase",
      image: "avatar.png",
      description: "My personal portfolio website is a project I have created to develop and display my skills to anyone who visits. I made it using my preferred web framework Angular 11 and I am hosting it using services provided by Google Cloud and Firebase. ",
      url: "https://github.com/carreath/caleb-reath-com"
    },{
      name: "My Personal Portfolio Website",
      subtitle: "Made with Angular 11, Google Cloud, and Firebase",
      image: "avatar.png",
      description: "My personal portfolio website is a project I have created to develop and display my skills to anyone who visits. I made it using my preferred web framework Angular 11 and I am hosting it using services provided by Google Cloud and Firebase. ",
      url: "https://github.com/carreath/caleb-reath-com"
    },{
      name: "My Personal Portfolio Website",
      subtitle: "Made with Angular 11, Google Cloud, and Firebase",
      image: "avatar.png",
      description: "My personal portfolio website is a project I have created to develop and display my skills to anyone who visits. I made it using my preferred web framework Angular 11 and I am hosting it using services provided by Google Cloud and Firebase. ",
      url: "https://github.com/carreath/caleb-reath-com"
    },{
      name: "My Personal Portfolio Website",
      subtitle: "Made with Angular 11, Google Cloud, and Firebase",
      image: "avatar.png",
      description: "My personal portfolio website is a project I have created to develop and display my skills to anyone who visits. I made it using my preferred web framework Angular 11 and I am hosting it using services provided by Google Cloud and Firebase. ",
      url: "https://github.com/carreath/caleb-reath-com"
    },{
      name: "My Personal Portfolio Website",
      subtitle: "Made with Angular 11, Google Cloud, and Firebase",
      image: "avatar.png",
      description: "My personal portfolio website is a project I have created to develop and display my skills to anyone who visits. I made it using my preferred web framework Angular 11 and I am hosting it using services provided by Google Cloud and Firebase. ",
      url: "https://github.com/carreath/caleb-reath-com"
    });
  }

  @ViewChild("Projects", { read: ElementRef }) this_component: ElementRef;

  state: string = "hidden";
  init = true;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event) {
    if (this.state === "hidden" && this.this_component.nativeElement.getBoundingClientRect().y <= window.innerHeight * 0.2) {
      console.log("show");
      this.state = "show";
    } else if (this.state === "show" && this.this_component.nativeElement.getBoundingClientRect().y > window.innerHeight) {
      console.log("hide");
      this.state = "hidden";
    }
  }

  ngAfterViewInit(): void {
    this.startAll()            
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

  startAll() {
    this.startSpinAnimation();
  }

  animationContainerSpin(duration, easeFunction) {
    this.animationContainerTimeline = anime.timeline({loop: true})
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
    this.animationGroupTimeline = anime.timeline({loop: true})
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
    this.animationItemTimelines[0] = anime.timeline({loop: true})
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

    this.animationItemTimelines[1] = anime.timeline({loop: true})
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

    this.animationItemTimelines[2] = anime.timeline({loop: true})
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