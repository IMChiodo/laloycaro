import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { DivisionComponent } from '../division/division.component';
import { ClickableAnimationComponent } from '../clickaable-animation/clickaable-animation.component';

@Component({
  selector: 'app-present',
  standalone: true,
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css'],
  imports: [CommonModule, DivisionComponent, ClickableAnimationComponent],
})
export class PresentComponent {
  constructor(private clipboard: Clipboard) {}

  copyToClipboard(): void {
    const cbu = 'CAROYLALO';
    this.clipboard.copy(cbu);
  }
}
