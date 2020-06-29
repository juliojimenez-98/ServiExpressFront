import { RegisteremployeComponent } from './web/serviHome/registeremploye/registeremploye.component';
import { NgModule, Component } from '@angular/core';
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
import { ReservarComponent } from "./web/serviHome/cliente/reservar/reservar.component";
import { EditarClienteComponent } from "./web/serviHome/cliente/editar-cliente/editar-cliente.component";
import { ClientesempComponent } from "./web/serviHome/empleado/clientesemp/clientesemp.component";
import { EmpleadosAdminComponent } from "./web/serviHome/empleado/empleados-admin/empleados-admin.component";
import {AuthGuard} from "./guards/auth.guard"
import { RoleGuard } from './guards/role.guard';
import { BaseComponent } from './widget/base/base.component';
import { InicioClienteComponent } from './web/serviHome/cliente/inicio-cliente/inicio-cliente.component';
import { ProgresoReservaComponent } from './web/serviHome/cliente/progreso-reserva/progreso-reserva.component';
import { HistorialReservasComponent } from './web/serviHome/cliente/historial-reservas/historial-reservas.component';
import { AutosClienteComponent } from './web/serviHome/cliente/autos-cliente/autos-cliente.component';
import { RegistroAutoComponent } from './web/serviHome/cliente/registro-auto/registro-auto.component';
import { NegocioGestionComponent } from './web/serviHome/admin/negocio-gestion/negocio-gestion.component';
import { CategoriasComponent } from './web/serviHome/admin/negocio-gestion/categorias/categorias.component';
import { ProductosComponent } from './web/serviHome/admin/negocio-gestion/productos/productos.component';
import { ServiciosNComponent } from './web/serviHome/admin/negocio-gestion/servicios-n/servicios-n.component';
import { ReservasEmpleadoComponent } from './web/serviHome/empleado/reservas-empleado/reservas-empleado.component';
import { PedidosEmpleadoComponent } from './web/serviHome/empleado/pedidos-empleado/pedidos-empleado.component';
import { EncuestaComponent } from './web/serviHome/cliente/encuesta/encuesta.component';
import { PedidosAdminComponent } from './web/serviHome/admin/pedidos-admin/pedidos-admin.component';
import { AjustesAdminComponent } from './web/serviHome/admin/ajustes-admin/ajustes-admin.component';
import { VistaPedidosAdminComponent } from './web/serviHome/admin/pedidos-admin/vista-pedidos-admin/vista-pedidos-admin.component';
import { RecibosAdminComponent } from './web/serviHome/admin/pedidos-admin/recibos-admin/recibos-admin.component';
import { ProveedoresComponent } from './web/serviHome/admin/proveedores/proveedores.component';
import { RegistrarproveedoresComponent } from './web/serviHome/admin/proveedores/registrarproveedores/registrarproveedores.component';
import { VerproveedoresComponent } from './web/serviHome/admin/proveedores/verproveedores/verproveedores.component';
import { PedidosComponent } from './web/serviHome/empleado/pedidos-empleado/pedidos/pedidos.component';
import { RecibosempComponent } from './web/serviHome/empleado/pedidos-empleado/recibosemp/recibosemp.component';



const APP_ROUTES: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: '', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'encuesta', component: EncuestaComponent},

  // USUARIO LOGUEADO
  { path: 'home', component: BaseComponent, canActivate: [ AuthGuard ] ,
  //Sidebar
  children:[
  { path: 'inicio', component: InicioComponent, canActivate: [ AuthGuard ] },
  //Sidebar Administrador
  { path: 'verclientes', component: ClientesempComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
  { path: 'registeremploye', component: RegisteremployeComponent, canActivate: [ RoleGuard, AuthGuard ], data: {role: 'ROLE_ADMIN'} },
  { path: 'verempleados', component: EmpleadosAdminComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
  { path: 'proveedores', component: ProveedoresComponent,
  children:[
    { path: 'registrarproveedores', component: RegistrarproveedoresComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'verproveedores', component: VerproveedoresComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'registrarproveedores/:idproveedor', component: RegistrarproveedoresComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
  ]},
  { path: 'pedidosadmin', component: PedidosAdminComponent,
  children:[
    { path: 'pedidos', component: VistaPedidosAdminComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'recibos', component: RecibosAdminComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
  ]},
  { path: 'ajustes', component: AjustesAdminComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
  { path: 'negociogestion', component: NegocioGestionComponent,

  children:[
    { path: 'categorias', component: CategoriasComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'categorias/:idcategoria', component: CategoriasComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'productos', component: ProductosComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'productos/:idproducto', component: ProductosComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'servicios', component: ServiciosNComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
    { path: 'servicios/:idservicio', component: ServiciosNComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_ADMIN'} },
  ]},

  //Sidebar Cliente
  { path: 'iniciocliente', component: InicioClienteComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_CLIENT'}},
  { path: 'reservar', component: ReservarComponent , canActivate: [ RoleGuard ], data: {role: 'ROLE_CLIENT'}},
  { path: 'editardatoscliente', component: EditarClienteComponent, canActivate: [ AuthGuard ] },
  { path: 'progresoreserva', component: ProgresoReservaComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_CLIENT'} },
  { path: 'historialreserva', component: HistorialReservasComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_CLIENT'} },
  { path: 'autosclientes', component: AutosClienteComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_CLIENT'} },
  { path: 'registroautos', component: RegistroAutoComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_CLIENT'} },

  //Sidebar empresa
  { path: 'reservarempresa', component: ReservarComponent , canActivate: [ RoleGuard ], data: {role: 'ROLE_COMPANY'}},
  { path: 'progresoreservaempresa', component: ProgresoReservaComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_COMPANY'} },
  { path: 'historialreservaempresa', component: HistorialReservasComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_COMPANY'} },
  { path: 'autosempresa', component: AutosClienteComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_COMPANY'} },
  { path: 'registroautosempresa', component: RegistroAutoComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_COMPANY'} },

  //Sidebar Empleado
  { path: 'reservasemp', component: ReservasEmpleadoComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_EMPLOYE'} },
  { path: 'pedidosempleado', component: PedidosEmpleadoComponent,
  children:[
    { path: 'pedidosemp', component: PedidosComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_EMPLOYE'} },
    { path: 'recibosemp', component: RecibosempComponent, canActivate: [ RoleGuard ], data: {role: 'ROLE_EMPLOYE'} },
  ]}
  ]},

  { path: 'sidebar', component: SidebarComponent, canActivate: [ AuthGuard ] },
  { path: 'activar', component: ActivarComponent, canActivate: [ AuthGuard ]},

  { path: 'topbar', component: TopbarComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
