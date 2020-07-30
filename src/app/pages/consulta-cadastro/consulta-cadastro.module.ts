import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaCadastroPageRoutingModule } from './consulta-cadastro-routing.module';

import { ConsultaCadastroPage } from './consulta-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaCadastroPageRoutingModule
  ],
  declarations: [ConsultaCadastroPage]
})
export class ConsultaCadastroPageModule {}
