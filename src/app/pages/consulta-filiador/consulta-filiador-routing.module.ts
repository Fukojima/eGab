import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaFiliadorPage } from './consulta-filiador.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaFiliadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaFiliadorPageRoutingModule {}
