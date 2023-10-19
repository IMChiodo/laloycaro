import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DivisionComponent } from '../division/division.component';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  keyframes,
} from '@angular/animations';
import { Engine, Container } from 'tsparticles-engine';
import { NgParticlesModule } from 'ng-particles';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';
import { MainService } from '../main/service/main.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendence',
  standalone: true,
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css'],
  imports: [
    CommonModule,
    MatTooltipModule,
    DivisionComponent,
    NgParticlesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  animations: [
    trigger('pulse', [
      state('small', style({ transform: 'scale(1)' })),
      state('large', style({ transform: 'scale(1.05)' })),
      transition('small <=> large', animate('1000ms ease-in-out')),
    ]),
    trigger('swipeOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0%)' })),
      state('out', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition('in => out', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(50%)', offset: 0.5 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('rollInOut', [
      state(
        'in',
        style({ opacity: 1, transform: 'translateX(0) rotate(0deg)' })
      ),
      state(
        'void, out',
        style({ opacity: 0, transform: 'translateX(-100%) rotate(-360deg)' })
      ),
      transition('void => in, out => in', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(-100%) rotate(-360deg)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'translateX(0%) rotate(0deg)',
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('in => out', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateX(0%) rotate(0deg)',
              offset: 0,
            }),
            style({
              opacity: 0,
              transform: 'translateX(-100%) rotate(-360deg)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
    trigger('scrollAnimation', [
      state('up', style({ transform: 'translateY(-10%)', opacity: 1 })),
      state('down', style({ transform: 'translateY(10%)', opacity: 1 })),
      transition(':enter', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({ transform: 'translateY(10%)', opacity: 0, offset: 0 }),
            style({ transform: 'translateY(-10%)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
      transition('up <=> down', [animate('1.5s ease-in-out')]),
    ]),
  ],
})
export class AttendenceComponent {
  @Input('name') name = '';
  @Input() attendanceExists: boolean = false;
  @Output() will = new EventEmitter<boolean>();
  wontGo: boolean = false;
  willGo: boolean = false;
  pulseState: string = 'small';
  showScroll = false;
  scrollState: string = 'down';
  foodRestControl = new FormControl('');
  loading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private readonly mainService: MainService
  ) {
    setInterval(() => {
      this.pulseState = this.pulseState === 'small' ? 'large' : 'small';
    }, 1500);

    this.animateScrollForever();
  }

  async startFireworks() {
    this.showScroll = true;
    this.will.emit(true);
  }

  saveAttendance(): void {
    this.loading = true;
    const foodRest = this.foodRestControl.getRawValue() || '';
    this.mainService
      .saveAttendence(this.name, this.showScroll, foodRest)
      .subscribe((data) => {
        this.mainService.checkGuest(this.name).subscribe((data) => {
          this.attendanceExists = data.attendanceExists;
          this.loading = false;
        });
      });
  }

  animateScrollForever() {
    setInterval(() => {
      this.scrollState = this.scrollState === 'up' ? 'down' : 'up';
    }, 1500);
  }

  async stopFireworks() {
    this.showScroll = false;
    this.will.emit(false);
  }

  confirmAttendance(confirmed: boolean) {
    if (confirmed) {
      this.startFireworks();
      this.willGo = true;
      this.wontGo = false;
    } else {
      this.stopFireworks();
      this.wontGo = true;
      this.willGo = false;
    }
  }
}
