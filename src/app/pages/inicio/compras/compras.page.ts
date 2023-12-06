import { formatDate } from '@angular/common';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Compra, CompraDetalle } from 'src/app/estructura/clases/compra';
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
  myFormCompra!   : FormGroup;
  venta_detalle    : VentaDetalle[] = [];
  compra_detalle  : CompraDetalle[] = [];
  subtotal  : number = 0;
  igv       : number = 0;
  total     : number = 0;
  compra  : Compra = new Compra();
  fechaHoy = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  constructor(public formBuilder: FormBuilder,public servicio:ServiceService,private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.cargarFormulario();
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

  cargarFormulario (){
    this.myFormCompra = this.formBuilder.group({
      usuario       : [{value: 'Administrador', disabled: true}, [Validators.required]],
      fechaCompra   : [this.fechaHoy, [Validators.required]],
      direccion     : ['', ],
    });
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
    this.compra.comp_proveedor = Number(event);
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
      this.compra_detalle.push({
        comp_det_id: 0,
        comp_det_item: 1,
        comp_det_cantidad: prod.prod_cantidad_venta,
        comp_det_unidad: 'KG',
        comp_det_producto: prod.prod_nombre,
        comp_det_valor:  prod.prod_precio,
        comp_det_subtotal: (prod.prod_precio * prod.prod_cantidad_venta),
      })
/*       this.venta_detalle.push({
        vent_id           : 1,
        vent_item         : 1,
        vent_cantidad   : prod.prod_cantidad_venta,
        vent_unidad     : 'UNI',
        vent_producto   : prod.prod_nombre,
        vent_valor      : prod.prod_precio,
        vent_subtotal   : (prod.prod_precio * prod.prod_cantidad_venta),
      }); */
      this.ordenarItem();
      //this.subtotal = this.subtotal + prod.prod_precio;
      this.total    = this.total + (prod.prod_precio * prod.prod_cantidad_venta);
      this.igv      = (this.total*18)/100;
      this.subtotal = this.total - this.igv;
    }
  }

  eliminarItemVenta(compra:CompraDetalle){
    let filter = this.compra_detalle.filter( x => x != compra);
    console.log("filter", filter)
    this.compra_detalle = filter;
    this.total    = this.total  - compra.comp_det_subtotal;
    this.igv      = (this.total*18)/100;
    this.subtotal = this.total - this.igv;
    this.ordenarItem();
  }

  ordenarItem(){
    this.compra_detalle.forEach( (item,index) =>{
      item.comp_det_item = index +1;
    })
  }

  registrarCompra(){
    this.compra.comp_total     = this.total;
    this.compra.comp_igv       =  this.igv;
    this.compra.comp_subtotal  = this.subtotal;
    this.compra.compra_detalle  = this.compra_detalle;
    this.compra.comp_usuario   = 1;
    //this.venta.vent_cliente   = 0;
    this.compra.comp_direccion = '';
    this.compra.comp_fecha     = this.myFormCompra.value.fechaCompra;
    console.log("compra", this.compra);
    if(this.compra_detalle.length == 0 ){
      this.servicio.toast('top','Ingrese una producto a la venta','warning');
    }else{
      this.spinnerService.show();
      this.servicio.registrarCompra(this.compra).subscribe( respuesta => {
        console.log("datos de venta", respuesta);
        if(respuesta.est == 'success'){
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.message,'success');
            this.cancelarCompra();
          }, 1000);
        }else{
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.message,'error')
          }, 1000);
        }
      })
    }
  }

  cancelarCompra(){
    this.myFormCompra.controls["direccion"].setValue('');
    this.compra_detalle = [];
    this.compra = new Compra();
    this.total    = 0;
    this.igv      = 0;
    this.subtotal = 0;
  }
}