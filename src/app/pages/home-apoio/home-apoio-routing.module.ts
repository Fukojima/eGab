import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeApoioPage } from './home-apoio.page';

const routes: Routes = [
  {
    path: '',
    component: HomeApoioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeApoioPageRoutingModule {}
