import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { IonicModule } from '@ionic/angular';

import { RegisterFiliadorApoioPageRoutingModule } from './register-filiador-apoio-routing.module';

import { RegisterFiliadorApoioPage } from './register-filiador-apoio.page';

@NgModule({
  imports: [
    CommonModule,
    NgxMaskIonicModule,
    FormsModule,
    IonicModule,
    RegisterFiliadorApoioPageRoutingModule
  ],
  declarations: [RegisterFiliadorApoioPage]
})
export class RegisterFiliadorApoioPageModule {}
