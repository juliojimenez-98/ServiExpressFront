import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { NavbarService } from 'src/app/service/navbar.service';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/UserModel';
import { Util } from 'src/app/util/util';
import { Observable } from 'rxjs';
import { UserInfoModel } from 'src/app/models/UserInfoModel';
import { ClientesService } from 'src/app/service/clientes.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  userModelInfo: UserInfoModel = new UserInfoModel();
  private util: Util = new Util();
  cliente = false;
  admin = false;
  empleado = false;
  model: NgbDateStruct;

  constructor(public nav: NavbarService,
    private clienteService:ClientesService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router) {
      if (sessionStorage.getItem('idrole') === '2') {
        this.cliente = true;
      } else if (sessionStorage.getItem('idrole') === '1') {
        this.admin = true;
      } else if (sessionStorage.getItem('idrole') === '3') {
        this.empleado = true;
      }




      if ((sessionStorage.getItem('idrole') !== '2')) {
        Swal.fire('Restringido', `${sessionStorage.getItem('name')} no tienes acceso a esta página`, 'warning')
        this.router.navigate(['/inicio']);
      }

     }

  ngOnInit(): void {
    this.nav.hide();
    this.cargarCliente();
  }
  cargarCliente():void{
    this.userModelInfo.nombre = sessionStorage.getItem('name');
    this.userModelInfo.apellido = sessionStorage.getItem('apellido');
    this.userModelInfo.fechaN = sessionStorage.getItem('fechaNacimiento');
    this.userModelInfo.telefono = sessionStorage.getItem('telefono');
    this.userModelInfo.rut = sessionStorage.getItem('rut');
  }

  public registerPerson(): void {
    if (sessionStorage.getItem('idrole')=='2') {
      const buildFormPerson = this.util.buildFormPerson(this.userModelInfo, this.model);
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.userModelInfo.fechaN);
    this.loginService.updateOrCreate(false, this.userModelInfo).subscribe(
      res => {
        console.log('Actualizando')
        sessionStorage.setItem('Avtivo', 'true');
        this.router.navigate(['home/inicio']);
      },
      error => {
        this.util.handleError(error);
      },

    );
    }else if (sessionStorage.getItem('idrole')=='3'|| sessionStorage.getItem('idrole')=='1') {
      const buildFormPerson = this.util.buildFormPerson(this.userModelInfo, this.model);
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.userModelInfo.fechaN);
    this.loginService.updateOrCreateEmp(false, this.userModelInfo).subscribe(
      res => {
        sessionStorage.setItem('Avtivo', 'true');
        this.router.navigate(['home/inicio']);
      },
      error => {
        this.util.handleError(error);
      },

    );

    }
  }
}