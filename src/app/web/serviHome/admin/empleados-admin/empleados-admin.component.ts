import { Component, OnInit } from '@angular/core';

import { AdminClientesService } from 'src/app/service/admin-clientes.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { Empleado } from '../../../../models/empleado';

@Component({
  selector: 'app-empleados-admin',
  templateUrl: './empleados-admin.component.html',
  styleUrls: ['./empleados-admin.component.css']
})
export class EmpleadosAdminComponent implements OnInit {
  empleados: Empleado[];

  constructor(private adminClientes:AdminClientesService, private nav:NavbarService,) {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }

  ngOnInit(): void {
    this.adminClientes.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

}
