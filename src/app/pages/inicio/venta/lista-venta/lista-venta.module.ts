import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaVentaPageRoutingModule } from './lista-venta-routing.module';

import { ListaVentaPage } from './lista-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVentaPageRoutingModule
  ],
  declarations: [ListaVentaPage]
})
export class ListaVentaPageModule {}
