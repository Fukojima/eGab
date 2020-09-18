import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaCadastroLiderancaPageRoutingModule } from './consulta-cadastro-lideranca-routing.module';

import { ConsultaCadastroLiderancaPage } from './consulta-cadastro-lideranca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaCadastroLiderancaPageRoutingModule
  ],
  declarations: [ConsultaCadastroLiderancaPage]
})
export class ConsultaCadastroLiderancaPageModule {}
