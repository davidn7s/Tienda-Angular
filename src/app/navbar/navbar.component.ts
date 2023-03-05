import { Component, Input } from '@angular/core';
import { FirebaseAuthService } from 'src/providers/api-service/firebase-auth-service';
import { GlobalServiceService } from '../global-service.service';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent {

  @Input() usu:Usuario= new Usuario();

  public navigate: any;
  usuarioGlobal: Usuario = new Usuario();

  constructor(private globalService:GlobalServiceService,
    private authService:FirebaseAuthService){
    this.menu()
  }

  menu(){
    this.usuarioGlobal=this.globalService.usuarioGlobal;

    if(!this.usuarioGlobal.administrador){
      this.navigate = [
        {
          title: 'Pianos',
          url: '/pianos',
        },
        {
          title: 'Guitarras',
          url: '/guitarras',
        },      
        {
          title: 'Viento Metal',
          url: '/vmetal',
        },
        {
          title: 'Viento madera',
          url: '/vmadera',
        },
        {
          title: 'Acerca de',
          url: '/acerca',
        }
      ];
    }else{
      this.navigate = [
        {
          title: 'Pianos',
          url: '/pianos',
        },
        {
          title: 'Guitarras',
          url: '/guitarras',
        },      
        {
          title: 'Viento Metal',
          url: '/vmetal',
        },
        {
          title: 'Viento madera',
          url: '/vmadera',
        },
        {
          title:'Nuevo Producto',
          url:'/crear'
        },
        {
          title: 'Acerca de',
          url: '/acerca',
        }
      ];
    }
  }


  logOut(){
    this.usuarioGlobal=new Usuario();
    this.globalService.usuarioGlobal=new Usuario();
    this.authService.logoutUser();
    window.location.replace('/home')
  }

  conectado(){
    this.usuarioGlobal=this.globalService.usuarioGlobal;
    this.menu();
    if(this.usuarioGlobal.id!=undefined){
      return true;
    }else{
      return false;
    }
  }



 
}
