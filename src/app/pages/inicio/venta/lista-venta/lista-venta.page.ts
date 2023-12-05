import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Venta } from 'src/app/estructura/clases/venta';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.page.html',
  styleUrls: ['./lista-venta.page.scss'],
})
export class ListaVentaPage implements OnInit {

  ventas : Venta[] = [];
  constructor(public servicio:ServiceService,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,private alertController: AlertController) { }

  ngOnInit() {
    this.listarVentas();
  }

  listarVentas(){
    this.servicio.listarVentas().subscribe( respuesta => {
      console.log("ventas", respuesta)
      this.ventas = respuesta;
    })
  }



}
