import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaComprasPageRoutingModule } from './lista-compras-routing.module';

import { ListaComprasPage } from './lista-compras.page';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaComprasPageRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [ListaComprasPage]
})
export class ListaComprasPageModule {}
