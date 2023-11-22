import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresComponentRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresComponentRoutingModule
  ],
  declarations: [ProveedoresPage]
})
export class ProveedoresPageModule {}

