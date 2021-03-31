import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import anime from 'animejs/lib/anime.es';

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
  _state: string = 'spin';
  _shrinkState: string = "default"

  ngOnInit(): void {
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

  shrinkDone() {
    this._shrinkState = "default";
  }

  ngAfterViewInit(): void {
    // Wrap every letter in a span
    const textWrapper = document.querySelector('.an-1');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
    .add({
      targets: '.an-1',
      duration: 2000,
      easing: 'easeInOutSine',
      rotateZ: '1turn'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-2',
      duration: 1500,
      easing: 'spring(1, 80, 10, 0)',
      rotateZ: '1turn'
    }).add({
      targets: '.an-2',
      duration: 1000,
      easing: 'spring(1, 80, 10, 0)',
      rotateZ: '0turn'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-3',
      rotateZ: [-60, 60], 
      duration: 650,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-3',
      rotateZ: [60, -60], 
      duration: 650,
      easing: 'easeInOutSine'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-4',
      rotateZ: [0, 120], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-4',
      rotateZ: [120, 240], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-4',
      rotateZ: [240, 360], 
      duration: 1000,
      easing: 'easeInOutSine'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-5',
      rotateZ: [120, 240], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-5',
      rotateZ: [240, 360], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-5',
      rotateZ: [0, 120], 
      duration: 1000,
      easing: 'easeInOutSine'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-6',
      rotateZ: [240, 360], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-6',
      rotateZ: [0, 120], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-6',
      rotateZ: [120, 240], 
      duration: 1000,
      easing: 'easeInOutSine'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-7',
      rotateZ: [0, -120], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-7',
      rotateZ: [-120, -240], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-7',
      rotateZ: [-240, -360], 
      duration: 1000,
      easing: 'easeInOutSine'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-8',
      rotateZ: [-120, -240], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-8',
      rotateZ: [-240, -360], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-8',
      rotateZ: [0, -120], 
      duration: 1000,
      easing: 'easeInOutSine'
    });

    anime.timeline({loop: true})
    .add({
      targets: '.an-9',
      rotateZ: [-240, -360], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-9',
      rotateZ: [0, -120], 
      duration: 1000,
      easing: 'easeInOutSine'
    }).add({
      targets: '.an-9',
      rotateZ: [-120, -240], 
      duration: 1000,
      easing: 'easeInOutSine'
    });
  }
}
