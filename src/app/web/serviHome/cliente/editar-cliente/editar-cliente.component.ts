import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { NavbarService } from 'src/app/service/navbar.service';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/UserModel';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente = false;
  admin = false;
  empleado = false;

  constructor(public nav: NavbarService,
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
  }
  clienteEdit(){
    if (sessionStorage.getItem('idrole')=='2') {
      return true;
    }
  }
}
