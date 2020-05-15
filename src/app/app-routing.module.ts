import { RegisteremployeComponent } from './web/serviHome/registeremploye/registeremploye.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './web/login/login.component';
import { RegisterComponent } from './web/register/register.component';
import { ConocenosComponent } from './web/home/conocenos/conocenos.component';
import { ContactoComponent } from './web/home/contacto/contacto.component';
import { ServiciosComponent } from './web/home/servicios/servicios.component';
import { HomeComponent } from './web/home/home/home.component';
import { SidebarComponent } from './widget/sidebar/sidebar.component';
import { ActivarComponent } from './web/serviHome/activar/activar.component';
import { InicioComponent } from './web/serviHome/inicio/inicio.component';
import { TopbarComponent } from './widget/topbar/topbar.component';
import { AutosClienteComponent } from './web/cliente/autos-cliente/autos-cliente.component';
import { ReservarComponent } from "./web/serviHome/cliente/reservar/reservar.component";
import { EditarClienteComponent } from "./web/serviHome/cliente/editar-cliente/editar-cliente.component";
import { ClientesempComponent } from "./web/serviHome/empleado/clientesemp/clientesemp.component";
import { EmpleadosAdminComponent } from "./web/serviHome/empleado/empleados-admin/empleados-admin.component";
import {AuthGuard} from "./guards/auth.guard"
import { RoleGuard } from './guards/role.guard';

const APP_ROUTES: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: '', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'activar', component: ActivarComponent, canActivate: [ AuthGuard ] },
  { path: 'inicio', component: InicioComponent },
  { path: 'topbar', component: TopbarComponent },
  { path: 'registeremploye', component: RegisteremployeComponent, canActivate: [ AuthGuard ] },
  { path: 'autoscliente', component: AutosClienteComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_CLIENT'} },
  { path: 'reservar', component: ReservarComponent, canActivate: [ AuthGuard ] },
  { path: 'editardatoscliente', component: EditarClienteComponent, canActivate: [ AuthGuard ] },
  { path: 'verclientes', component: ClientesempComponent, canActivate: [ AuthGuard,RoleGuard ], data: {role: 'ROLE_ADMIN'} },
  { path: 'verempleados', component: EmpleadosAdminComponent, canActivate: [ AuthGuard,RoleGuard ], data: {role: 'ROLE_ADMIN'} },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
