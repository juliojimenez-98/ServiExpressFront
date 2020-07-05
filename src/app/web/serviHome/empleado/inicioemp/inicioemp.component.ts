import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReservaResponse } from 'src/app/models/ReservaResponse';
import { Reserva } from 'src/app/models/reserva';
import { NegocioService } from 'src/app/service/negocio.service';

@Component({
  selector: 'app-inicioemp',
  templateUrl: './inicioemp.component.html',
  styleUrls: ['./inicioemp.component.css']
})
export class InicioempComponent implements OnInit {
  estados;
  p: number = 1;
  reservas: ReservaResponse[];
  private reserva:Reserva = new Reserva;
  constructor(private service:NegocioService) { }

  ngOnInit(): void {
    this.getReservas();
  }


  getReservas(){
    this.service.getAllReservasMonth().subscribe(
      reservas => this.reservas = reservas
    );
  }



  async estadoReserva(reserva):Promise<void>{
    console.log(reserva)

    const { value: estado } = await Swal.fire({
      title: 'Selecciona el estado',
      input: 'select',
      position:"center",
      inputOptions: {

        '1': 'Revision',
        '2': 'Trabajando',
        '3': 'Limpieza',
        '4': 'Pagar Servicio',
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
