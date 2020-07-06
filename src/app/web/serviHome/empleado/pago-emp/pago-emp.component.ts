import { Component, OnInit } from '@angular/core';
import { ReservaPago } from 'src/app/models/ReservaPago';
import { NegocioService } from 'src/app/service/negocio.service';

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

}
