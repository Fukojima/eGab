import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalApoioPage } from './modal-apoio.page';

const routes: Routes = [
  {
    path: '',
    component: ModalApoioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalApoioPageRoutingModule {}
