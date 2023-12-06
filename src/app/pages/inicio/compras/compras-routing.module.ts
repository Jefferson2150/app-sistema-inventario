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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasComponentRoutingModule {}