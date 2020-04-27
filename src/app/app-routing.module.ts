import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './web/login/login.component';
import { RegisterComponent } from './web/register/register.component';
import { ConocenosComponent } from "./web/home/conocenos/conocenos.component";
import { ContactoComponent } from "./web/home/contacto/contacto.component";
import { ServiciosComponent } from "./web/home/servicios/servicios.component";
import { HomeComponent } from "./web/home/home/home.component";
import { SidebarComponent } from "./widget/sidebar/sidebar.component";

//d
const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'conocenos', component:ConocenosComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'servicios', component:ServiciosComponent},
  {path:'', component:HomeComponent},
  { path: '', pathMatch: 'full', redirectTo: '' },
  {path:'sidebar', component:SidebarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
