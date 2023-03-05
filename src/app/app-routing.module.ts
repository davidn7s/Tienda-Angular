import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaComponent } from './acerca/acerca.component';
import { CarritoComponent } from './carrito/carrito.component';

import { GuitarrasComponent } from './guitarras/guitarras.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PianosComponent } from './pianos/pianos.component';
import { ProductoComponent } from './producto/producto.component';
import { RegistroComponent } from './registro/registro.component';
import { UpdateProdComponent } from './update-prod/update-prod.component';
import { VientoMaderaComponent } from './viento-madera/viento-madera.component';
import { VientoMetalComponent } from './viento-metal/viento-metal.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path: 'acerca', component: AcercaComponent},
  {path:'registro',component:RegistroComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component: HomeComponent},
  {path:'guitarras',component:GuitarrasComponent},
  {path:'producto',component:ProductoComponent},
  {path:'pianos',component:PianosComponent},
  {path:'vmetal',component:VientoMetalComponent},
  {path:'vmadera',component:VientoMaderaComponent},
  {path:'crear',component:UpdateProdComponent},
  {path:'carrito',component:CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
