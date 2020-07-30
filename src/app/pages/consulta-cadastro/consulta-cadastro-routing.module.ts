import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaCadastroPage } from './consulta-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaCadastroPageRoutingModule {}
