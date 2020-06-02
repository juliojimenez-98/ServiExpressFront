import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { NavbarService } from 'src/app/service/navbar.service';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/UserModel';
import { Util } from 'src/app/util/util';
import { Observable, from } from 'rxjs';
import { UserInfoModel } from 'src/app/models/UserInfoModel';
import { ClientesService } from 'src/app/service/clientes.service';
import { NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  userModelInfo: UserInfoModel = new UserInfoModel();
  user: UserModel = new UserModel();
  private util: Util = new Util();
  cliente = false;
  admin = false;
  empleado = false;
  model: NgbDateStruct;
  show = true;

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





     }

  ngOnInit(): void {
    this.nav.hide();
    this.cargarCliente();

  }

  hideDiv(){
    this.show = !this.show
  }
  cargarCliente():void{

    this.userModelInfo.nombre = sessionStorage.getItem('name');
    this.userModelInfo.apellido = sessionStorage.getItem('apellido');
    console.log(this.userModelInfo.fechaN);

    console.log(this.userModelInfo.fechaN)
    this.userModelInfo.telefono = sessionStorage.getItem('telefono');
    this.userModelInfo.rut = sessionStorage.getItem('rut');
  }

  public updatePerson(): void {
    if (sessionStorage.getItem('idrole')=='2') {

      this.userModelInfo.idCliente = JSON.parse(sessionStorage.getItem('idcliente'))
      this.userModelInfo.idUsuario = JSON.parse(sessionStorage.getItem('iduser'))
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.userModelInfo.fechaN);
    this.loginService.updateOrCreate(false, this.userModelInfo).subscribe(
      res => {
        Swal.fire('Actualizar datos', `Tus datos fueron actualizados ${this.userModelInfo.nombre} ${this.userModelInfo.apellido}`, 'success')
        Swal.fire('Actualizar datos', `Tus datos fueron actualizados ${this.userModelInfo.nombre} ${this.userModelInfo.apellido}`, 'success')
        localStorage.setItem("token_sesion", res["accessToken"]);
        // modo temporal despues hacerlo de una forma mas dinamica
        sessionStorage.setItem("iduser", res["iduser"]);
        sessionStorage.setItem("idrole", res["idrole"]);
        sessionStorage.setItem("name",res["name"])
        this.util.obtenerPerfil(res);
        this.util.obtenerPerfil(res)
        this.router.navigate(['home/inicio']);
      },
      error => {
        this.util.handleError(error);
      },

    );
    }else if (sessionStorage.getItem('idrole')=='3'|| sessionStorage.getItem('idrole')=='1') {

      this.userModelInfo.idEmpleado = JSON.parse(sessionStorage.getItem('idempleado'));
      this.userModelInfo.idUsuario = JSON.parse(sessionStorage.getItem('iduser'));
    // this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.userModelInfo.fechaN);
    this.loginService.updateOrCreateEmp(false, this.userModelInfo).subscribe(
      res => {
        Swal.fire('Actualizar datos', `Tus datos fueron actualizados ${this.userModelInfo.nombre} ${this.userModelInfo.apellido}`, 'success')

        this.util.getUserDatos(res);
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
