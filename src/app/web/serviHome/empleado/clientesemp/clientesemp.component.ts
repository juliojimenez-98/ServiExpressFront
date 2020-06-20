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

  p: number = 1;
  clientes: Cliente[];

  constructor(private adminClientes:AdminClientesService, private nav:NavbarService, private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {

    this.cargarClientes();
  }

  cargarClientes(){
    this.adminClientes.getAllClientes().subscribe(clientes => this.clientes = clientes)
  }




}
