import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoModel } from 'src/app/models/UserInfoModel';
import { Util } from 'src/app/util/util';
import { LoginService } from 'src/app/service/login.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/models/empleado';

@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.css']
})
export class ActivarComponent implements OnInit {
  model: NgbDateStruct;
  public name = '';
  public fecha = '';
  public parametros: any;
  public userid: any;


  public user: UserInfoModel = new UserInfoModel();
  public empleado: Empleado = new Empleado();
  private util: Util = new Util();


  constructor(private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              public nav: NavbarService,
              private router: Router) {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
    this.activatedRoute.params.subscribe(params => {
      this.name = sessionStorage.getItem('name');
      this.userid = sessionStorage.getItem('iduser');
      this.user.idUsuario = this.userid;

      // console.log(this.heroe);  iduser
      this.parametros = params;

    });


  }

  ngOnInit(): void {
    if (sessionStorage.getItem('Avtivo')==='true') {
      this.router.navigate(['home/inicio'])
    }
  }


  public registerPerson(): void {
    if (sessionStorage.getItem('idrole')=='2'||sessionStorage.getItem('idrole')=='4') {
      const buildFormPerson = this.util.buildFormPerson(this.user, this.model);
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.user.fechaN);
    this.loginService.updateOrCreate(true, this.user).subscribe(
      res => {
        sessionStorage.setItem('Avtivo', 'true');
        this.util.getUserDatos(res)
        this.logout();
        swal.fire('Cargando datos', 'Inicia sesión para que se carguen tus datos', 'info')
      },
      error => {
        this.util.handleError(error);
      },

    );
    }else if (sessionStorage.getItem('idrole')=='3'|| sessionStorage.getItem('idrole')=='1') {
      const buildFormPerson = this.util.buildFormPerson(this.user, this.model);
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.user.fechaN);
    this.loginService.updateOrCreateEmp(true, this.user).subscribe(
      res => {
        sessionStorage.setItem('Avtivo', 'true');
        this.logout();
        swal.fire('Cargando datos', 'Inicia sesión para que se carguen tus datos', 'info')

      },
      error => {
        this.util.handleError(error);
      },

    );

    }
  }

  logout() {
    localStorage.removeItem('token_sesion');
    sessionStorage.clear();
  }
}
