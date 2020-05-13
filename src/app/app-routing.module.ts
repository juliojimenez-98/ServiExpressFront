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
import { ClientesempComponent } from './web/serviHome/empleado/clientesemp/clientesemp.component';
import { AutosClienteComponent } from './web/serviHome/cliente/autos-cliente/autos-cliente.component';
import { ReservarComponent } from './web/serviHome/cliente/reservar/reservar.component';
import { EditarClienteComponent } from './web/serviHome/cliente/editar-cliente/editar-cliente.component';
import { ProgresoReservaComponent } from './web/serviHome/cliente/progreso-reserva/progreso-reserva.component';
import { HistorialReservasComponent } from './web/serviHome/cliente/historial-reservas/historial-reservas.component';

const APP_ROUTES: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: '', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'activar', component: ActivarComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'topbar', component: TopbarComponent },
  { path: 'registeremploye', component: RegisteremployeComponent },
  { path: 'autoscliente', component: AutosClienteComponent },
  { path: 'reservar', component: ReservarComponent },
  { path: 'editardatoscliente', component: EditarClienteComponent },
  { path: 'verclientes', component: ClientesempComponent },
  { path: 'progresoreserva', component: ProgresoReservaComponent},
  { path: 'historialreserva', component: HistorialReservasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
