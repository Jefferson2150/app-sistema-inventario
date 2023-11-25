import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioHomePage } from './inicio-home.page';

describe('InicioHomePage', () => {
  let component: InicioHomePage;
  let fixture: ComponentFixture<InicioHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InicioHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
