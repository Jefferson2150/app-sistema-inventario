import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaPageRoutingModule } from './venta-routing.module';

import { VentaPage } from './venta.page';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaPageRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [VentaPage]
})
export class VentaPageModule {}
