export class VentaDetalle {
    vent_id         : number = 0;
    vent_item       : number = 0;
    vent_cantidad   : number = 0;
    vent_unidad     : string = '';
    vent_producto   : string = '';
    vent_valor      : number = 0;
    vent_subtotal   : number = 0;
}


export class Venta {
    vent_id         : number = 0;
    vent_usuario    : number = 0;
    vent_cliente    : number = 0;
    vent_direccion  : string = '';
    vent_fecha      : string = '';
    venta_detalle   : VentaDetalle[] = [];
    vent_total      : number = 0;
    vent_igv        : number = 0;
    vent_subtotal   : number = 0;  
}