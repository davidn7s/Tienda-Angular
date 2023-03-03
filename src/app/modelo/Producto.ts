export class Producto{
    id!: string;
    nombre!: string;
    //El tipo se refiere a la categoria
    categoria!: string;
    instrumento!:string;
    precio!: number;
    descripcion!: string;
    stock!: number;
    imagen: string='';

    constructor() {
    }

    static createFromJsonObject(productoJson: any): Producto {
        let producto: Producto = new Producto();
        producto.id = productoJson['id'];
        producto.nombre = productoJson['nombre'];
        producto.categoria = productoJson['categoria'];
        producto.instrumento = productoJson['instrumento'];
        producto.precio = productoJson['precio'];
        producto.descripcion = productoJson['descripcion'];
        producto.stock = productoJson['stock'];
        producto.imagen = productoJson['imagen'];

        return producto;
    }
}