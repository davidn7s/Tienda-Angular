import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../global-service.service';
import { Producto } from '../modelo/Producto';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit{
  producto:Producto= new Producto();
  sub:any;
  cantidad:number=1

  private usu:Usuario= new Usuario();


  constructor(private route: ActivatedRoute,
    private globalService:GlobalServiceService,
    private router:Router) {}

  ngOnInit(): void {
    this.sub=this.route.params.subscribe(params=>{
      this.producto=Producto.createFromJsonObject(params)
      console.log(this.producto)
    })

    this.usu=this.globalService.usuarioGlobal;
    
  }


  comprar(){
    if(this.usu.id==undefined){
      alert('Debe iniciar sesión para poder comprar')
      this.router.navigate(['/login'])
    }

    //IMPLEMENTAR AÑADIR AL CARRITO DEL CLIENTE
    console.log(this.cantidad)
  }

  comprobar(){
    if(this.cantidad>this.producto.stock){
      this.cantidad=this.producto.stock;
    }else if(this.cantidad<=0){
      this.cantidad=1;
    }
  }

}
