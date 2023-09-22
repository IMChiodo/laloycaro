import { Component, Input, OnInit } from '@angular/core';
import { DivisionComponent } from '../division/division.component';
import { CommonModule } from '@angular/common';
import { CoverTextComponent } from '../cover-text/cover-text.component';

@Component({
  standalone: true,
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css'],
  imports: [DivisionComponent, CommonModule, CoverTextComponent],
})
export class CoverComponent implements OnInit {
  isStriked = false;
  @Input() guestExists: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.isStriked = true;
    }, 500); // 0.5 seconds delay
  }
}
