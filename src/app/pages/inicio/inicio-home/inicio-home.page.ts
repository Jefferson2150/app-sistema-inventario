import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, AnimationController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReporteABC } from 'src/app/estructura/clases/home';
import { ProductoMasVendido } from 'src/app/estructura/clases/producto';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-inicio-home',
  templateUrl: './inicio-home.page.html',
  styleUrls: ['./inicio-home.page.scss'],
})
export class InicioHomePage implements OnInit {


  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  data = [
      {
          name: 'Mariscos',
          y: 55.02
      },
      {
          name: 'Filetes',
          /* sliced: true,
          selected: true, */
          y: 26.71
      },
      {
          name: 'Pescado 1',
          y: 1.09
      },
      {
          name: 'Pescado 2',
          y: 15.5
      },
      {
          name: 'Pescado 3',
          y: 1.68
      }
  ];

  chartOptions: Highcharts.Options = {
    chart: {
      width: 400,height: 280,
    },
    title: {
        text: '',
        
    },
    responsive:{
      rules: [{
        condition: {
            maxWidth: 100,
            minWidth: 200,
        }}],
    },
    series: [

      {
        type: 'pie',
        name: 'Porcentaje',
        
        data: this.data,
      },
    ],
  };

  chartOptionsABC: Highcharts.Options = {
    chart: {
      width: 400,height: 280,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
        text: '',
        
    },
    accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
    pie: {
        dataLabels: {
            enabled: true,
            distance: -50,
            style: {
                fontWeight: 'bold',
                color: 'white'
            }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
    }
},
    responsive:{
      rules: [{
        condition: {
            maxWidth: 100,
            minWidth: 200,
        }}],
    },
    series: [

      {
        type: 'pie',
        name: 'Calsificación',
        innerSize: '50%',
        data: [
            ['A', 80.00],
            ['B', 15.00],
            ['C', 5.00],
        ]
    },
    ],
  };

  fechaHoy = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  ventasDiaSoles = 0;
  comprasDiaSoles = 0;
  cantidadClientes = 0;
  cantidadProveedores = 0;
  productosVendidos: ProductoMasVendido[] = [];
  mostrarVendidos = true;
  reporteAbcDatos: ReporteABC[] = [];
  resumenAbcDatos: ReporteABC[] = [];
  consumoTotal = 0;
  constructor(public servicio:ServiceService,private animationCtrl: AnimationController,public formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.ventasDia();
    this.clientes();
    this.proveedores();
    this.productosMasVendidos();
    this.reporteAbc();
    this.comprasDia();
    this.resumenAbc();
  }

  ventasDia(){
    let fecha = {
      fecha: this.fechaHoy
    }
    this.servicio.ventasDia(fecha).subscribe( respuesta => {
      console.log("ventas dia",respuesta);
      this.ventasDiaSoles = respuesta.ventas_dia;
    })
  }

  comprasDia(){
    let fecha = {
      fecha: this.fechaHoy
    }
    this.servicio.comprasDia(fecha).subscribe( respuesta => {
      console.log("ventas dia",respuesta);
      this.comprasDiaSoles = respuesta.compras_dia;
    })
  }

  clientes(){
    this.servicio.listarCliente().subscribe( respuesta => {
      //this.clientes = respuesta;
      console.log("clientes", respuesta.length)
      this.cantidadClientes = respuesta.length;
      //this.setPage1(1);
    })
  }

  proveedores(){
    this.servicio.listarProveedor().subscribe( respuesta => {
      this.cantidadProveedores = respuesta.length;
    })
  }

  productosMasVendidos(){
    this.servicio.productosMasVendidos().subscribe( respuesta => {
      this.productosVendidos = respuesta;
      this.data = [];
      this.productosVendidos.forEach(element => {
        this.data.push({
          name : element.vent_producto,
          y: Number(element.cantidad)
        })
      });
      this.chartOptions = {
        series: [

          {
            type: 'pie',
            name: 'Cantidades',
            
            data: this.data,
          },
        ],
      }

      this.mostrarVendidos = false;


      console.log("reesopuesta", this.productosVendidos)
    })
  }

  reporteAbc(){
    this.servicio.reporteAbc().subscribe( respuesta => {
      console.log("respuesta", respuesta);
      this.reporteAbcDatos = respuesta.resultado;
      this.reporteAbcDatos.forEach(element => {
        this.consumoTotal = this.consumoTotal+ Number(element.consumo_anual);
      });
    })
  }

  resumenAbc(){
    this.servicio.resumenAbc().subscribe( respuesta => {
      console.log("resumen", respuesta);
      this.resumenAbcDatos = respuesta.resultado;
    })
  }


  

}
