import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../service/navbar.service';
import { UserModel } from '../../../../models/UserModel';
import { Util } from '../../../../util/util';

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

  constructor(public nav: NavbarService,
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
  }

}
