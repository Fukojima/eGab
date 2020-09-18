import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaApoioPage } from './consulta-apoio.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaApoioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaApoioPageRoutingModule {}
