import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLiderancaPendentePageRoutingModule } from './modal-lideranca-pendente-routing.module';

import { ModalLiderancaPendentePage } from './modal-lideranca-pendente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLiderancaPendentePageRoutingModule
  ],
  declarations: [ModalLiderancaPendentePage]
})
export class ModalLiderancaPendentePageModule {}
