import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import fullpage from 'fullpage.js';
import { Container, Engine } from 'tsparticles-engine';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  guest: string | null = null;
  id = 'tsparticles';

  particlesOptions = {
    preset: 'confetti',
    emitters: [
      {
        position: { x: 50, y: 50 },
        rate: { quantity: 30, delay: 0.2 },
        life: { duration: 0.4, count: 2 },
      },
      {
        position: { x: 100, y: 100 },
        rate: { quantity: 30, delay: 0.2 },
        life: { duration: 0.4, count: 2 },
      },
      {
        position: { x: 20, y: 20 },
        rate: { quantity: 30, delay: 0.2 },
        life: { duration: 0.4, count: 2 },
      },
      {
        position: { x: 15, y: 80 },
        rate: { quantity: 30, delay: 0.2 },
        life: { duration: 0.4, count: 2 },
      },
      {
        position: { x: 100, y: 20 },
        rate: { quantity: 30, delay: 0.2 },
        life: { duration: 0.4, count: 2 },
      },
      {
        position: { x: 70, y: 35 },
        rate: { quantity: 30, delay: 0.2 },
        life: { duration: 0.4, count: 2 },
      },
    ],
  };
  showFireworks = false;
  userData: {
    guestExists: boolean;
    attendanceExists: boolean;
    bachelorExists: boolean;
    dinner: boolean;
  } = {
    attendanceExists: false,
    bachelorExists: false,
    guestExists: false,
    dinner: false,
  };

  constructor(
    private route: ActivatedRoute,
    private readonly mainService: MainService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.guest = params.get('guest');
      this.checkGuest();
    });

    new fullpage('#fullpage', {
      licenseKey: 'F91LK-QH29H-VVJ9J-I6I0H-TSMOO',
      autoScrolling: true,
    });
  }

  checkGuest(): void {
    this.mainService.checkGuest(this.guest!).subscribe((data) => {
      this.userData = data;
    });
  }

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  onWillChanged(event: boolean): void {
    this.showFireworks = event;
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadConfettiPreset(engine);
  }
}
