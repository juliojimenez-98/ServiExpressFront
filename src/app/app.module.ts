import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
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
import { AutosClienteComponent } from './web/cliente/autos-cliente/autos-cliente.component';
import { ReservarComponent } from './web/serviHome/cliente/reservar/reservar.component';
import { EditarClienteComponent } from './web/serviHome/cliente/editar-cliente/editar-cliente.component';
import { ClientesempComponent } from './web/serviHome/empleado/clientesemp/clientesemp.component';

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
    ClientesempComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
