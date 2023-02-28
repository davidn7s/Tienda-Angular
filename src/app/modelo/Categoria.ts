import { Producto } from "./Producto";

export class Categoria{
    id!:string;
    nombre!:string;
    productos!:Producto[];


    constructor(){

    }

    static createFromJsonObject(categoriaJson: any):Categoria {
        let categoria:Categoria=new Categoria();
        
        categoria.id=categoriaJson['id'];
        categoria.nombre=categoriaJson['nombre'];
        if(categoriaJson['productos'] != null){
            categoria.productos = new Array<Producto>();
            categoriaJson['productos'].forEach((productoJson: any) => {
                categoria.productos.push(Producto.createFromJsonObject(productoJson));
            });
        
        }
        return categoria;
    }
}