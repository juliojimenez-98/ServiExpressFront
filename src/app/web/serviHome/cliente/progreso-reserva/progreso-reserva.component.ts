import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../service/navbar.service';
import { UserModel } from '../../../../models/UserModel';
import { Util } from '../../../../util/util';
import { NegocioService } from 'src/app/service/negocio.service';

@Component({
  selector: 'app-progreso-reserva',
  templateUrl: './progreso-reserva.component.html',
  styleUrls: ['./progreso-reserva.component.css']
})
export class ProgresoReservaComponent implements OnInit {
  public user: UserModel = new UserModel();
  private util: Util = new Util();
  public nombre: string = null;
  cliente = false;
  admin = false;
  empleado = false;

  reserva = true;
  recibido = true;
  taller = false;
  terminando = false;
  listo = false;
  btnterminando = false;

  reservaRealizada= false;
  recibidoCar=false;
  Limpieza = false;
  Pagar = false;
  Completo = false;

  constructor(public nav: NavbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public service: NegocioService) {



    this.service.getReservaActiva()
      .subscribe(res => {
        sessionStorage.setItem("estado", res["estado"]);
      });
      console.log(sessionStorage.getItem('estado'));
    if (sessionStorage.getItem('estado') === '1') {
      console.log("entra");
      this.reserva = false;

      //fieldset
      this.reservaRealizada= true;
    } else if (sessionStorage.getItem('estado') === '2') {
      this.reserva = false;
      this.recibido = false;

      //fieldset
      this.reservaRealizada= false;
      this.recibidoCar = true;
    } else if (sessionStorage.getItem('estado') === '3') {
      this.reserva = false;
      this.recibido = false;
      this.taller = true;

      //fieldset
      this.reservaRealizada= false;
      this.recibidoCar = false;
      this.Limpieza = true;
    } else if (sessionStorage.getItem('estado') === '4') {
      this.reserva = false;
      this.recibido = false;
      this.taller = true;
      this.terminando = true;
      this.btnterminando = true;

      //fieldset
      this.reservaRealizada= false;
      this.recibidoCar = false;
      this.Limpieza = false;
      this.Pagar = true;
    } else if (sessionStorage.getItem('estado') === '5') {
      this.reserva = false;
      this.recibido = false;
      this.taller = true;
      this.terminando = true;
      this.listo = true;
      this.btnterminando= false;

      //fieldset
      this.reservaRealizada= false;
      this.recibidoCar = false;
      this.Limpieza = false;
      this.Pagar = false;
      this.Completo = true;
    }


    //
    //
    // this.terminando = false;
    // this.listo = false;
    this.activatedRoute.params.subscribe(params => {
    });

    if (sessionStorage.getItem('idrole') === '2') {
      this.cliente = true;
    } else if (sessionStorage.getItem('idrole') === '1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole') === '3') {
      this.empleado = true;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }

  ngOnInit(): void {
  }

}
