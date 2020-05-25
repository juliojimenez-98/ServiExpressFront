import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/models/UserInfoModel';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public userModelInfo:UserInfoModel = new UserInfoModel();
  cliente = false;
  admin = false;
  empleado = false;

  public name = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.name = sessionStorage.getItem('name');

    });
    if (sessionStorage.getItem('idrole') === '2') {
      this.cliente = true;
    } else if (sessionStorage.getItem('idrole') === '1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole') === '3') {
      this.empleado = true;
    }
  }

  ngOnInit(): void {
    this.userModelInfo.idCliente = JSON.parse(sessionStorage.getItem('idcliente'))
    console.log(this.userModelInfo.idCliente)
  }



  logout() {
    localStorage.removeItem('token_sesion');
    sessionStorage.clear();
  }


}




