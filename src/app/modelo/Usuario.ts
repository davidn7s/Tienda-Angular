export class Usuario{
    id!:string;
    nombre!:string;
    apellidos!:string;
    email!:string;

    cod_postal!:number;
    direccion!:string;
    telefono!:number;
    
    //pedidosRealizados:Pedido[];
    //productosCarro:ProductoCarro[];

    constructor() {
    }

    static createFromJsonObject(usuarioJson: any):Usuario {
        let usuario:Usuario=new Usuario();
        //El nombre del usuariojson es el mismo que en el archivo json
        
        usuario.id=usuarioJson['id'];
        usuario.direccion=usuarioJson['direccion'];
        usuario.nombre=usuarioJson['nombre'];
        usuario.apellidos=usuarioJson['apellidos'];
        usuario.email=usuarioJson['email'];
        usuario.cod_postal=usuarioJson['cod_postal'];
        usuario.telefono=usuarioJson['telefono'];
      
       
        /*if(usuarioJson['pedidosRealizados'] != null){
            usuario.pedidosRealizados = new Array<Pedido>();
            usuarioJson['pedidosRealizados'].forEach(pedidoRealizadosJson => {
                usuario.pedidosRealizados.push(Pedido.createFromJsonObject(pedidoRealizadosJson));
            });
        }
        if(usuarioJson['productosCarro'] != null){
            usuario.productosCarro = new Array<ProductoCarro>();
            usuarioJson['productosCarro'].forEach(productosCarroJson => {
                usuario.productosCarro.push(ProductoCarro.createFromJsonObject(productosCarroJson));
            });
        }*/
        return usuario;
    }
}