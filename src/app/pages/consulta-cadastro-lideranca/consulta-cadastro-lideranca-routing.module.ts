import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaCadastroLiderancaPage } from './consulta-cadastro-lideranca.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaCadastroLiderancaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaCadastroLiderancaPageRoutingModule {}
