import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilApoioPageRoutingModule } from './perfil-apoio-routing.module';

import { PerfilApoioPage } from './perfil-apoio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilApoioPageRoutingModule
  ],
  declarations: [PerfilApoioPage]
})
export class PerfilApoioPageModule {}
