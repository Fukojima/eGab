import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeFiliadorPage } from './home-filiador.page';

const routes: Routes = [
  {
    path: '',
    component: HomeFiliadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeFiliadorPageRoutingModule {}
