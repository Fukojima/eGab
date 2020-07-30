import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFiliadorApoioPage } from './register-filiador-apoio.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFiliadorApoioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFiliadorApoioPageRoutingModule {}
