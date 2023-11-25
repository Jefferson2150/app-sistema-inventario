import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaVentaPage } from './lista-venta.page';

const routes: Routes = [
  {
    path: '',
    component: ListaVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaVentaPageRoutingModule {}
