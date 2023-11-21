import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./producto/categoria/categoria.module').then( m => m.CategoriaPageModule)
      }
    ]
  }/* ,
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
