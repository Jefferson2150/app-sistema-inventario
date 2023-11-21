import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
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
  constructor(private servicio:ServiceService,private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.setPage(1);
    this.con_resultado = false;
  }

  setPage(page: number) {
    this.pager = this.servicio.getPager(this.categorias.length, page);
    this.pagedItems = this.categorias.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paginacion",this.pagedItems)
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
