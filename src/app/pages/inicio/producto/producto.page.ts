import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  public pagedItems   : any[]      = [];
  public pager        : any = {};
  productos = [
    { id: 1, nombre: 'Coca-cola', estado:'Activo', estado_n:0},
    { id: 1, nombre: 'Inka Cola', estado:'Inactivo', estado_n:1}
  ];
  sin_resultado = false;
  con_resultado = true;
  isModalOpen = false;
  constructor(public servicio:ServiceService,private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.setPage(1);
    this.con_resultado = false;
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setPage(page: number) {
    this.pager = this.servicio.getPager(this.productos.length, page);
    this.pagedItems = this.productos.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paginacion",this.pagedItems)
  }

}
