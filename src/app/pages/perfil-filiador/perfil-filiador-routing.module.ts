import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilFiliadorPage } from './perfil-filiador.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilFiliadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilFiliadorPageRoutingModule {}
