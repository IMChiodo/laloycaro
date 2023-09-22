import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly BASE_URL = 'https://casamiento-backend.vercel.app/'; // Replace with your NestJS backend URL

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
}
