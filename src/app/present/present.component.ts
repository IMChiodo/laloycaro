import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
  @ViewChild('copiadoText', { static: false }) copiedText!: ElementRef;

  constructor(private clipboard: Clipboard, private renderer: Renderer2) {}

  copyToClipboard(): void {
    const cbu = 'CAROYLALO';
    this.clipboard.copy(cbu);

    // Show COPIADO text
    this.renderer.removeClass(this.copiedText.nativeElement, 'hidden');
    this.renderer.addClass(this.copiedText.nativeElement, 'fade-in');

    // Hide COPIADO text after 1 second
    setTimeout(() => {
      this.renderer.removeClass(this.copiedText.nativeElement, 'fade-in');
      this.renderer.addClass(this.copiedText.nativeElement, 'fade-out');

      // Actually hide the element after the fade out animation completes
      setTimeout(() => {
        this.renderer.addClass(this.copiedText.nativeElement, 'hidden');
        this.renderer.removeClass(this.copiedText.nativeElement, 'fade-out');
      }, 500);
    }, 750);
  }
}
