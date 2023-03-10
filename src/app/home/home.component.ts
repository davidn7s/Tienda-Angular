import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { Categoria } from '../modelo/Categoria';
import { Producto } from '../modelo/Producto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  pianos:Array<Producto>= new Array<Producto>();
  guitarras:Array<Producto>= new Array<Producto>();
  vientoMetal:Array<Producto>= new Array<Producto>();
  vientoMadera:Array<Producto>= new Array<Producto>();
  categorias:Array<Categoria>= new Array<Categoria>();

  constructor(private fireService:FireServiceProvider,
              private router:Router){}



  ngOnInit(): void {
    this.fireService.getCategorias()
    .then((element)=>{
      this.categorias=element;


      this.categorias.forEach((data)=>{
        data.productos.forEach((producto)=>{
          switch(producto.categoria){
            case 'Piano':
              if(this.pianos.length<3)
                this.pianos.push(producto);
              break;
            case 'Guitarra':
              if(this.guitarras.length<3)
                this.guitarras.push(producto);
              break;
            case 'Viento Metal':
              if(this.vientoMetal.length<3)
                this.vientoMetal.push(producto);
              break;
            case 'Viento Madera':
              if(this.vientoMadera.length<3){
                this.vientoMadera.push(producto)
              }
              break;
          }
        })
      })


    }).catch((error:string)=>{
      console.log(error)
    })


    
  }




  producto(producto:Producto){
    this.router.navigate(['/producto', producto])
  }



}
