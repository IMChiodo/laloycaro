import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly BASE_URL = 'https://casamiento-backend.vercel.app'; // Replace with your NestJS backend URL
  // private readonly BASE_URL = 'http://localhost:3005'; // Replace with your NestJS backend URL

  constructor(private http: HttpClient) {}

  checkGuest(guestName: string): Observable<any> {
    const endpoint = `${this.BASE_URL}/check-guest`;
    return this.http.post(endpoint, { guestName });
  }

  saveAttendence(
    guestName: string,
    attendence: boolean,
    foodRestrictions: string
  ): Observable<any> {
    const endpoint = `${this.BASE_URL}/attendance`;
    return this.http.post(endpoint, {
      guestName,
      attendence,
      foodRestrictions,
    });
  }

  saveBachelor(
    guestName: string,
    play: boolean,
    instagram: string,
    picture: any
  ): Observable<any> {
    const endpoint = `${this.BASE_URL}/bachelors`;
    return this.http.post(endpoint, {
      guestName,
      play,
      instagram,
      picture,
    });
  }

  getBachelors(): Observable<any> {
    const endpoint = `${this.BASE_URL}/bachelors`;
    return this.http.get(endpoint);
  }

  getProfilePicture(username: string): Observable<string> {
    const url = `https://www.instagram.com/${username}/?__a=1&__d=1`;
    return this.http.get<string>(url);
  }

  getProfileData(username: string) {
    const instaUrl = 'https://www.instagram.com'; // Instagram URL

    const profileUrl = `${instaUrl}/${username}/?__a=1&__d=1`; // Instagram's unofficial API endpoint

    return this.http.get(profileUrl).pipe(
      map((response: any) => {
        // Here, you'd process the JSON response to find the data you're interested in.
        // This will differ from your Python example, as you're no longer dealing with HTML, but rather with a JSON object.

        // For instance, to access the profile picture URL:
        const profilePicUrl = response?.graphql?.user?.profile_pic_url_hd;
        return profilePicUrl;
      })
    );
  }

  getInstagramPageHtml(username: string): Observable<string> {
    const url = `https://www.instagram.com/${username}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
