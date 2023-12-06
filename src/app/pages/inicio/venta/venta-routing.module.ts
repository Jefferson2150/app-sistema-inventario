import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaPage } from './venta.page';

const routes: Routes = [
  {
    path: '',
    component: VentaPage
  },
  {
    path: 'lista-venta',
    loadChildren: () => import('./lista-venta/lista-venta.module').then( m => m.ListaVentaPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'detalle-venta',
    loadChildren: () => import('./detalle-venta/detalle-venta.module').then( m => m.DetalleVentaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaPageRoutingModule {}
