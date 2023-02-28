import { Injectable } from '@angular/core';
import { Usuario } from './modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  public usuarioGlobal:Usuario=new Usuario();

  constructor() { }

}
