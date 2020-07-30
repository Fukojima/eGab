import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilLiderancaPageRoutingModule } from './perfil-lideranca-routing.module';

import { PerfilLiderancaPage } from './perfil-lideranca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLiderancaPageRoutingModule
  ],
  declarations: [PerfilLiderancaPage]
})
export class PerfilLiderancaPageModule {}
