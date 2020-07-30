import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { IonicModule } from '@ionic/angular';

import { RegisterFiliadorPageRoutingModule } from './register-filiador-routing.module';

import { RegisterFiliadorPage } from './register-filiador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskIonicModule,
    IonicModule,
    RegisterFiliadorPageRoutingModule
  ],
  declarations: [RegisterFiliadorPage]
})
export class RegisterFiliadorPageModule {}
