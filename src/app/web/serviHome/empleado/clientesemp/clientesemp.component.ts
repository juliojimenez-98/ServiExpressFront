import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { AdminClientesService } from 'src/app/service/admin-clientes.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientesemp',
  templateUrl: './clientesemp.component.html',
  styleUrls: ['./clientesemp.component.css']
})
export class ClientesempComponent implements OnInit {

  page = 0;
  size = 4;
  clientes: Array<any>;

  constructor(private adminClientes:AdminClientesService, private nav:NavbarService, private activatedRoute: ActivatedRoute) {
    this.cargarClientes();
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }


  ngOnInit(): void {


  }

  cargarClientes(){
    this.adminClientes.empleadosPag(this.page,this.size).subscribe(
      res=>{
        this.clientes = res;
        console.log(this.page);
      },
      err=> {
        console.log(err.error)
      }
    )
  }

  sumPag(i:number){
    this.page = i+1;
    this.cargarClientes();
    console.log(i)
  }

  resPag(i:number){
    this.page = i-1;
    this.cargarClientes();
    console.log(i)
  }


}
