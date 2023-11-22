import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage  implements OnInit {

  constructor() { }

  ngOnInit() {}

  usuarios = [
    { id: 1, nombre: 'Usuario 1', email: 'usuario1@email.com' },
    { id: 2, nombre: 'Usuario 2', email: 'usuario2@email.com' },
    // Agrega más usuarios según sea necesario
  ];
}
