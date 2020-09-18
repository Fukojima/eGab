import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFiliadosPage } from './modal-filiados.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFiliadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFiliadosPageRoutingModule {}
