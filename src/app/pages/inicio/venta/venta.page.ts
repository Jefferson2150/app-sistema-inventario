import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  isModalOpen = false;
  productos= [
    {
      codigo: 1,
      producto: 'Coca cola',
      precio: 5,
      cantidad: 1

    },
    {
      codigo: 1,
      producto: 'Inka cola',
      precio: 10,
      cantidad: 1

    },
    {
      codigo: 1,
      producto: 'Leche Gloria',
      precio: 10,
      cantidad: 1

    },
    {
      codigo: 1,
      producto: 'Tallarin Victorio',
      precio: 10,
      cantidad: 1

    },
    {
      codigo: 1,
      producto: 'Cereales Ángel',
      precio: 10,
      cantidad: 1

    }
  ]
  constructor() { }

  ngOnInit() {
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
