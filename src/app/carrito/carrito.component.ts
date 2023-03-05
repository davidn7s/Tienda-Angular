import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { GlobalServiceService } from '../global-service.service';
import { Categoria } from '../modelo/Categoria';
import { Pedido } from '../modelo/Pedido';
import { Producto } from '../modelo/Producto';
import { ProductoCarro } from '../modelo/ProductoCarro';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  usuarioGlobal!: Usuario;
  productosCarro!: ProductoCarro[]


  pianos: Array<Producto> = new Array<Producto>();
  guitarras: Array<Producto> = new Array<Producto>();
  vientoMetal: Array<Producto> = new Array<Producto>();
  vientoMadera: Array<Producto> = new Array<Producto>();
  categorias: Array<Categoria> = new Array<Categoria>();


  cantidadTotal: number = 0;
  precioTotal: number = 0;

  constructor(private fireService: FireServiceProvider,
    private globalService: GlobalServiceService,
    private router: Router) { }


  ngOnInit(): void {
    this.usuarioGlobal = this.globalService.usuarioGlobal;
    this.productosCarro = this.globalService.usuarioGlobal.productosCarro;


    //Controlar que si no esta logueado no puede entrar en la página
    if (this.usuarioGlobal.productosCarro.length < 1) {
      console.log('No esta logueado')
    }

    //Calculo la cantidad total de productos y el precio total del pedido
    this.usuarioGlobal.productosCarro.forEach((data) => {
      this.cantidadTotal += data.cantidad;
      this.precioTotal += data.cantidad * data.producto.precio;
    })

    this.precioTotal = parseFloat(this.precioTotal.toFixed(2))


  }

  realizarPedido() {
    let pedido = new Pedido();
    pedido.usuario = this.usuarioGlobal;
    this.cantidadTotal;
    this.precioTotal;


    pedido.cantidadTotal = this.cantidadTotal;
    pedido.precioTotal = this.precioTotal;
    this.usuarioGlobal.productosCarro = []
    //Insertamos el pedido en firebase
    this.fireService.insertarPedido(pedido)
      .then(() => {

        //Retiramos el stock de cada producto
        alert('Pedido realizado')

        console.log(this.usuarioGlobal)

        this.fireService.modificarUsuario(this.usuarioGlobal)
          .then((data) => {

          }).catch((error: string) => {
            console.log(error)
          })

      }).catch((error: string) => {
        console.log(error)
      })

  }




  verProducto(producto: any) {
    this.router.navigate(['/producto', producto])
  }

  eliminar(productoC: any) {
    this.usuarioGlobal.productosCarro.splice(this.usuarioGlobal.productosCarro.indexOf(productoC), 1);
  }

}
