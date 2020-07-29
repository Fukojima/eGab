import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFiliadorApoioPageRoutingModule } from './register-filiador-apoio-routing.module';

import { RegisterFiliadorApoioPage } from './register-filiador-apoio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterFiliadorApoioPageRoutingModule
  ],
  declarations: [RegisterFiliadorApoioPage]
})
export class RegisterFiliadorApoioPageModule {}
