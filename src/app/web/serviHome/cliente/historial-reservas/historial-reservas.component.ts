import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../service/navbar.service';
import { UserModel } from '../../../../models/UserModel';
import { Util } from '../../../../util/util';
import { NegocioService } from 'src/app/service/negocio.service';
import { ReservaResponse } from 'src/app/models/ReservaResponse';
import { Reserva } from 'src/app/models/reserva';

@Component({
  selector: 'app-historial-reservas',
  templateUrl: './historial-reservas.component.html',
  styleUrls: ['./historial-reservas.component.css']
})
export class HistorialReservasComponent implements OnInit {
  public user: UserModel = new UserModel();
  p :number = 1;
  private util: Util = new Util();
  public nombre: string = null;
  cliente = false;
  admin = false;
  empleado = false;
  reservas: ReservaResponse[];
  private reserva:Reserva = new Reserva;

  constructor(public nav: NavbarService,
    private service:NegocioService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
    });

    if (sessionStorage.getItem('idrole') === '2'){
      this.cliente = true;
    } else if (sessionStorage.getItem('idrole') === '1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole') === '3'){
      this.empleado = true;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();
    }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(){
    this.service.getReservasPorEstadoYCliente(sessionStorage.getItem('idcliente'),'6').subscribe(
      reservas => this.reservas = reservas
    );
  }

}
