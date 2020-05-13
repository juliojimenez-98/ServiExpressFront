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
  }


  public registerPerson(): void {

    const buildFormPerson = this.util.buildFormPerson(this.user, this.model);
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.user.fechaN);
    this.loginService.updateOrCreate(true, this.user).subscribe(
      res => {
        sessionStorage.setItem('Avtivo', 'true');
        this.router.navigate(['/inicio']);
      },
      error => {
        this.util.handleError(error);
      },

    );



  }
  public registerEmp(): void {

    const buildFormPerson = this.util.buildFormEmpleado(this.empleado, this.model);
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.user.fechaN);
    this.loginService.updateOrCreateEmp(true, this.empleado).subscribe(
      res => {
        sessionStorage.setItem('Avtivo', 'true');
        this.router.navigate(['/inicio']);
      },
      error => {
        this.util.handleError(error);
      },

    );



  }
}
