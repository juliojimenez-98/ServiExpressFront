import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { NavbarService } from '../../../../service/navbar.service';
import { UserModel } from '../../../../models/UserModel';
import { Util } from '../../../../util/util';
import { NegocioService } from 'src/app/service/negocio.service';
import { DOCUMENT } from '@angular/common';
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

  reservaRealizada = false;
  recibidoCar = false;
  Limpieza = false;
  Pagar = false;
  Completo = false;
  estadoCero = false;

  public valor: number = 0;
  public idReserva: number = 0;
  public servicio: string = null;

  constructor(@Inject(DOCUMENT) private document: Document, public nav: NavbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public service: NegocioService,
  ) {



    this.service.getReservaActiva()
      .subscribe(res => {
        sessionStorage.setItem("estado", res["estado"]);
        this.valor=res["monto"];
        this.servicio=res["servicio"];
        this.idReserva=res["idReserva"];
        sessionStorage.setItem("idReservaTemp", res["idReserva"]);
      });

      console.log(this.valor)
    console.log(sessionStorage.getItem('estado'));
    if (sessionStorage.getItem('estado') === '1') {
      console.log("entra");
      this.reserva = false;

      //fieldset
      this.reservaRealizada = true;
    } else if (sessionStorage.getItem('estado') === '2') {
      this.reserva = false;
      this.recibido = false;

      //fieldset
      this.reservaRealizada = false;
      this.recibidoCar = true;
    } else if (sessionStorage.getItem('estado') === '3') {
      this.reserva = false;
      this.recibido = false;
      this.taller = true;

      //fieldset
      this.reservaRealizada = false;
      this.recibidoCar = false;
      this.Limpieza = true;
    } else if (sessionStorage.getItem('estado') === '4') {
      this.reserva = false;
      this.recibido = false;
      this.taller = true;
      this.terminando = true;
      this.btnterminando = true;

      //fieldset
      this.reservaRealizada = false;
      this.recibidoCar = false;
      this.Limpieza = false;
      this.Pagar = true;
    } else if (sessionStorage.getItem('estado') === '5') {
      this.reserva = false;
      this.recibido = false;
      this.taller = true;
      this.terminando = true;
      this.listo = true;
      this.btnterminando = false;

      //fieldset
      this.reservaRealizada = false;
      this.recibidoCar = false;
      this.Limpieza = false;
      this.Pagar = false;
      this.Completo = true;
    }
    else if (sessionStorage.getItem('estado') === '0') {
      this.reserva = true;
      this.recibido = true;
      this.taller = false;
      this.terminando = false;
      this.listo = false;
      this.btnterminando = false;

      this.reservaRealizada = false;
      this.recibidoCar = false;
      this.Limpieza = false;
      this.Pagar = false;
      this.Completo = false;
      this.estadoCero = false;
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


  pagar() {


    this.service.getPago(this.valor,this.servicio, this.idReserva)
      .subscribe(res => {

        var url = res['payment_url']
        // console.log("hola "+url+" hola")
        this.document.location.href = url;
        // this.router.navigate(url);
        // console.log(res)
      });


  }

}
