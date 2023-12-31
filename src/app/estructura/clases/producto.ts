export class Producto {
    prod_id         : number = 0;
    prod_codigo     : string = "PROD-00124512";
    prod_nombre     : string = "demo prod";
    prod_precio     : number = 52.85;
    prod_cantidad   : number = 500;
    prod_cat_id     : number = 3;
    prod_estado     : number = 0;
    prod_cantidad_venta : number = 0;
    prod_rotulacion : string = '';
    para_rafia      : number = 0;
    para_lamina     : number = 0;
}

export class ProductoMasVendido {
    cantidad        : string = '';
    vent_producto   : string= '';
}