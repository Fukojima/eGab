import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { IonicModule } from '@ionic/angular';

import { CrudPageRoutingModule } from './crud-routing.module';

import { CrudPage } from './crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudPageRoutingModule
   
  ],
  declarations: [CrudPage]
})
export class CrudPageModule {}
