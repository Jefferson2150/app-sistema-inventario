import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/estructura/clases/producto';
import { Venta } from 'src/app/estructura/clases/venta';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  isModalOpen = false;
  productos : Producto[]= [];
  ventas    : Venta[] = [];
  venta_item  : Venta = new Venta();
  subtotal  : number = 0;
  igv       : number = 0;
  total     : number = 0;
  constructor(public servicio:ServiceService) { }

  ngOnInit() {
    this.listarProductos();
  }

  listarProductos(){
    this.servicio.listarProducto().subscribe( respuesta => {
      console.log("productoos", respuesta)
      this.productos = respuesta;
      this.productos.forEach(element => {
        element.prod_cantidad_venta = 1;
      });
    })
  }



  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  agregarItem(prod:Producto){
    console.log("produccion", (prod.prod_precio * prod.prod_cantidad),);
    this.ventas.push({
      vent_id           : 1,
      vent_item         : 1,
      vent_cantidad   : prod.prod_cantidad_venta,
      vent_unidad     : 'UNI',
      vent_producto   : prod.prod_nombre,
      vent_valor      : prod.prod_precio,
      vent_subtotal   : (prod.prod_precio * prod.prod_cantidad_venta),
    });
    //this.subtotal = this.subtotal + prod.prod_precio;
    this.total    = this.total + (prod.prod_precio * prod.prod_cantidad_venta);
    this.igv      = (this.total*18)/100;
    this.subtotal = this.total - this.igv;
  }

  editarItem(evento:any,prod:Producto){
    console.log("evento", evento);
    console.log("prod", prod);
    prod.prod_cantidad_venta =  Number(evento);
  }

  eliminarItemVenta(vent:Venta){
    let filter = this.ventas.filter( x => x != vent);
    console.log("filter", filter)
    this.ventas = filter;
    this.total    = this.total  - vent.vent_subtotal;
    this.igv      = (this.total*18)/100;
    this.subtotal = this.total - this.igv;
  }
}
