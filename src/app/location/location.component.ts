import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionComponent } from '../division/division.component';
import { ClickableAnimationComponent } from '../clickaable-animation/clickaable-animation.component';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  imports: [CommonModule, DivisionComponent, ClickableAnimationComponent],
})
export class LocationComponent {
  @Input() isDinner: boolean = false;
}
