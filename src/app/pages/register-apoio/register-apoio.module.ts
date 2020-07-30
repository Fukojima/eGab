import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { IonicModule } from '@ionic/angular';

import { RegisterApoioPageRoutingModule } from './register-apoio-routing.module';

import { RegisterApoioPage } from './register-apoio.page';

@NgModule({
  imports: [
    CommonModule,
    NgxMaskIonicModule,
    FormsModule,
    IonicModule,
    RegisterApoioPageRoutingModule
  ],
  declarations: [RegisterApoioPage]
})
export class RegisterApoioPageModule {}
