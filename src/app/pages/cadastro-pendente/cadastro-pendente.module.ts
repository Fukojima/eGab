import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPendentePageRoutingModule } from './cadastro-pendente-routing.module';

import { CadastroPendentePage } from './cadastro-pendente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPendentePageRoutingModule
  ],
  declarations: [CadastroPendentePage]
})
export class CadastroPendentePageModule {}
