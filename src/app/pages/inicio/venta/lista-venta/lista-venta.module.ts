import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaVentaPageRoutingModule } from './lista-venta-routing.module';

import { ListaVentaPage } from './lista-venta.page';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVentaPageRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [ListaVentaPage]
})
export class ListaVentaPageModule {}
