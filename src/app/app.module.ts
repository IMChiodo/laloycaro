import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoverComponent } from './cover/cover.component';
import { DescriptionComponent } from './description/description.component';
import { DivisionComponent } from './division/division.component';
import { LocationComponent } from './location/location.component';
import { PresentComponent } from './present/present.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TinderComponent } from './tinder/tinder.component';
import { MainComponent } from './main/main.component';
import { DresscodeComponent } from './dresscode/dresscode.component';
import { NgParticlesModule } from 'ng-particles';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, MainComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoverComponent,
    DescriptionComponent,
    DivisionComponent,
    LocationComponent,
    PresentComponent,
    AttendenceComponent,
    BrowserAnimationsModule,
    TinderComponent,
    DresscodeComponent,
    NgParticlesModule,
    HttpClientModule,
  ],
})
export class AppModule {}
