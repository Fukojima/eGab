import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeFiliadorPageRoutingModule } from './home-filiador-routing.module';

import { HomeFiliadorPage } from './home-filiador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeFiliadorPageRoutingModule
  ],
  declarations: [HomeFiliadorPage]
})
export class HomeFiliadorPageModule {}
