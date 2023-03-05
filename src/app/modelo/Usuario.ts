import { ProductoCarro } from "./ProductoCarro";

export class Usuario{
    id!:string;
    nombre!:string;
    apellidos!:string;
    email!:string;

    cod_postal!:number;
    direccion!:string;
    telefono!:number;


    administrador:boolean=false;
    
    productosCarro:ProductoCarro[]=[];

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
        usuario.administrador=usuarioJson['administrador'];

        if(usuario.administrador==undefined ||usuario.administrador==null){
            usuario.administrador=false;
        }
      
       
       
        if(usuarioJson['productosCarro'] != null){
            usuario.productosCarro = new Array<ProductoCarro>();
            usuarioJson['productosCarro'].forEach((productosCarroJson:any) => {
                usuario.productosCarro.push(ProductoCarro.createFromJsonObject(productosCarroJson));
            });
        }
        return usuario;
    }
}