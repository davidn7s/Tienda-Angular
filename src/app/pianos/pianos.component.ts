import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { GlobalServiceService } from '../global-service.service';
import { Categoria } from '../modelo/Categoria';
import { Producto } from '../modelo/Producto';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-pianos',
  templateUrl: './pianos.component.html',
  styleUrls: ['./pianos.component.scss']
})
export class PianosComponent {

  categorias: Array<Categoria> = new Array<Categoria>();
  pianos: Array<Producto> = new Array<Producto>();
  usu: Usuario = new Usuario();
  textoBuscar: any = ''

  constructor(private fireService: FireServiceProvider,
    private globalService: GlobalServiceService,
    private router: Router) { }

  ngAfterViewInit() {
    this.usu = this.globalService.usuarioGlobal;
    this.getPianos();

  }

  getPianos() {
    this.fireService.getCategorias()
      .then((element) => {
        this.categorias = element;

        this.categorias.forEach((data) => {
          data.productos.forEach((producto) => {
            if (producto.categoria == 'Piano') {
              this.pianos.push(producto);
            }
          })
        })


      }).catch((error: string) => {
        console.log(error)
      })
  }

  producto(producto: any) {
    this.router.navigate(['/producto', producto])
  }

  update(producto: any) {
    this.router.navigate(['/crear', producto])
  }

  borrar(p: any) {
    //Elimino el producto del array
    this.pianos.splice(this.pianos.indexOf(p), 1);


    let categoria = new Categoria();
    categoria.id = 'Piano';
    categoria.nombre = 'Piano';
    categoria.productos = this.pianos;

    //Modifico la categoria con el producto borrado
    this.fireService.modificarCategoria(categoria)
      .then(() => {

      }).catch((error) => {
        console.log(error)
      })

  }
}
