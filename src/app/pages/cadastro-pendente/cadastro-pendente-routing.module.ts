import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroPendentePage } from './cadastro-pendente.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPendentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroPendentePageRoutingModule {}
