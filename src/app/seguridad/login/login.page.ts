import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myFormLogin!   : FormGroup;
  constructor( private router: Router,public formBuilder: FormBuilder, private servicio:ServiceService) { }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario(){
    this.myFormLogin = this.formBuilder.group({
      usuario   : ['', [Validators.required]],
      password  : ['', [Validators.required]],
    });
  }

  ingresar() {
    if(this.myFormLogin.value.usuario == 'admin' && this.myFormLogin.value.password == '12345'){
      this.router.navigate(["inicio/inicio-home"])
    }else{
      this.servicio.toast('top','Crendeciales incorrectas','warning');
    }

  }

}
