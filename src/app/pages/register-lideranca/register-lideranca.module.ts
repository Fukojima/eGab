import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { IonicModule } from '@ionic/angular';

import { RegisterLiderancaPageRoutingModule } from './register-lideranca-routing.module';

import { RegisterLiderancaPage } from './register-lideranca.page';

@NgModule({
  imports: [
    CommonModule,
    NgxMaskIonicModule,
    FormsModule,
    IonicModule,
    RegisterLiderancaPageRoutingModule
  ],
  declarations: [RegisterLiderancaPage]
})
export class RegisterLiderancaPageModule {}
