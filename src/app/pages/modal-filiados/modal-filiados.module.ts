import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFiliadosPageRoutingModule } from './modal-filiados-routing.module';

import { ModalFiliadosPage } from './modal-filiados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFiliadosPageRoutingModule
  ],
  declarations: [ModalFiliadosPage]
})
export class ModalFiliadosPageModule {}
