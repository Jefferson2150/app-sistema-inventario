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
      },
      {
        path: 'ventas',
        loadChildren: () => import('./venta/venta.module').then( m => m.VentaPageModule)
      },
      {
        path: 'lista-ventas',
        loadChildren: () => import('./venta/lista-venta/lista-venta.module').then( m => m.ListaVentaPageModule),
      },
      {
        path: 'lista-ventas/detalle/:id',
        loadChildren: () => import('./venta/detalle-venta/detalle-venta.module').then( m => m.DetalleVentaPageModule),
      },
      {
        path: 'compras',
        loadChildren: () => import('./compras/compras.module').then( m => m.ComprasPageModule)
      },
      {
        path: 'lista-compras',
        loadChildren: () => import('./compras/lista-compras/lista-compras.module').then( m => m.ListaComprasPageModule)
      },
      {
        path: 'lista-compras/detalle/:id',
        loadChildren: () => import('./compras/detalle-compra/detalle-compra.module').then( m => m.DetalleCompraPageModule),
      },
      {
        path: 'proveedores',
        loadChildren: () => import('./compras/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
      },
      {
        path: 'inicio-home',
        loadChildren: () => import('./inicio-home/inicio-home.module').then( m => m.InicioHomePageModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./venta/cliente/cliente.module').then( m => m.ClientePageModule)
      },
      
    ]
  },



  /*
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
