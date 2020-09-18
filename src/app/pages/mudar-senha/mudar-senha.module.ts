import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MudarSenhaPageRoutingModule } from './mudar-senha-routing.module';

import { MudarSenhaPage } from './mudar-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MudarSenhaPageRoutingModule
  ],
  declarations: [MudarSenhaPage]
})
export class MudarSenhaPageModule {}
