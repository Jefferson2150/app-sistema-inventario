import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/estructura/clases/cliente';
import { Producto } from 'src/app/estructura/clases/producto';
import { Venta, VentaDetalle } from 'src/app/estructura/clases/venta';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  isModalOpen = false;
  productos : Producto[]= [];
  venta_detalle    : VentaDetalle[] = [];
  venta_item  : VentaDetalle = new VentaDetalle();
  subtotal  : number = 0;
  igv       : number = 0;
  total     : number = 0;
  venta: Venta = new Venta();
  myFormVenta!   : FormGroup;
  fechaHoy = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  filtro :any[] = [];
  texto = "";
  textoCliente = '';
  clientes: Cliente[] = [];
  filtroCliente :any[] = [];
  constructor(public servicio:ServiceService,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.listarProductos();
    this.cargarFormulario();
    this.listarClientes();
/*     this.clientes.push({
      cl_id: 0,
      cl_nombre: 'Juan',
      cl_telefono: '966836787',
      cl_doc: "122323",
      cl_email: 'juan@gmail.com',
      cl_estado: 0,
      cl_fnacimiento: '',
      cl_direccion: ''
    },
    {
      cl_id: 0,
      cl_nombre: 'Pedro',
      cl_telefono: '966836787',
      cl_doc: "3232323",
      cl_email: 'juan@gmail.com',
      cl_estado: 0,
      cl_fnacimiento: '',
      cl_direccion: ''
    },{
      cl_id: 0,
      cl_nombre: 'Felipe',
      cl_telefono: '966836787',
      cl_doc: "23232323",
      cl_email: 'juan@gmail.com',
      cl_estado: 0,
      cl_fnacimiento: '',
      cl_direccion: ''
    }); */

  }

  cargarFormulario (){
    this.myFormVenta = this.formBuilder.group({
      usuario       : [{value: 'Administrador', disabled: true}, [Validators.required]],
      cliente       : ['',],
      fechaVenta    : [this.fechaHoy, [Validators.required]],
      direccion     : ['', ],
    });
  }

  listarClientes(){
    this.servicio.listarCliente().subscribe( respuesta => {
      this.clientes = respuesta;
      this.filtroCliente = this.clientes;
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



  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  agregarItem(prod:Producto){
    console.log("cantiad", prod.prod_cantidad_venta)
    if(prod.prod_cantidad_venta <= 0 || isNaN(Number(prod.prod_cantidad_venta))){
      this.servicio.toast('top','Cantidad tiene que ser mayor a 0','warning');
    }else{
      console.log("produccion", (prod.prod_precio * prod.prod_cantidad),);
      this.venta_detalle.push({
        vent_id           : 1,
        vent_item         : 1,
        vent_cantidad   : prod.prod_cantidad_venta,
        vent_unidad     : 'KG',
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

  editarItem(evento:any,prod:Producto){
    console.log("evento", evento);
    console.log("prod", prod);
    prod.prod_cantidad_venta =  Number(evento);
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

  registrarVenta(){
    this.venta.vent_total     = this.total;
    this.venta.vent_igv       =  this.igv;
    this.venta.vent_subtotal  = this.subtotal;
    this.venta.venta_detalle  = this.venta_detalle;
    this.venta.vent_usuario   = 1;
    //this.venta.vent_cliente   = 0;
    this.venta.vent_direccion = this.myFormVenta.value.direccion;
    this.venta.vent_fecha     = this.myFormVenta.value.fechaVenta;
    console.log(this.venta);
    if(this.venta_detalle.length == 0 ){
      this.servicio.toast('top','Ingrese una producto a la venta','warning');
    }else{
      this.spinnerService.show();
      this.servicio.registrarVenta(this.venta).subscribe( respuesta => {
        console.log("datos de venta", respuesta);
        if(respuesta.est == 'success'){
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.message,'success');
            this.cancelarVenta();
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

  busquedaGeneral() {
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

  busquedaGeneralCliente() {
    if (this.textoCliente.length === 0) {
      this.clientes = this.filtroCliente;
    } else {
      this.clientes = this.filtroCliente.filter((item) => {
        return (
          item.cl_nombre.toUpperCase().includes(this.textoCliente.toUpperCase()) || 
          item.cl_doc.toString().toUpperCase().includes(this.textoCliente.toUpperCase())
        );
      });
    }
  }

  seleccionarCliente(cliente:Cliente){
    console.log("que selecciono", cliente);
    this.setOpen(false);
    this.myFormVenta.controls["cliente"].setValue(cliente.cl_nombre);
    this.venta.vent_cliente   = cliente.cl_id;
  }

  cancelarVenta(){
    this.myFormVenta.controls["cliente"].setValue('');
    this.myFormVenta.controls["direccion"].setValue('');
    this.venta_detalle = [];
    this.venta = new Venta();
    this.total    = 0;
    this.igv      = 0;
    this.subtotal = 0;
  }

}
