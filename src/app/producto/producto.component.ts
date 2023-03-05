import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { GlobalServiceService } from '../global-service.service';
import { Producto } from '../modelo/Producto';
import { ProductoCarro } from '../modelo/ProductoCarro';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  producto: Producto = new Producto();
  sub: any;
  cantidad: number = 1

  private usu: Usuario = new Usuario();


  constructor(private route: ActivatedRoute,
    private globalService: GlobalServiceService,
    private router: Router,
    private fireService:FireServiceProvider) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.producto = Producto.createFromJsonObject(params)
    })

    this.usu = this.globalService.usuarioGlobal;

  }


  comprar() {
    if (this.usu.id == undefined) {
      alert('Debe iniciar sesión para poder comprar')
      this.router.navigate(['/login'])
    } else {
      let control = false;

      //Si el producto existia, añadimos la cantidad
      this.usu.productosCarro.forEach((pC) => {
        if (pC.producto.id == this.producto.id) {
          control = true;
          console.log('Cantidad',this.cantidad)
          pC.cantidad =pC.cantidad + this.cantidad;
          console.log(pC.cantidad)
        }
      })

      //Añadimos el producto al carro del cliente si no existe
      if (!control) {
        let productoCarro: ProductoCarro = new ProductoCarro();
        productoCarro.producto = this.producto;
        productoCarro.cantidad = this.cantidad;
        this.usu.productosCarro.push(productoCarro)
      }


      this.fireService.modificarUsuario(this.usu)
      .then(()=>{

      }).catch((error:string)=>{
        console.log(error)
      })

      this.router.navigate(['/carrito'])
    }

  }

  comprobar() {
    if (this.cantidad > this.producto.stock) {
      this.cantidad = this.producto.stock;
    } else if (this.cantidad <= 0) {
      this.cantidad = 1;
    }
  }

}
