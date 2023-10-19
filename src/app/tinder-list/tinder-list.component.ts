import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from '../main/service/main.service';
import fullpage from 'fullpage.js';
import FontFaceObserver from 'fontfaceobserver';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-tinder-list',
  templateUrl: './tinder-list.component.html',
  styleUrls: ['./tinder-list.component.css'],
  imports: [CommonModule],
})
export class TinderListComponent implements OnInit {
  isLoading = true;

  fontsLoaded = false;
  imagesLoaded = false;
  dataLoaded = false;
  bachelors: Array<any> = [];
  public profilePicUrl: SafeUrl | string = '';

  constructor(
    private readonly mainService: MainService,
    private readonly cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer // Inject Angular's DomSanitizer
  ) {}

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
    this.mainService.getBachelors().subscribe((data) => {
      console.log(data);

      this.bachelors = data;
      this.dataLoaded = true;
      this.checkAllLoaded();

      this.bachelors.forEach((bachelor) => {
        this.mainService
          .getInstagramPageHtml(bachelor.instagram)
          .subscribe((data) => {
            console.log(data);
            const parsedHtml = this.parseHtml(data);
            const parsed = JSON.parse(data);
            const profilePicture = parsed.graphql.user.profile_pic_url_hd;
            bachelor.picture = profilePicture;
            this.dataLoaded = true;
            this.checkAllLoaded();
          });
      });
    });
  }

  parseHtml(html: string) {
    // Use DOMParser to parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find all script tags - note this might not be efficient depending on the page size
    const scripts = Array.from(doc.querySelectorAll('script'));

    // Find the script tag with the content we're interested in.
    // This is based on current Instagram web structure as of my last training data in September 2021.
    const targetScript = scripts.find((script) =>
      script.innerHTML.includes('profile_pic_url_hd')
    );

    if (targetScript) {
      // Extract the JSON from the script tag
      const scriptContent = targetScript.innerHTML;

      // The JSON data typically starts with 'window._sharedData =' in the script tag
      const jsonStr = scriptContent
        .split('window._sharedData =')[1]
        .split('</script>')[0]
        .trim()
        .slice(0, -1); // Removing the trailing semicolon

      try {
        const jsonData = JSON.parse(jsonStr);
        // Navigate through the JSON structure to get the profile pic URL
        const profilePicUrl =
          jsonData.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd;

        // Since we're dealing with an external URL, we should sanitize it before using it in our application
        this.profilePicUrl =
          this.sanitizer.bypassSecurityTrustUrl(profilePicUrl);

        console.log('Profile Picture URL:', this.profilePicUrl);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
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
