import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaComponent } from './acerca/acerca.component';

import { GuitarrasComponent } from './guitarras/guitarras.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path: 'acerca', component: AcercaComponent},
  {path:'registro',component:RegistroComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component: HomeComponent},
  {path:'guitarras',component:GuitarrasComponent},
  {path:'producto',component:ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
