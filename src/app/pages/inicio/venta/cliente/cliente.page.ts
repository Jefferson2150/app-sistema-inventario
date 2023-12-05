import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/estructura/clases/cliente';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  clientes : Cliente[] = [];
  isModalOpen   = false;
  agregar       = 'Agregar cliente';
  botonAgregar  = 'REGISTRAR';
  marcar        = true;
  editar_cliente = 0;
  agregarestado = true;
  myFormCliente!   : FormGroup;
  cliente : Cliente = new Cliente();
  filtro :any[] = [];
  constructor(public servicio:ServiceService,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,private alertController: AlertController) { }

  ngOnInit() {
    this.cargarFormulario();
    this.listarClientes();
  }

  listarClientes(){
    this.servicio.listarCliente().subscribe( respuesta => {
      this.clientes = respuesta;
      this.filtro = this.clientes;
      //this.setPage1(1);
    })
  }

  cargarFormulario(){
    this.myFormCliente = this.formBuilder.group({
      nombre        : [{value: '', disabled: false}, [Validators.required]],
      telefono      : ['', [Validators.required]],
      doc           : ['', [Validators.required]],
      email         : ['', [Validators.required]],
      fnacimiento   : ['', [Validators.required]],
      direccion     : ['', [Validators.required]],
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.agregar = 'Agregar cliente';
    this.botonAgregar = 'REGISTRAR';
    this.marcar = true;
    this.agregarestado = true;
  }

  marcarEstado(marcar:any){
    console.log("evento", marcar)
    this.marcar = marcar.detail.checked;
  }

  registrar(){
    this.cliente.cl_nombre    = this.myFormCliente.value.nombre;
    this.cliente.cl_telefono  = this.myFormCliente.value.telefono;
    this.cliente.cl_doc       = this.myFormCliente.value.doc;
    this.cliente.cl_email    = this.myFormCliente.value.email;
    this.cliente.cl_direccion    = this.myFormCliente.value.direccion;
    this.cliente.cl_fnacimiento    = this.myFormCliente.value.fnacimiento;
    this.marcar ? this.cliente.cl_estado = 0 : this.cliente.cl_estado = 1;
    this.spinnerService.show();
    this.isModalOpen = false;
    console.log("clienteee", this.cliente);
    if(this.agregarestado){
      this.servicio.registrarCliente(this.cliente).subscribe( respuesta => {
        console.log("respuesta", respuesta);
        if(respuesta.est == 'success'){
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.message,'success');
            this.myFormCliente.reset();
            this.listarClientes();
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
      this.servicio.editarCliente(this.cliente.cl_id,this.cliente).subscribe( respuesta => {
        console.log("respuesta", respuesta);
        if(respuesta.est == 'success'){
          setTimeout(() => {
            this.spinnerService.hide();
            this.servicio.toast('top',respuesta.mensaje,'success');
            this.myFormCliente.reset();
            this.listarClientes();
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

  editar(clie:Cliente){
    console.log("proveedor", clie)
    this.cliente = clie;
    this.agregar = 'Editar cliente';
    this.botonAgregar = 'EDITAR';
    this.isModalOpen = true;
    this.myFormCliente.controls["nombre"].setValue(clie.cl_nombre);
    this.myFormCliente.controls["telefono"].setValue(clie.cl_telefono);
    this.myFormCliente.controls["doc"].setValue(clie.cl_doc);
    this.myFormCliente.controls["email"].setValue(clie.cl_email);
    this.myFormCliente.controls["fnacimiento"].setValue(clie.cl_fnacimiento);
    this.myFormCliente.controls["direccion"].setValue(clie.cl_direccion);
    clie.cl_estado == 0 ? this.marcar = true : this.marcar = false;
    //this.editar_proveedor = Number(prod.prod_cat_id);
    this.agregarestado = false;
  }


  async eliminar(clie:Cliente) {
    const alert = await this.alertController.create({
      header: 'Eliminar el cliente: ' + clie.cl_nombre + "!",
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
            this.servicio.eliminarCliente(clie.cl_id,clie).subscribe( respuesta => {
              if(respuesta.est){
                setTimeout(() => {
                  this.spinnerService.hide();
                  this.servicio.toast('top',respuesta.mensaje,'success');
                  this.listarClientes();
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
}
