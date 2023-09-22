import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-clickable-animation',
  templateUrl: './clickaable-animation.component.html',
  styleUrls: ['./clickaable-animation.component.css'],
  animations: [
    trigger('slideAnimation', [
      state(
        'left',
        style({
          transform: 'translateX(-10%)',
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(10%)',
        })
      ),
      transition('left <=> right', [animate('2s ease-in-out')]),
    ]),
  ],
})
export class ClickableAnimationComponent {
  state: string = 'left';

  ngOnInit() {
    this.animateForever();
  }

  animateForever() {
    setInterval(() => {
      this.state = this.state === 'left' ? 'right' : 'left';
    }, 2000);
  }
}
