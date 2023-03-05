import { Producto } from "./Producto";

export class ProductoCarro{
    
    producto!:Producto;
    cantidad!:number;
    
    constructor() {
    }

    static createFromJsonObject(ProductoCarroJson: any):ProductoCarro {
        let productoCarro:ProductoCarro=new ProductoCarro();
        
        productoCarro.producto=ProductoCarroJson['producto'];
        productoCarro.cantidad=ProductoCarroJson['cantidad'];
        
        return productoCarro;
    }
}