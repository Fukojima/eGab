import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilFiliadorPageRoutingModule } from './perfil-filiador-routing.module';

import { PerfilFiliadorPage } from './perfil-filiador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilFiliadorPageRoutingModule
  ],
  declarations: [PerfilFiliadorPage]
})
export class PerfilFiliadorPageModule {}
