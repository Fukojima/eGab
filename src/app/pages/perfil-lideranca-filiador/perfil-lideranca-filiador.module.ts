import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilLiderancaFiliadorPageRoutingModule } from './perfil-lideranca-filiador-routing.module';

import { PerfilLiderancaFiliadorPage } from './perfil-lideranca-filiador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLiderancaFiliadorPageRoutingModule
  ],
  declarations: [PerfilLiderancaFiliadorPage]
})
export class PerfilLiderancaFiliadorPageModule {}
