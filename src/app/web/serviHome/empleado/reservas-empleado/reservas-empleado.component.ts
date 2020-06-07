import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReservaResponse } from "src/app/models/ReservaResponse";
import { NegocioService } from 'src/app/service/negocio.service';


@Component({
  selector: 'app-reservas-empleado',
  templateUrl: './reservas-empleado.component.html'
})
export class ReservasEmpleadoComponent implements OnInit {

  reservas: ReservaResponse[];
  constructor(private service:NegocioService) { }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(){
    this.service.getAllReservas().subscribe(
      reservas => this.reservas = reservas
    );
  }



  async estadoReserva():Promise<void>{
    const { value: estado } = await Swal.fire({
      title: 'Selecciona el estado',
      input: 'select',
      position:"center",
      inputOptions: {
        EnProceso: 'En Proceso',
        EnTaller: 'En Taller',
        CasiListo: 'Casi Listo',
        Listo: 'Listo'
      },
      inputPlaceholder: 'Selecciona el estado de la reserva',
      showCancelButton: true,

    })

    if (estado) {
      Swal.fire('Estado de reserva',`El estado cambió a: ${estado}`,'success')
    }
  }

}
