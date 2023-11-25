import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Proveedor } from 'src/app/estructura/clases/proveedor';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage  implements OnInit {

  isModalOpen   = false;
  agregar       = 'Agregar proveedor';
  botonAgregar  = 'REGISTRAR';
  myFormProveedor!   : FormGroup;
  marcar        = true;
  editar_proveedor = 0;
  agregarestado = true;
  proveedor: Proveedor = new Proveedor();
  proveedores: Proveedor[] = [];
  filtro :any[] = [];
  public pagedItems   : any[]      = [];
  public pager        : any = {};
  sin_resultado = false;
  con_resultado = true;
  constructor(public servicio:ServiceService,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,private alertController: AlertController) { }

  ngOnInit() {
    this.cargarFormulario();
    this.listarProveedor();
  }


  cargarFormulario(){
    this.myFormProveedor = this.formBuilder.group({
      nombre        : [{value: '', disabled: false}, [Validators.required]],
      telefono      : ['', [Validators.required]],
      ruc           : ['', [Validators.required]],
      correo        : ['', [Validators.required]],
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.agregar = 'Agregar proveedor';
    this.botonAgregar = 'REGISTRAR';
    this.marcar = true;
    this.agregarestado = true;
    /*   
    this.editar_categoria = 0;
    this.myFormProducto.controls["codigo"].enable(); */
  }

  marcarEstado(marcar:any){
    console.log("evento", marcar)
    this.marcar = marcar.detail.checked;
  }

  listarProveedor(){
    this.servicio.listarProveedor().subscribe( respuesta => {
      this.proveedores = respuesta;
      this.filtro = this.proveedores;
      this.setPage1(1);
    })
  }

  setPage1(page: number) {
    this.pager = this.servicio.getPager(this.proveedores.length, page);
    this.pagedItems = this.proveedores.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paginacion",this.pagedItems)
  }

  registrar(){
    this.proveedor.prov_nombre    = this.myFormProveedor.value.nombre;
    this.proveedor.prov_telefono  = this.myFormProveedor.value.telefono;
    this.proveedor.prov_ruc       = this.myFormProveedor.value.ruc;
    this.proveedor.prov_correo    = this.myFormProveedor.value.correo;
    this.marcar ? this.proveedor.prov_estado = 0 : this.proveedor.prov_estado = 1;
    this.spinnerService.show();
    this.isModalOpen = false;
    if(this.agregarestado){
      this.servicio.registrarProveedor(this.proveedor).subscribe( respuesta => {
        if(respuesta.est == 'success'){
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.message,'success');
            this.myFormProveedor.reset();
            this.listarProveedor();
          }, 1000);
        }else{
          setTimeout(() => {
            this.spinnerService.hide();
            this.isModalOpen = true;
            this.servicio.toast('top',respuesta.message,'error')
          }, 1000);
        }
      })
    }else{
      this.servicio.editarProveedor(this.proveedor.prov_id,this.proveedor).subscribe( respuesta => {
        if(respuesta.est == 'success'){
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.message,'success');
            this.myFormProveedor.reset();
            this.listarProveedor();
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

  }

  editar(prov:Proveedor){
    console.log("proveedor", prov)
    this.proveedor = prov;
    this.agregar = 'Editar proveedor';
    this.botonAgregar = 'EDITAR';
    this.isModalOpen = true;
    this.myFormProveedor.controls["nombre"].setValue(prov.prov_nombre);
    this.myFormProveedor.controls["telefono"].setValue(prov.prov_telefono);
    this.myFormProveedor.controls["ruc"].setValue(prov.prov_ruc);
    this.myFormProveedor.controls["correo"].setValue(prov.prov_correo);
    prov.prov_estado == 0 ? this.marcar = true : this.marcar = false;
    //this.editar_proveedor = Number(prod.prod_cat_id);
    this.agregarestado = false;


  }

  async eliminar(prov:Proveedor) {
    const alert = await this.alertController.create({
      header: 'Eliminar el proveedor: ' + prov.prov_nombre + "!",
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
            this.servicio.eliminarProveedor(prov.prov_id,prov).subscribe( respuesta => {
              if(respuesta.est){
                setTimeout(() => {
                  this.spinnerService.hide();
                  this.servicio.toast('top',respuesta.mensaje,'success');
                  this.listarProveedor();
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

  usuarios = [
    { id: 1, nombre: 'Usuario 1', email: 'usuario1@email.com' },
    { id: 2, nombre: 'Usuario 2', email: 'usuario2@email.com' },
    // Agrega más usuarios según sea necesario
  ];
}
