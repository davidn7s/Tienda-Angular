import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-guitarra',
  templateUrl: './guitarra.component.html',
  styleUrls: ['./guitarra.component.scss']
})
export class GuitarraComponent implements OnInit{

  producto:Producto= new Producto();
  sub:any;


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub=this.route.params.subscribe(params=>{
      this.producto=Producto.createFromJsonObject(params)
      console.log(this.producto)
    })
    
  }

}
