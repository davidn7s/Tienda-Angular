import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { GlobalServiceService } from '../global-service.service';
import { Categoria } from '../modelo/Categoria';
import { Producto } from '../modelo/Producto';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-guitarras',
  templateUrl: './guitarras.component.html',
  styleUrls: ['./guitarras.component.scss']
})
export class GuitarrasComponent {
  categorias:Array<Categoria>= new Array<Categoria>();
  guitarras:Array<Producto>= new Array<Producto>();
  usu:Usuario= new Usuario();
  textoBuscar:any=''

  constructor(private fireService:FireServiceProvider,
              private globalService:GlobalServiceService,
              private router:Router){}

  ngAfterViewInit(){
    this.usu=this.globalService.usuarioGlobal;
    this.getGuitarras();
   
  }

  getGuitarras(){
    this.fireService.getCategorias()
    .then((element)=>{
      this.categorias=element;

      this.categorias.forEach((data)=>{
        data.productos.forEach((producto)=>{
          if(producto.categoria=='Guitarra'){
                this.guitarras.push(producto);
          }
        })
      })


    }).catch((error:string)=>{
      console.log(error)
    })
  }

  producto(producto:any){
    this.router.navigate(['/producto', producto])
  }

  update(producto:any){
    this.router.navigate(['/crear',producto])
  }

  borrar(p: any) {
    //Elimino el producto del array
    this.guitarras.splice(this.guitarras.indexOf(p), 1);


    let categoria = new Categoria();
    categoria.id = 'Guitarras';
    categoria.nombre = 'Guitarras';
    categoria.productos = this.guitarras;

    //Modifico la categoria con el producto borrado
    this.fireService.modificarCategoria(categoria)
      .then(() => {

      }).catch((error) => {
        console.log(error)
      })

  }
}
