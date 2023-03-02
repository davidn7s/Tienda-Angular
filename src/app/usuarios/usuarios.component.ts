import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { GlobalServiceService } from '../global-service.service';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{

  usuarios:Array<Usuario>= new Array<Usuario>();

  constructor(private fireService:FireServiceProvider,
              private globalServive:GlobalServiceService,
              private router:Router){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    if(this.globalServive.usuarioGlobal.id!=undefined){
      this.getUsuarios();
    }else{
      this.router.navigate(['/home'])
    }
   
  }

  getUsuarios(){
    this.fireService.getUsuarios()
    .then((element)=>{
      this.usuarios=element;
    }).catch((error:string)=>{
      console.log(error)
    })
  }

}
