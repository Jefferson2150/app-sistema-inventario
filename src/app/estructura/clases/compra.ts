export class CompraDetalle {
    comp_det_id         : number = 0;
    comp_det_item       : number = 0;
    comp_det_cantidad   : number = 0;
    comp_det_unidad     : string = '';
    comp_det_producto   : string = '';
    comp_det_valor      : number = 0;
    comp_det_subtotal   : number = 0;
}


export class Compra {
    comp_id         : number = 0;
    comp_usuario    : number = 0;
    comp_proveedor  : number = 0;
    comp_direccion  : string = '';
    comp_fecha      : string = '';
    compra_detalle  : CompraDetalle[] = [];
    comp_total      : number = 0;
    comp_igv        : number = 0;
    comp_subtotal   : number = 0;
    proveedor       : string = '';
    us_username     : string = '';
    detalles        : CompraDetalle[] = [];

}