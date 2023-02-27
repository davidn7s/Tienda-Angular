import { Component, Input } from '@angular/core';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent {

  public navigate: any;
  private usuarioGlobal: Usuario = new Usuario();

  constructor(){
    this.menu()
  }

  menu(){
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
      },

    ];
  }

 
}
