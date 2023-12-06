import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasComponentRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprasComponentRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [ComprasPage]
})
export class ComprasPageModule {}