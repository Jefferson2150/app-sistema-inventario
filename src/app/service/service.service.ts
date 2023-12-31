import { Injectable } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Categoria } from '../estructura/clases/categoria';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Producto } from '../estructura/clases/producto';
import { Proveedor } from '../estructura/clases/proveedor';
import { Venta } from '../estructura/clases/venta';
import { Cliente } from '../estructura/clases/cliente';
import { Compra } from '../estructura/clases/compra';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  Url = environment.urlPrincipal+'/api/v1';

  constructor(private animationCtrl: AnimationController,private toastController?: ToastController,private http?:HttpClient) { }

  registrarCategoria(categoria:Categoria){
    return this.http!.post<any>(this.Url+"/registrar_categoria",categoria);
  }

  listarCategoria(){
    return this.http!.get<any>(this.Url+`/obtener_categorias`);
  }

  editarCategoria(id:number, categoria:Categoria){
    return this.http!.put<any>(this.Url+`/editar_eliminar_categoria/`+id+`/edit`,categoria);
  }

  eliminarCategoria(id:number, categoria:Categoria){
    return this.http!.put<any>(this.Url+`/editar_eliminar_categoria/`+id+`/deleted`,categoria);
  }

  registrarProducto(producto:Producto){
    return this.http!.post<any>(this.Url+"/registrar_producto",producto);
  }

  listarProducto(){
    return this.http!.get<any>(this.Url+`/obtener_productos`);
  }

  editarProducto(id:number, producto:Producto){
    return this.http!.put<any>(this.Url+`/editar_eliminar_producto/`+id+`/edit`,producto);
  }

  eliminarProducto(id:number, producto:Producto){
    return this.http!.put<any>(this.Url+`/editar_eliminar_producto/`+id+`/deleted`,producto);
  }

  registrarProveedor(proveedor:Proveedor){
    return this.http!.post<any>(this.Url+"/registrar_proveedor",proveedor);
  }

  listarProveedor(){
    return this.http!.get<any>(this.Url+`/obtener_proveedor`);
  }

  editarProveedor(id:number, proveedor:Proveedor){
    return this.http!.put<any>(this.Url+`/editar_eliminar_proveedores/`+id+`/edit`,proveedor);
  }

  eliminarProveedor(id:number, proveedor:Proveedor){
    return this.http!.put<any>(this.Url+`/editar_eliminar_proveedores/`+id+`/deleted`,proveedor);
  }

  listarParametro(prefijo:number){
    return this.http!.get<any>(this.Url+`/parametroadmin/`+prefijo);
  }

  registrarVenta(venta:Venta){
    return this.http!.post<any>(this.Url+"/registar_venta",venta);
  }

  registrarCliente(cliente:Cliente){
    return this.http!.post<any>(this.Url+"/registrar_clientes",cliente);
  }

  listarCliente(){
    return this.http!.get<any>(this.Url+`/obtener_clientes`);
  }


  editarCliente(id:number, cliente:Cliente){
    return this.http!.put<any>(this.Url+`/editar_eliminar_clientes/`+id+`/edit`,cliente);
  }

  eliminarCliente(id:number, cliente:Cliente){
    return this.http!.put<any>(this.Url+`/editar_eliminar_clientes/`+id+`/deleted`,cliente);
  }
   
  listarVentas(){
    return this.http!.get<any>(this.Url+`/obtener_venta`);
  }

  ventasDia(fecha:any){
    return this.http!.post<any>(this.Url+`/ventas-dia`,fecha);
  }

  productosMasVendidos(){
    return this.http!.get<any>(this.Url+`/productos_mas_vendidos`);
  }

  reporteAbc(){
    return this.http!.get<any>(this.Url+`/reporte_abc/reporte`);
  }

  registrarCompra(compra:Compra){
    return this.http!.post<any>(this.Url+"/registar_compra",compra);
  }

  listarCompras(){
    return this.http!.get<any>(this.Url+`/obtener_compra`);
  }

  comprasDia(fecha:any){
    return this.http!.post<any>(this.Url+`/compras-dia`,fecha);
  }

  resumenAbc(){
    return this.http!.get<any>(this.Url+`/reporte_abc/resumen`);
  }








  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
    // calculate total pagess
    let totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 5) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 5;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
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

  async toast(position:any, descripcion:any,color:any) {
    const toast = await this.toastController!.create({
      message: descripcion,
      duration: 3500,
      color: color,
      position: position,
    });

    await toast.present();
  }

  
}
