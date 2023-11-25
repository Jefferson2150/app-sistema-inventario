import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaVentaPage } from './lista-venta.page';

describe('ListaVentaPage', () => {
  let component: ListaVentaPage;
  let fixture: ComponentFixture<ListaVentaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
