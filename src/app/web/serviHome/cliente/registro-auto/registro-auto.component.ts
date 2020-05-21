import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-registro-auto',
  templateUrl: './registro-auto.component.html',
  styleUrls: ['./registro-auto.component.css']
})
export class RegistroAutoComponent implements OnInit {
  public vehiculo:Vehiculo = new Vehiculo();
  private util: Util = new Util();

  constructor(private clienteService: ClientesService,private  router:Router) { }

  ngOnInit(): void {
  }

  public regVehiculo(): void{

    this.vehiculo.idcliente = JSON.parse(sessionStorage.getItem('idcliente'));

    this.clienteService.registrarVehiculo(this.vehiculo).subscribe(
      res  =>{

        console.log(this.vehiculo)
        swal.fire(  'Creado correctamente',  `Tu vehiculo : ${this.vehiculo.marca}  ${this.vehiculo.modelo} se registró con exito` ,  'success');
        this.router.navigate(['home/autosclientes', res]);

  },
  error => {
    this.util.handleError(error);
  },

);

}

}

