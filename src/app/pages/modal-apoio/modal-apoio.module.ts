import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalApoioPageRoutingModule } from './modal-apoio-routing.module';

import { ModalApoioPage } from './modal-apoio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalApoioPageRoutingModule
  ],
  declarations: [ModalApoioPage]
})
export class ModalApoioPageModule {}
