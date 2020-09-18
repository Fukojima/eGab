import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilApoioPage } from './perfil-apoio.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilApoioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilApoioPageRoutingModule {}
