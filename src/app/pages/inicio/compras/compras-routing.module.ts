import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprasPage } from './compras.page';

const routes: Routes = [
  {
    path: '',
    component: ComprasPage
  },
  {
    path: 'lista-compras',
    loadChildren: () => import('./lista-compras/lista-compras.module').then( m => m.ListaComprasPageModule)
  },
  {
    path: 'detalle-compra',
    loadChildren: () => import('./detalle-compra/detalle-compra.module').then( m => m.DetalleCompraPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasComponentRoutingModule {}