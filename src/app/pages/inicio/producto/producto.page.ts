import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, AnimationController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Categoria } from 'src/app/estructura/clases/categoria';
import { Parametro } from 'src/app/estructura/clases/parametro';
import { Producto } from 'src/app/estructura/clases/producto';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  public pagedItems   : any[]      = [];
  public pager        : any = {};
/*   productos = [
    { id: 1, nombre: 'Coca-cola', estado:'Activo', estado_n:0},
    { id: 1, nombre: 'Inka Cola', estado:'Inactivo', estado_n:1}
  ]; */
  sin_resultado = false;
  con_resultado = true;
  isModalOpen = false;
  myFormProducto!   : FormGroup;
  producto: Producto = new Producto();
  productos: Producto[] = [];
  listaCategorias : Categoria[] = [];
  parametro       : Parametro[] = [];
  filtro :any[] = [];
  marcar = true;
  agregar = 'Agregar producto';
  botonAgregar = 'REGISTRAR';
  agregarestado = true;
  editar_categoria  = 0;
  editar_lamina     = 0;
  editar_rafia      = 0;
  texto = "";
  constructor(public servicio:ServiceService,private animationCtrl: AnimationController,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.cargarFormulario();
    this.setPage1(1);
    this.listarCategoria();
    this.listarProductos();
    this.con_resultado = false;
    this.listarLaminas();
    this.listarRafias();
  }

  cargarFormulario(){
    this.myFormProducto = this.formBuilder.group({
      codigo       : [{value: '', disabled: false}, [Validators.required]],
      producto     : ['', [Validators.required]],
      precio       : ['', [Validators.required]],
      cantidad     : ['', [Validators.required]],
      rotulacion   : ['', [Validators.required]],
    });
  }

  listarLaminas(){
    this.servicio.listarParametro(1).subscribe( respuesta => {
      this.parametro = respuesta;
      console.log("parametros", this.parametro);
    })
  }

  listarRafias(){
    
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.agregar = 'Agregar producto';
    this.botonAgregar = 'REGISTRAR';
    this.marcar = true;
    this.agregarestado = true;
    this.editar_categoria   = 0;
    this.editar_lamina      = 0;
    this.editar_rafia       = 0;
    this.myFormProducto.controls["codigo"].enable();
  }

  setPage1(page: number) {
    this.pager = this.servicio.getPager(this.productos.length, page);
    this.pagedItems = this.productos.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paginacion",this.pagedItems)
  }

  listarProductos(){
    this.servicio.listarProducto().subscribe( respuesta => {
      console.log("productoos", respuesta)
      this.productos = respuesta;
      this.filtro = this.productos;
      this.setPage1(1);
    })
  }

  listarCategoria(){
    this.servicio.listarCategoria().subscribe( respuesta => {
      console.log("categorias", respuesta);
      if(respuesta.length > 0){
        this.listaCategorias = respuesta;
      }

    })
  }

  seleccionarCategoria(event:any){
    console.log("evento",event);
    this.producto.prod_cat_id = Number(event);
    this.editar_categoria = Number(event);
  }

  seleccionarLamina(event:any){
    console.log("evento",event);
    this.producto.para_lamina = Number(event);
    this.editar_lamina = Number(event);
  }

  seleccionarRafia(event:any){
    console.log("evento",event);
    this.producto.para_rafia = Number(event);
    this.editar_rafia = Number(event);
  }

  registrar(){
    this.producto.prod_codigo = this.myFormProducto.value.codigo;
    this.producto.prod_nombre = this.myFormProducto.value.producto;
    this.producto.prod_precio = this.myFormProducto.value.precio;
    this.producto.prod_cantidad    = this.myFormProducto.value.cantidad;
    this.marcar ? this.producto.prod_estado = 0 : this.producto.prod_estado = 1;
    console.log("producto",this.producto);
    if(this.agregarestado){
      if(this.producto.prod_codigo == '' || this.producto.prod_nombre == ''){
        this.servicio.toast('top','Debe ingresar correctamente los datos obligatorios (*)','warning');
      }else if(this.editar_categoria == 0){
        this.servicio.toast('top','Debe seleccionar una categoría','warning');
      }else{
        this.spinnerService.show();
        this.isModalOpen = false;
        this.servicio.registrarProducto(this.producto).subscribe( respuesta => {
          if(respuesta.est == 'success'){
            setTimeout(() => {
              this.spinnerService.hide();
              this.servicio.toast('top',respuesta.message,'success');
              this.myFormProducto.reset();
              this.listarProductos();
            }, 1000);
          }else{
            setTimeout(() => {
              this.spinnerService.hide();
              this.isModalOpen = true;
              this.servicio.toast('top',respuesta.message,'error')
            }, 1000);
          }
        })
      }
    }else{
      this.spinnerService.show();
      this.isModalOpen = false;
      console.log("producto a editar", this.producto);
      this.servicio.editarProducto(this.producto.prod_id,this.producto).subscribe( respuesta => {
        console.log("respuesta", respuesta);
        if(respuesta.est == 'success'){
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.mensaje,'success');
            this.myFormProducto.reset();
            this.listarProductos();
          }, 1000);
        }else{
          setTimeout(() => {
            this.spinnerService.hide();
            this.isModalOpen = true;
            this.servicio.toast('top',respuesta.mensaje,'error')
          }, 1000);
        }
      })
    }

  }

  marcarEstado(marcar:any){
    console.log("evento", marcar)
    this.marcar = marcar.detail.checked;
  }

  editar(prod:Producto){
    //console.log("categoria", cate)
    this.producto = prod;
    this.agregar = 'Editar producto';
    this.botonAgregar = 'EDITAR';
    this.isModalOpen = true;
    this.myFormProducto.controls["codigo"].disable();
    this.myFormProducto.controls["codigo"].setValue(prod.prod_codigo);
    this.myFormProducto.controls["producto"].setValue(prod.prod_nombre);
    this.myFormProducto.controls["cantidad"].setValue(prod.prod_cantidad);
    this.myFormProducto.controls["precio"].setValue(prod.prod_precio);
    prod.prod_estado == 0 ? this.marcar = true : this.marcar = false;
    this.editar_categoria = Number(prod.prod_cat_id);
    this.editar_lamina    = Number(prod.para_lamina);
    this.editar_rafia     = Number(prod.para_rafia);
    this.agregarestado = false;


  }

  async eliminar(prod:Producto) {
    const alert = await this.alertController.create({
      header: 'Eliminar el producto: ' + prod.prod_nombre + "!",
      mode: 'ios',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'SI',
          role: 'confirm',
          handler: () => {
            this.spinnerService.show();
            this.servicio.eliminarProducto(prod.prod_id,prod).subscribe( respuesta => {
              if(respuesta.est){
                setTimeout(() => {
                  this.spinnerService.hide();
                  this.servicio.toast('top',respuesta.mensaje,'success');
                  this.listarProductos();
                }, 1000);
              }
            })
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  busquedaGeneral() {
    if (this.texto.length === 0) {
      this.pagedItems = this.filtro;
      this.setPage1(1);
    } else {
      this.pagedItems = this.filtro.filter((item) => {
        return (
          item.prod_nombre.toUpperCase().includes(this.texto.toUpperCase())
        );
      });
      console.log("en filtro", this.pagedItems)
      this.setPage(1,this.pagedItems);
    }
  }


  setPage(page: number,prod:Producto[]) {
    this.pager = this.servicio.getPager(prod.length, page);
    this.pagedItems = prod.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paginacion",this.pagedItems)
  }

}
