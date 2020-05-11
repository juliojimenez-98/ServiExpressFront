import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { NavbarService } from 'src/app/service/navbar.service';
import { Util } from '../../../util/util';

@Component({
  selector: 'app-autos-cliente',
  templateUrl: './autos-cliente.component.html',
  styleUrls: ['./autos-cliente.component.css']
})
export class AutosClienteComponent implements OnInit {
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
      this.admin = false;
    } else if (sessionStorage.getItem('idrole') === '3') {
      this.empleado = false;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }

  ngOnInit(): void {
  }

}
