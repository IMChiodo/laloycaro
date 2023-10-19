import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import fullpage from 'fullpage.js';
import { Container, Engine } from 'tsparticles-engine';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';
import { MainService } from './service/main.service';
import FontFaceObserver from 'fontfaceobserver';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  guest: string | null = null;
  id = 'tsparticles';
  isLoading = true;
  fontsLoaded = false;
  imagesLoaded = false;
  dataLoaded = false;

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
    private readonly mainService: MainService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.guest = params.get('guest');
      this.checkGuest();
    });

    this.checkImagesLoaded();

    const robotoObserver = new FontFaceObserver('Licorice');
    const anotherFontObserver = new FontFaceObserver('Julius Sans One');

    Promise.all([
      robotoObserver.load(),
      anotherFontObserver.load(), // Only if you have another font
    ]).then(() => {
      this.fontsLoaded = true;
      console.log('aca');

      this.checkAllLoaded();
    });

    new fullpage('#fullpage', {
      licenseKey: 'F91LK-QH29H-VVJ9J-I6I0H-TSMOO',
      autoScrolling: true,
    });
  }

  checkGuest(): void {
    this.mainService.checkGuest(this.guest!).subscribe((data) => {
      this.userData = data;
      this.dataLoaded = true;
      this.checkAllLoaded();
    });
  }

  checkImagesLoaded() {
    const images = document.images;
    let count = images.length;
    if (!count) this.imagesLoaded = true; // In case there are no images

    for (let img of Array.from(images)) {
      if (img.complete) {
        count--;
      } else {
        img.onload = () => {
          count--;
          if (count === 0) {
            this.imagesLoaded = true;
            this.checkAllLoaded();
          }
        };
      }
    }
  }

  checkAllLoaded() {
    console.log('entro');

    if (this.fontsLoaded && this.imagesLoaded && this.dataLoaded) {
      this.isLoading = false;
      this.cd.detectChanges();
    }
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
