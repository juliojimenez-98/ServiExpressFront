import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-auto',
  templateUrl: './registro-auto.component.html',
  styleUrls: ['./registro-auto.component.css']
})
export class RegistroAutoComponent implements OnInit {
  public vehiculo:Vehiculo = new Vehiculo();


  constructor(private clienteService: ClientesService,private  router:Router) { }

  ngOnInit(): void {
  }

  public regVehiculo(): void{
    this.clienteService.registrarVehiculo(this.vehiculo).subscribe(
      res  =>{
        console.log(this.vehiculo)
        swal.fire(  'Creado correctamente',  `Tu vehiculo : ${this.vehiculo.marca}  ${this.vehiculo.modelo} se creó con exito` ,  'success');
        this.router.navigate(['home/autosclientes', res]);

}
    )
  }

}
