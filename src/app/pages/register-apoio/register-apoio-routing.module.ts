import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterApoioPage } from './register-apoio.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterApoioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterApoioPageRoutingModule {}
