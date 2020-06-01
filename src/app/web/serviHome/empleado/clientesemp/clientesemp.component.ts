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

  clientes: Cliente[];

  constructor(private adminClientes:AdminClientesService, private nav:NavbarService, private activatedRoute: ActivatedRoute) {

    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }


  ngOnInit(): void {
    this.adminClientes.getCLientes().subscribe(
      clientes => this.clientes = clientes
    );

  }


}
