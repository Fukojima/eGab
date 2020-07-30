import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilLiderancaPage } from './perfil-lideranca.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilLiderancaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilLiderancaPageRoutingModule {}
