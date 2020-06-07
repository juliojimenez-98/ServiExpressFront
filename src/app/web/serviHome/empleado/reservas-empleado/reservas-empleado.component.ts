import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReservaResponse } from "src/app/models/ReservaResponse";
import { NegocioService } from 'src/app/service/negocio.service';
import { Reserva } from 'src/app/models/reserva';


@Component({
  selector: 'app-reservas-empleado',
  templateUrl: './reservas-empleado.component.html'
})
export class ReservasEmpleadoComponent implements OnInit {
  estados;
  reservas: ReservaResponse[];
  private reserva:Reserva = new Reserva;
  constructor(private service:NegocioService) {
    // this.estados = ['En Taller', 'Revicion', 'Trabajando', 'Limpieza', 'Terminando', 'Servicio Completo'];
  }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(){
    this.service.getAllReservas().subscribe(
      reservas => this.reservas = reservas
    );
  }



  async estadoReserva(reserva):Promise<void>{
    // var idreserva:string;
    // idreserva = reserva;
    console.log(reserva)
  //   reserva.forEach(resource => {
  //     console.log(resource.idreserva);

  // });
    const { value: estado } = await Swal.fire({
      title: 'Selecciona el estado',
      input: 'select',
      position:"center",
      inputOptions: {

        '1': 'Revision',
        '2': 'Trabajando',
        '3': 'Limpieza',
        '4': 'Terminando',
        '5': 'Servicio Completo'
      },
      inputPlaceholder: 'Selecciona el estado de la reserva',
      showCancelButton: true,

    })



    if (estado) {

      Swal.fire('Estado de reserva',`El estado cambió a: ${estado}`,'success')


      this.service.updateEstadoReserva(reserva,estado)
      .subscribe();


    }

  }


}
