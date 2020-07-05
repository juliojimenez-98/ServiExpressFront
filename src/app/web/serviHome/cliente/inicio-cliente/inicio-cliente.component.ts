import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo';
import { NegocioService } from 'src/app/service/negocio.service';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-inicio-clientes',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css']
})
export class InicioClienteComponent implements OnInit {
  vehiculos: Vehiculo[];
  public vehiculo:Vehiculo = new Vehiculo();
  constructor(private service:NegocioService, private router:Router) {

  }

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  obtenerVehiculos(){
    this.service.getCars().subscribe(
      vehiculos => this.vehiculos = vehiculos
    )
  }


}
