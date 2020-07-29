import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFiliadorPage } from './register-filiador.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFiliadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFiliadorPageRoutingModule {}
