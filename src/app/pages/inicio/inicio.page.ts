import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  menu = [{
    menu: 'Producto',
    id:1,
    children: [
      { menu: 'Categoría', id: 2, ruta: 'categoria'},
      { menu: 'Producto', id: 1, ruta: 'producto'}
    ]
  },
  {
    menu: 'Cliente',
    id:1,
    children: [
      { menu: 'Cliente', id: 1, ruta: 'categoria'},
      { menu: 'Reporte', id: 2, ruta: 'categoria'}
    ]
  },
  {
    menu: 'Compras',
    id:1,
    children: [
      { menu: 'Proveedores', id: 1, ruta: 'proveedores'},
      { menu: 'Compras', id: 2, ruta: 'compras'}
    ]
  },
]
  constructor(private router: Router,private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ruta(ruta: any){
    this.router.navigate([ruta])
  }

  cerrar(){
    this.menuCtrl.close();
  }

}
