import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeApoioPageRoutingModule } from './home-apoio-routing.module';

import { HomeApoioPage } from './home-apoio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeApoioPageRoutingModule
  ],
  declarations: [HomeApoioPage]
})
export class HomeApoioPageModule {}
