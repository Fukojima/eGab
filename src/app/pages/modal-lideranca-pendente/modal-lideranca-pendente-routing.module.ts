import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLiderancaPendentePage } from './modal-lideranca-pendente.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLiderancaPendentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLiderancaPendentePageRoutingModule {}
