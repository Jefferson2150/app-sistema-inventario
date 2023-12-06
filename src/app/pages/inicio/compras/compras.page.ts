import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Producto } from 'src/app/estructura/clases/producto';
import { Proveedor } from 'src/app/estructura/clases/proveedor';
import { VentaDetalle } from 'src/app/estructura/clases/venta';
import { ServiceService } from 'src/app/service/service.service';


@Component({
    selector: 'app-compras',
    templateUrl: './compras.page.html',
    styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  texto = "";
  listaProveedores: Proveedor[] = [];
  productos : Producto[]= [];
  filtro :any[] = [];
  myFormVenta!   : FormGroup;
  venta_detalle    : VentaDetalle[] = [];
  subtotal  : number = 0;
  igv       : number = 0;
  total     : number = 0;
  constructor(public servicio:ServiceService) { }

  ngOnInit() {
    this.proveedores();
    this.listarProductos();
  }

  busquedaGeneral(){
    if (this.texto.length === 0) {
      this.productos = this.filtro;
    } else {
      this.productos = this.filtro.filter((item) => {
        return (
          item.prod_nombre.toUpperCase().includes(this.texto.toUpperCase())
        );
      });
    }
  }

  proveedores(){
    this.servicio.listarProveedor().subscribe( respuesta => {
      this.listaProveedores = respuesta;
    })
  }

  listarProductos(){
    this.servicio.listarProducto().subscribe( respuesta => {
      console.log("productoos", respuesta)
      this.productos = respuesta;
      this.productos.forEach(element => {
        element.prod_cantidad_venta = 1;
      });
      this.filtro = this.productos;
    })
  }


  seleccionarProveedor(event:any){

  }

  editarItem(evento:any,prod:Producto){
    console.log("evento", evento);
    console.log("prod", prod);
    prod.prod_cantidad_venta =  Number(evento);
  }


  agregarItem(prod:Producto){
    console.log("cantiad", prod.prod_cantidad_venta);
    console.log("cantiad", prod.prod_cantidad_venta)
    if(prod.prod_cantidad_venta <= 0 || isNaN(Number(prod.prod_cantidad_venta))){
      this.servicio.toast('top','Cantidad tiene que ser mayor a 0','warning');
    }else{
      console.log("produccion", (prod.prod_precio * prod.prod_cantidad),);
      this.venta_detalle.push({
        vent_id           : 1,
        vent_item         : 1,
        vent_cantidad   : prod.prod_cantidad_venta,
        vent_unidad     : 'UNI',
        vent_producto   : prod.prod_nombre,
        vent_valor      : prod.prod_precio,
        vent_subtotal   : (prod.prod_precio * prod.prod_cantidad_venta),
      });
      this.ordenarItem();
      //this.subtotal = this.subtotal + prod.prod_precio;
      this.total    = this.total + (prod.prod_precio * prod.prod_cantidad_venta);
      this.igv      = (this.total*18)/100;
      this.subtotal = this.total - this.igv;
    }
  }

  eliminarItemVenta(vent:VentaDetalle){
    let filter = this.venta_detalle.filter( x => x != vent);
    console.log("filter", filter)
    this.venta_detalle = filter;
    this.total    = this.total  - vent.vent_subtotal;
    this.igv      = (this.total*18)/100;
    this.subtotal = this.total - this.igv;
    this.ordenarItem();
  }

  ordenarItem(){
    this.venta_detalle.forEach( (item,index) =>{
      item.vent_item = index +1;
    })
  }

  registrarCompra(){

  }

  cancelarCompra(){

  }
}