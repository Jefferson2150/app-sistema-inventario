import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Compra } from 'src/app/estructura/clases/compra';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.page.html',
  styleUrls: ['./lista-compras.page.scss'],
})
export class ListaComprasPage implements OnInit {

  compras : Compra[] = [];
  constructor(public servicio:ServiceService,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,private alertController: AlertController, private router:Router) { }

  ngOnInit() {
    this.listarCompras();
  }

  listarCompras(){
    this.servicio.listarCompras().subscribe( respuesta => {
      this.compras = respuesta;
      console.log("compras", respuesta)
    })
  }

  detalleCompra(compra:Compra){
    this.router.navigate(["/inicio/lista-compras/detalle/"+JSON.stringify(compra.comp_id)])
  }
  

}
