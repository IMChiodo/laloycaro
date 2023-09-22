import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DivisionComponent } from '../division/division.component';

@Component({
  selector: 'app-dresscode',
  templateUrl: './dresscode.component.html',
  styleUrls: ['./dresscode.component.css'],
  standalone: true,
  imports: [CommonModule, DivisionComponent],
})
export class DresscodeComponent {}
