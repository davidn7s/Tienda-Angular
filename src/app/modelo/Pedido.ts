import { Usuario } from "./Usuario";

export class Pedido{

    id!:string;
    usuario!:Usuario;
    cantidadTotal!:number;
    precioTotal!:number;

    static createFromJsonObject(PedidoJson: any):Pedido {
        let pedido:Pedido=new Pedido();
        
        pedido.id=PedidoJson['id'];
        pedido.usuario=PedidoJson['usuario'];
        pedido.cantidadTotal=PedidoJson['cantidadTotal'];
        pedido.precioTotal=PedidoJson['precioTotal'];
        
        return pedido;
    }
}