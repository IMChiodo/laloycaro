import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from '../main/service/main.service';
import fullpage from 'fullpage.js';
import FontFaceObserver from 'fontfaceobserver';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as bachelorsData from '../../bachelors.json';
import { DivisionComponent } from '../division/division.component';

@Component({
  standalone: true,
  selector: 'app-tinder-list',
  templateUrl: './tinder-list.component.html',
  styleUrls: ['./tinder-list.component.css'],
  imports: [CommonModule, DivisionComponent],
})
export class TinderListComponent implements OnInit {
  isLoading = true;

  fontsLoaded = false;
  imagesLoaded = false;
  dataLoaded = false;
  bachelors: Array<any> = [];
  public profilePicUrl: SafeUrl | string = '';

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkImagesLoaded();
    this.getBachelors();
    const robotoObserver = new FontFaceObserver('Licorice');
    const anotherFontObserver = new FontFaceObserver('Julius Sans One');

    Promise.all([
      robotoObserver.load(),
      anotherFontObserver.load(), // Only if you have another font
    ]).then(() => {
      this.fontsLoaded = true;
      this.checkAllLoaded();
    });

    new fullpage('#fullpage', {
      licenseKey: 'F91LK-QH29H-VVJ9J-I6I0H-TSMOO',
      autoScrolling: true,
    });
  }

  getBachelors(): void {
    console.log(JSON.stringify(bachelorsData));
    this.bachelors = JSON.parse(JSON.stringify(bachelorsData)).default;
    console.log(this.bachelors);

    this.dataLoaded = true;
    this.checkAllLoaded();
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
    if (this.fontsLoaded && this.imagesLoaded && this.dataLoaded) {
      this.isLoading = false;
      this.cd.detectChanges();
    }
  }
}
