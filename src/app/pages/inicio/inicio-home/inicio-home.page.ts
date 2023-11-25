import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

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
  constructor() { }

  ngOnInit() {
  }
  

}
