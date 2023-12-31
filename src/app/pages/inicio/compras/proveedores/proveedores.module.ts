import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresComponentRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresComponentRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [ProveedoresPage]
})
export class ProveedoresPageModule {}

