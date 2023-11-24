import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, AnimationController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Categoria } from 'src/app/estructura/clases/categoria';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  public pagedItems   : any[]      = [];
  public pager        : any = {};
  categorias = [
    { id: 1, nombre: 'Gaseosa', estado:'Activo', estado_n:0},
    { id: 1, nombre: 'Aceite', estado:'Inactivo', estado_n:1}
  ];
  sin_resultado = false;
  con_resultado = true;
  isModalOpen = false;
  myFormCategoria!   : FormGroup;
  categoria :Categoria =  new Categoria();
  marcar = true;
  listaCategorias : Categoria[] = [];
  agregar = 'Agregar categoría';
  botonAgregar = 'REGISTRAR';
  agregarestado = true;
  handlerMessage = '';
  roleMessage = '';
  texto = "";
  filtro :any[] = [];
  constructor(private servicio:ServiceService,private animationCtrl: AnimationController,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,private alertController: AlertController) { }

  ngOnInit() {
    this.cargarFormulario();
    this.listarCategoria();
    this.con_resultado = false;
  }

  cargarFormulario(){
    this.myFormCategoria = this.formBuilder.group({
      nombreCategoria       : ['', [Validators.required]],
      descripcionCategoria  : ['',],
    });
  }

  marcarEstado(marcar:any){
    console.log("evento", marcar)
    this.marcar = marcar.detail.checked;
  }

  registrar(){
    if(this.agregarestado){
      console.log("marcar", this.marcar)
      this.marcar ? this.categoria.cat_estado = 0 : this.categoria.cat_estado = 1;
      this.categoria.cat_nombre = this.myFormCategoria.value.nombreCategoria;
      this.categoria.cat_descripcion = this.myFormCategoria.value.descripcionCategoria;
      if(this.categoria.cat_nombre.length == 0){
        this.servicio.toast('top','Ingrese nombre correctamente','warning');
      }else{
        this.spinnerService.show();
        this.isModalOpen = false;
        this.servicio.registrarCategoria(this.categoria).subscribe( respuesta => {
          console.log("respuesta", respuesta);
          if(respuesta.est == 'success'){
            setTimeout(() => {
              this.spinnerService.hide();
              this.servicio.toast('top',respuesta.message,'success');
              this.myFormCategoria.reset();
              this.listarCategoria();
            }, 1000);
          }else{
            setTimeout(() => {
              this.spinnerService.hide();
              this.isModalOpen = true;
              this.servicio.toast('top',respuesta.message,'error')
            }, 1000);
          }
        },_error => {
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top','Error de conexión','error')
            this.isModalOpen = true;
          }, 1000);
        })
  
      }
    }else{
        console.log("editar",this.categoria);
        this.spinnerService.show();
        this.isModalOpen = false;
        this.marcar ? this.categoria.cat_estado = 0 : this.categoria.cat_estado = 1;
        this.categoria.cat_nombre = this.myFormCategoria.value.nombreCategoria;
        this.categoria.cat_descripcion = this.myFormCategoria.value.descripcionCategoria;
        this.servicio.editarCategoria(this.categoria.cat_id,this.categoria).subscribe( respuesta => {
          console.log("respuesta", respuesta);
          if(respuesta.est == 'success'){
            setTimeout(() => {
              this.spinnerService.hide();
              this.servicio.toast('top',respuesta.mensaje,'success');
              this.myFormCategoria.reset();
              this.listarCategoria();
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

  editar(cate:Categoria){
    console.log("categoria", cate)
    this.categoria = cate;
    this.agregar = 'Editar categoría';
    this.botonAgregar = 'EDITAR';
    this.isModalOpen = true;
    this.myFormCategoria.controls["nombreCategoria"].setValue(cate.cat_nombre);
    this.myFormCategoria.controls["descripcionCategoria"].setValue(cate.cat_descripcion);
    cate.cat_estado == 0 ? this.marcar = true : this.marcar = false;
    this.agregarestado = false;
  }

  async eliminar(cate:Categoria) {
    const alert = await this.alertController.create({
      header: 'Eliminar la categoría ' + cate.cat_nombre + "!",
      mode: 'ios',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.spinnerService.show();
            this.servicio.eliminarCategoria(cate.cat_id,cate).subscribe( respuesta => {
              if(respuesta.est){
                setTimeout(() => {
                  this.spinnerService.hide();
                  this.servicio.toast('top',respuesta.mensaje,'success');
                  this.listarCategoria();
                }, 1000);
              }
            })
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  busquedaGeneral() {
    if (this.texto.length === 0) {
      this.pagedItems = this.filtro;
      this.setPage1(1);
    } else {
      this.pagedItems = this.filtro.filter((item) => {
        return (
          item.cat_nombre.toUpperCase().includes(this.texto.toUpperCase()) ||
          item.cat_descripcion.toUpperCase().includes(this.texto.toUpperCase())
        );
      });
      console.log("en filtro", this.pagedItems)
      this.setPage(1,this.pagedItems);
    }
  }

  listarCategoria(){
    this.servicio.listarCategoria().subscribe( respuesta => {
      console.log("categorias", respuesta);
      if(respuesta.length > 0){
        this.listaCategorias = respuesta;
        this.filtro = this.listaCategorias;
        this.setPage1(1);
      }

    })
  }

  setPage1(page: number) {
    this.pager = this.servicio.getPager(this.listaCategorias.length, page);
    this.pagedItems = this.listaCategorias.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paginacion",this.filtro)
  }

  setPage(page: number,cate:Categoria[]) {
    this.pager = this.servicio.getPager(cate.length, page);
    this.pagedItems = cate.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paginacion",this.pagedItems)
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.marcar = true;
    this.agregar = 'Agregar categoría';
    this.botonAgregar = 'REGISTRAR';
    this.agregarestado = true;
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
