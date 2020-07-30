import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilLiderancaFiliadorPage } from './perfil-lideranca-filiador.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilLiderancaFiliadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilLiderancaFiliadorPageRoutingModule {}
