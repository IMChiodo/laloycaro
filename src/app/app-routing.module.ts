import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TinderListComponent } from './tinder-list/tinder-list.component';

const routes: Routes = [
  {
    path: 'tinder',
    component: TinderListComponent,
  },
  {
    path: ':guest',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
