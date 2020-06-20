import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent implements OnInit {
  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
