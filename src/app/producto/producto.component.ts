import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit{
  producto:Producto= new Producto();
  sub:any;
  cantidad:number=1


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub=this.route.params.subscribe(params=>{
      this.producto=Producto.createFromJsonObject(params)
      console.log(this.producto)
    })
    
  }


  comprar(){
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
