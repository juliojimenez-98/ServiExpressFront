import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { NegocioService } from 'src/app/service/negocio.service';
import { Servicios, Servicios2 } from 'src/app/models/Servicios';
import { Producto } from 'src/app/models/producto';
import { Reserva } from 'src/app/models/reserva';
import Swal from 'sweetalert2';
import { Util } from 'src/app/util/util';
import { CarService } from 'src/app/service/cars.service';
import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
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
  constructor(private negocioService: NegocioService) { }
  public dateBefore: Date = new Date();
  ngOnInit(): void {
    this.cargarAppJs('../assets/js/app.js');

    this.negocioService.getCar().subscribe(vehiculos => this.vehiculos = vehiculos);
    this.negocioService.getAllServicio2().subscribe(servicios => this.servicios = servicios);
    // this.negocioService.getAllProductoById(169).subscribe(productos => this.productos = productos);
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
    this.reserva.fechareserva = dateHours.value;
    this.reserva.horareserva = dateHours.value;
    this.reserva.idvehiculo = parseInt(this.vehiculo.idvehiculo);


      this.negocioService.agregarReserva(this.reserva).subscribe(

        res  =>{
          // this.callType(res)
          // var idcategoria = this.callType;
          console.log(this.producto.categoria)

          Swal.fire(  'Reserva agregada',  `Se enviara un correo de confirmacion a : ${sessionStorage.getItem('email')}` ,  'success');


    this.negocioService.agregarReserva(this.reserva).subscribe(

      res => {
        // this.callType(res)
        // var idcategoria = this.callType;
        console.log(this.producto.categoria)

        Swal.fire('Reserva agregada', `Se enviara un correo de confirmacion a : ${sessionStorage.getItem('email')}`, 'success');



        console.log(res)

      },
      error => {
        this.util.handleError(error);
      },

    );


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
