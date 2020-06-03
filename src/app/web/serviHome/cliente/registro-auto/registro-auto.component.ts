import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { Util } from 'src/app/util/util';

import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Cars } from 'src/app/models/cars';
import { CarService } from 'src/app/service/cars.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/service/sortable.directive';



@Component(
  {
    selector: 'ngbd-table-complete',
    templateUrl: './registro-auto.component.html',
    providers: [CarService, DecimalPipe]
  })
export class RegistroAutoComponent {
  public vehiculo: Vehiculo = new Vehiculo();
  private util: Util = new Util();
  cars$: Observable<Cars[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CarService, private clienteService: ClientesService, private router: Router) {
    this.cars$ = service.cars$;
    this.total$ = service.total$;
  }

    ngOnInit(): void {


  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  public borrarVehiculo():void{

    this.clienteService.eliminarVehiculo(this.vehiculo).subscribe(
      res=> {
        console.log(this.vehiculo.patente)

        console.log(localStorage.getItem('idvehiculo'))
        swal.fire('Borrado Correctamente', `Tu vehiculo : ${this.vehiculo.marca}  ${this.vehiculo.modelo} se elimino con exito`, 'success');
      }

    )
  }

  public regVehiculo(): void {



    this.service.getCar().subscribe(
      res => {

      },
      error => {
        this.util.handleError(error);
      },
    )
    this.vehiculo.idcliente = JSON.parse(sessionStorage.getItem('idcliente'));

    this.clienteService.registrarVehiculo(this.vehiculo).subscribe(
      res => {

        console.log(this.vehiculo)
        swal.fire('Creado correctamente', `Tu vehiculo : ${this.vehiculo.marca}  ${this.vehiculo.modelo} se registró con exito`, 'success');
        this.service.getCar()
        .subscribe(res => {
          localStorage["datas"] = JSON.stringify(res);
        });

      },
      error => {
        this.util.handleError(error);
      },

    );
  }

}
