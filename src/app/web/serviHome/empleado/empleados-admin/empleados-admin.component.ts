import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { AdminClientesService } from 'src/app/service/admin-clientes.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-empleados-admin',
  templateUrl: './empleados-admin.component.html',
  styleUrls: ['./empleados-admin.component.css']
})
export class EmpleadosAdminComponent implements OnInit {

  p: number = 1;
  empleados: Empleado[];

  constructor(private adminClientes:AdminClientesService, private nav:NavbarService,) {

  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }


  cargarEmpleados(){
    this.adminClientes.getAllEmpleados().subscribe(empleados => this.empleados = empleados)
  }

}
