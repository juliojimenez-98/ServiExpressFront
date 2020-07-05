import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { NegocioService } from 'src/app/service/negocio.service';
import { Servicios, Servicios2 } from 'src/app/models/Servicios';
import { Producto } from 'src/app/models/producto';
import { Reserva } from 'src/app/models/reserva';
import Swal from 'sweetalert2';
import { Util } from 'src/app/util/util';
import { ReservasService } from 'src/app/service/reservas.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader, SortEvent } from 'src/app/service/sortableReserva.directive';
import { Observable } from 'rxjs';
import { ReservaResponse } from 'src/app/models/ReservaResponse';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
  providers: [ReservasService, DecimalPipe]
})
export class ReservarComponent implements OnInit {
  servicios: Servicios2[];
  public servicio: Servicios2 = new Servicios2();
  productos: Producto[];
  public producto: Producto = new Producto();
  public reserva: Reserva = new Reserva();
  public util: Util;
  vehiculos: Vehiculo[];
  public vehiculo: Vehiculo = new Vehiculo();
  reservaResponse$: Observable<ReservaResponse[]>;
  total$: Observable<number>;
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(private negocioService: NegocioService, public service: ReservasService) {
    this.reservaResponse$ = service.reservaResponses$;
    this.total$ = service.total$;
   }

  
  public dateBefore: Date = new Date();
  ngOnInit(): void {
    this.cargarAppJs('../assets/js/app.js');

    this.negocioService.getCar().subscribe(vehiculos => this.vehiculos = vehiculos);
    this.negocioService.getAllServicio2().subscribe(servicios => this.servicios = servicios);
    // this.negocioService.getAllProductoById(169).subscribe(productos => this.productos = productos);
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
  
  public cargarAppJs(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }




  public agregarReserva(): void {

    let producto = this.producto.idproducto;
    let servici = this.servicio.idservicio;
    let dateHours = <HTMLInputElement>document.getElementById('datetime');
    let newDate = new Date(dateHours.value);
    this.reserva.productos = producto;
    this.reserva.servicios = servici.toString();
    this.reserva.fechareserva = dateHours.value.substr(0, 10);
    this.reserva.horareserva = dateHours.value.substr(11);
    this.reserva.idvehiculo = parseInt(this.vehiculo.idvehiculo);


      this.negocioService.agregarReserva(this.reserva).subscribe(

        res  =>{


          Swal.fire(  'Reserva agregada',  `Se enviara un correo de confirmacion a : ${sessionStorage.getItem('email')}` ,  'success');
          this.service.getReserva()
          .subscribe(res => {
            localStorage["datas2"] = JSON.stringify(res);
          });
    },
    error => {
      this.util.handleError(error);
    },

  );

  }



  public cargaBox(): void{

    this.negocioService.getAllProductoById(this.servicio.categoria).subscribe(productos => this.productos = productos)
  }
}
