import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
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
    ])
  ]
})
export class HomeComponent implements OnInit {
  themingSubscription: Subscription;

  isLight = true;

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
    this.startSpinAnimation();
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
      duration: 1665,
      easing: 'easeInOutSine',
      rotateZ: '-1turn'
    }).add({
      targets: '.animation-item-1',
      duration: 1665,
      easing: 'easeInOutSine',
      rotateZ: '0turn'
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
      rotateZ: [-60, 60], 
      duration: 500,
      easing: 'easeInOutSine'
    }).add({
      targets: '.animation-item-3',
      rotateZ: [60, -60], 
      duration: 500,
      easing: 'easeInOutSine'
    });
  }
}
