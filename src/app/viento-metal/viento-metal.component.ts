import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { GlobalServiceService } from '../global-service.service';
import { Categoria } from '../modelo/Categoria';
import { Producto } from '../modelo/Producto';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-viento-metal',
  templateUrl: './viento-metal.component.html',
  styleUrls: ['./viento-metal.component.scss']
})
export class VientoMetalComponent {
  categorias:Array<Categoria>= new Array<Categoria>();
  vmetales:Array<Producto>= new Array<Producto>();
  usu:Usuario= new Usuario();
  textoBuscar:any=''

  constructor(private fireService:FireServiceProvider,
              private globalService:GlobalServiceService,
              private router:Router){}

  ngAfterViewInit(){
    this.usu=this.globalService.usuarioGlobal;
    this.getMetales();
   
  }

  getMetales(){
    this.fireService.getCategorias()
    .then((element)=>{
      this.categorias=element;

      this.categorias.forEach((data)=>{
        data.productos.forEach((producto)=>{
          if(producto.categoria=='Viento Metal'){
                this.vmetales.push(producto);
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
    this.vmetales.splice(this.vmetales.indexOf(p), 1);


    let categoria = new Categoria();
    categoria.id = 'Viento Metal';
    categoria.nombre = 'Viento Metal';
    categoria.productos = this.vmetales;

    //Modifico la categoria con el producto borrado
    this.fireService.modificarCategoria(categoria)
      .then(() => {

      }).catch((error) => {
        console.log(error)
      })
  }
}

