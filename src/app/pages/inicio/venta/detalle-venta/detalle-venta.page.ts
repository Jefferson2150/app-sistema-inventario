import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Venta } from 'src/app/estructura/clases/venta';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.page.html',
  styleUrls: ['./detalle-venta.page.scss'],
})
export class DetalleVentaPage implements OnInit {

 venta : Venta = new Venta();
  venta_n= 0;
  ventas : Venta[] = [];
  constructor(private routeparams: ActivatedRoute,public servicio:ServiceService) { }

  ngOnInit() {
    this.listarVentas();
    this.venta_n =  JSON.parse(this.routeparams.snapshot.params['id']);
    console.log("venta detalle", this.venta);
  }

  atras(){
    window.history.back();
  }


  listarVentas(){
    this.servicio.listarVentas().subscribe( respuesta => {
      console.log("ventas", respuesta)
      this.ventas = respuesta;
      let encontro:any = this.ventas.find( x => x.vent_id == this.venta_n);
      this.venta = encontro
      console.log("encontrox", encontro)
    })
  }
  

}
