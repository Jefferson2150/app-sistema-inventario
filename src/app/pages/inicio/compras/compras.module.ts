import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasComponentRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprasComponentRoutingModule
  ],
  declarations: [ComprasPage]
})
export class ComprasPageModule {}