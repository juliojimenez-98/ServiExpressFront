import { Component, OnInit } from '@angular/core';
import { ReservaPago } from 'src/app/models/ReservaPago';
import { NegocioService } from 'src/app/service/negocio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-emp',
  templateUrl: './pago-emp.component.html',
  styleUrls: ['./pago-emp.component.css']
})
export class PagoEmpComponent implements OnInit {
  reservasPagos:ReservaPago[]
  patente:string;
  public reservapago:ReservaPago = new ReservaPago();
  moneda:string;
  constructor(private service:NegocioService) {
    this.moneda = sessionStorage.getItem('moneda')
   }

  ngOnInit(): void {
  }

  getReservaPago(valor){
    this.patente = valor
    this.service.getReservaPago(this.patente).subscribe(
      reservaPago => this.reservasPagos = reservaPago
    )
  }

  actualizarEstadoReserva(reserva){
    this.service.updateEstadoReservaPago(reserva).subscribe(res=>{

      Swal.fire('Estado de reserva','El estado cambió a Pagado','success')
    }
    )
  }

}
