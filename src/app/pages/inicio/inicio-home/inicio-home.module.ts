import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioHomePageRoutingModule } from './inicio-home-routing.module';

import { InicioHomePage } from './inicio-home.page';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioHomePageRoutingModule,
    HighchartsChartModule
  ],
  declarations: [InicioHomePage]
})
export class InicioHomePageModule {}
