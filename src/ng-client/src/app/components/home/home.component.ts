import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import anime from 'animejs/lib/anime.es';
import { Subscription } from 'rxjs/internal/Subscription';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
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
    ]),
    trigger('FadeText', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),

      transition('visible => hidden', [
        style({ opacity: 1 }),
        query('.letter', [
          stagger(100, [
            animate('500ms {{delay}}ms', style({ opacity: 0 }))
          ])
        ])        
      ], {params: {delay: 0}}),
      transition('hidden => visible', [
        style({ opacity: 0 }),
        query('.letter', [
          stagger(80, [
            animate('500ms 100ms ease-in', style({ opacity: 1 }))
          ])
        ])  
      ], {params: {delay: 0}})
    ])
  ]
})
export class HomeComponent implements OnInit {
  themingSubscription: Subscription;

  isLight = true;

  textFadeState = "hidden";

  _state: string = 'spin';
  _shrinkState: string = "default"

  animationContainerTimeline = null;
  animationGroupTimeline = null;
  animationItemTimelines = [];

  constructor(private themingService: ThemingService) {}

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      console.log(theme)
      this.isLight = theme === "light-theme";
    });
  }

  ngAfterViewInit(): void {
    let animation = anime({
      targets: '.line1.letter',
      opacity: 1, 
      delay: anime.stagger(80, {start: 1000}), 
      duration: 1000,
      easing: "linear",
      complete: () => {
        this.startLine(1)
      }
    }); 
    let animation2 = anime({
      targets: '.line2.letter',
      opacity: 1, 
      delay: anime.stagger(80, {start: 2000}), 
      duration: 1000,
      easing: "linear"
    }); 
    let animation3 = anime({
      targets: '.line3.letter',
      opacity: 1, 
      delay: anime.stagger(80, {start: 3000}), 
      duration: 1000,
      easing: "linear"
    }); 
    let animation4 = anime({
      targets: '.line4.letter',
      opacity: 1, 
      delay: anime.stagger(80, {start: 4000}), 
      duration: 1000,
      easing: "linear"
    });                
  }

  startLine(line) {
    let stagger = 80;
    let delay = 1000;
    
    if (line == 3) {
      stagger = 30;
      setTimeout(() => {
        this.startLine(4);
      }, 1500);
    }

    anime({
      targets: '.line' + line + ' .letter',
      opacity: 1, 
      delay: anime.stagger(stagger, {start: delay}), 
      duration: 1000,
      easing: "linear",
      complete: () => {
        if (line > 2) return;
        this.startLine(line+1);
      }
    });
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
    
    this.textFadeState = "visible";
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
