import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import localeEsCl from '@angular/common/locales/es-CL';
import { AppComponent } from './app.component';
import { LoginComponent } from './web/login/login.component';
import { RegisterComponent } from './web/register/register.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './widget/navbar/navbar.component';
import { FooterComponent } from './widget/footer/footer.component';
import { ConocenosComponent } from './web/home/conocenos/conocenos.component';
import { ContactoComponent } from './web/home/contacto/contacto.component';
import { ServiciosComponent } from './web/home/servicios/servicios.component';
import { HomeComponent } from './web/home/home/home.component';
import { SidebarComponent } from './widget/sidebar/sidebar.component';
import { InicioComponent } from './web/serviHome/inicio/inicio.component';
import { ActivarComponent } from './web/serviHome/activar/activar.component';
import { TopbarComponent } from './widget/topbar/topbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioempComponent } from './web/serviHome/empleado/inicioemp/inicioemp.component';
import { InicioClienteComponent } from './web/serviHome/cliente/inicio-cliente/inicio-cliente.component';
import { RegisteremployeComponent } from './web/serviHome/registeremploye/registeremploye.component';
import { AutosClienteComponent } from './web/serviHome/cliente/autos-cliente/autos-cliente.component';
import { ReservarComponent } from './web/serviHome/cliente/reservar/reservar.component';
import { EditarClienteComponent } from './web/serviHome/cliente/editar-cliente/editar-cliente.component';
import { ClientesempComponent } from './web/serviHome/empleado/clientesemp/clientesemp.component';
import { ProgresoReservaComponent } from './web/serviHome/cliente/progreso-reserva/progreso-reserva.component';
import { HistorialReservasComponent } from './web/serviHome/cliente/historial-reservas/historial-reservas.component';
import { EmpleadosAdminComponent } from './web/serviHome/empleado/empleados-admin/empleados-admin.component';
import { registerLocaleData } from '@angular/common';
import { BaseComponent } from './widget/base/base.component';
import { RegistroAutoComponent } from './web/serviHome/cliente/registro-auto/registro-auto.component';
import { NegocioGestionComponent } from './web/serviHome/admin/negocio-gestion/negocio-gestion.component';
import { CategoriasComponent } from './web/serviHome/admin/negocio-gestion/categorias/categorias.component';
import { ProductosComponent } from './web/serviHome/admin/negocio-gestion/productos/productos.component';
import { ServiciosNComponent } from './web/serviHome/admin/negocio-gestion/servicios-n/servicios-n.component';
import { ReservasEmpleadoComponent } from './web/serviHome/empleado/reservas-empleado/reservas-empleado.component';
import { PedidosEmpleadoComponent } from './web/serviHome/empleado/pedidos-empleado/pedidos-empleado.component';
import { PedidosComponent } from './web/serviHome/empleado/pedidos-empleado/pedidos/pedidos.component';
import { RecibosempComponent } from './web/serviHome/empleado/pedidos-empleado/recibosemp/recibosemp.component';
import { ChartModule } from 'primeng/chart';
import {TableModule} from 'primeng/table';
import { EncuestaComponent } from './web/serviHome/cliente/encuesta/encuesta.component';
registerLocaleData(localeEsCl, 'es-CL');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    ConocenosComponent,
    ContactoComponent,
    ServiciosComponent,
    HomeComponent,
    SidebarComponent,
    InicioComponent,
    ActivarComponent,
    TopbarComponent,
    InicioempComponent,
    InicioClienteComponent,
    RegisteremployeComponent,
    AutosClienteComponent,
    ReservarComponent,
    EditarClienteComponent,
    ClientesempComponent,
    ProgresoReservaComponent,
    HistorialReservasComponent,
    ClientesempComponent,
    EmpleadosAdminComponent,
    BaseComponent,
    RegistroAutoComponent,
    NegocioGestionComponent,
    CategoriasComponent,
    ProductosComponent,
    ServiciosNComponent,
    ReservasEmpleadoComponent,
    PedidosEmpleadoComponent,
    PedidosComponent,
    RecibosempComponent,
    EncuestaComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ChartModule,
    TableModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Cl' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
