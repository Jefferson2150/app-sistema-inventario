import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Compra } from 'src/app/estructura/clases/compra';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
})
export class DetalleCompraPage implements OnInit {

  compra : Compra = new Compra();
  compra_n= 0;
  compras : Compra[] = [];
  constructor(private routeparams: ActivatedRoute,public servicio:ServiceService) { }

  ngOnInit() {
    this.listarCompras();
    this.compra_n =  JSON.parse(this.routeparams.snapshot.params['id']);
    console.log("venta detalle", this.compra);
  }

  atras(){
    window.history.back();
  }

  listarCompras(){
    this.servicio.listarCompras().subscribe( respuesta => {
      console.log("ventas", respuesta)
      this.compras = respuesta;
      let encontro:any = this.compras.find( x => x.comp_id == this.compra_n);
      this.compra = encontro;
      console.log("encontrox", encontro)
    })
  }
}
