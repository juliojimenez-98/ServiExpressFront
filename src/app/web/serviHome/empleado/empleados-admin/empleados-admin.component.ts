import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { AdminClientesService } from 'src/app/service/admin-clientes.service';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-empleados-admin',
  templateUrl: './empleados-admin.component.html',
  styleUrls: ['./empleados-admin.component.css']
})
export class EmpleadosAdminComponent implements OnInit {
  page = 0;
  size = 1;
  empleadosPag: Array<any>;

  constructor(private adminClientes:AdminClientesService, private nav:NavbarService,) {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }


  cargarEmpleados(){
    this.adminClientes.empleadosPag(this.page,this.size).subscribe(
      res=>{
        this.empleadosPag = res;
        console.log(this.page);
      },
      err=> {
        console.log(err.error)
      }
    )
  }

  sumPag(i:number){
    this.page = i+1;
    this.cargarEmpleados();
    console.log(i)
  }

  resPag(i:number){
    this.page = i-1;
    this.cargarEmpleados();
    console.log(i)
  }
}
