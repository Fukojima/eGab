import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaApoioPageRoutingModule } from './consulta-apoio-routing.module';

import { ConsultaApoioPage } from './consulta-apoio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaApoioPageRoutingModule
  ],
  declarations: [ConsultaApoioPage]
})
export class ConsultaApoioPageModule {}
