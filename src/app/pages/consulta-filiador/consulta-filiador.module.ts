import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaFiliadorPageRoutingModule } from './consulta-filiador-routing.module';

import { ConsultaFiliadorPage } from './consulta-filiador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaFiliadorPageRoutingModule
  ],
  declarations: [ConsultaFiliadorPage]
})
export class ConsultaFiliadorPageModule {}
