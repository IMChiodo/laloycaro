import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionComponent } from '../division/division.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { MainService } from '../main/service/main.service';

@Component({
  selector: 'app-tinder',
  standalone: true,
  templateUrl: './tinder.component.html',
  styleUrls: ['./tinder.component.css'],
  imports: [CommonModule, DivisionComponent],
  animations: [
    trigger('emojiFall', [
      state('start', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('end', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('start => end', [
        animate(
          '1s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          keyframes([
            // Use keyframes function here
            style({ transform: 'translateY(0)', opacity: 1 }),
            style({ transform: 'translateY(100px)', opacity: 0.9 }),
            style({ transform: 'translateY(200px)', opacity: 0.8 }),
            style({ transform: 'translateY(300px)', opacity: 0.7 }),
            style({ transform: 'translateY(400px)', opacity: 0.6 }),
            style({ transform: 'translateY(500px)', opacity: 0.5 }),
            style({ transform: 'translateY(600px)', opacity: 0.4 }),
            style({ transform: 'translateY(700px)', opacity: 0.3 }),
            style({ transform: 'translateY(800px)', opacity: 0.2 }),
            style({ transform: 'translateY(900px)', opacity: 0.1 }),
            style({ transform: 'translateY(1000px)', opacity: 0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class TinderComponent implements OnInit {
  @Input('name') name = '';
  @Input() bachelorExists: boolean = false;
  emojiState = 'start';
  single: boolean = false;
  occuped: boolean = false;
  play: boolean = false;
  wontPlay: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedFileName: string | null = null;
  uploadedImageSrc: string | null = null;
  uploadedBase64: string | null = null;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    // Trigger the animation after a delay
    setTimeout(() => {
      this.emojiState = 'end';
    }, 1000); // Adjust the delay as needed
  }

  onFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.uploadedFileName = input.files[0].name;

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageSrc = reader.result as string;
        // Store the base64 string without the metadata for easier storage & retrieval
        this.uploadedBase64 = this.uploadedImageSrc.split(',')[1];
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeFile() {
    this.uploadedFileName = null;
    this.uploadedImageSrc = null;
  }

  setSingle(single: boolean) {
    if (single) {
      this.single = true;
      this.occuped = false;
    } else {
      this.occuped = true;
      this.single = false;
    }
  }

  setParticipation(isOn: boolean) {
    if (!this.single && !this.occuped) return;
    if (isOn) {
      this.play = true;
      this.wontPlay = false;
    } else {
      this.wontPlay = true;
      this.play = false;
    }
  }

  saveBachelor(): void {
    if (
      !this.name ||
      this.single === this.occuped ||
      this.play === this.wontPlay
    ) {
      alert('Please fill out all required fields before saving!');
      return;
    }

    const guestName = this.name;
    const play = this.play;
    // Assuming you have a field for Instagram or get it from somewhere
    const instagram = ''; // replace with the appropriate value

    // Use the base64 string without the metadata for the picture
    const picture = this.uploadedImageSrc?.split(',')[1];

    this.mainService
      .saveBachelor(guestName, play, instagram, picture)
      .subscribe(
        (response) => {
          this.mainService.checkGuest(guestName).subscribe((data) => {
            this.bachelorExists = data.bachelorExists;
          });
        },
        (error) => {
          // handle error response
          console.error('There was an error saving the bachelor data:', error);
        }
      );
  }
}
