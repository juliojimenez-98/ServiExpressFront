import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { NegocioService } from 'src/app/service/negocio.service';
import { Servicios } from 'src/app/models/Servicios';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { Reserva } from 'src/app/models/reserva';
import Swal from 'sweetalert2';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  servicios: Servicios[];
  public servicio:Servicios = new Servicios();
  productos: Producto[];
  public producto:Producto = new Producto();
  public reserva: Reserva = new Reserva();
  public util:Util;
  constructor(private negocioService: NegocioService,) { }
  public dateBefore: Date= new Date();
  ngOnInit(): void {
    this.cargarAppJs('../assets/js/app.js');

    this.negocioService.getAllServicio().subscribe(servicios => this.servicios = servicios);
    // this.negocioService.getAllProductoById(169).subscribe(productos => this.productos = productos);
  }
  public cargarAppJs(url: string) {
       const body = <HTMLDivElement> document.body;
       const script = document.createElement('script');
       script.innerHTML = '';
       script.src = url;
       script.async = false;
       script.defer = true;
       body.appendChild(script);
     }

    

     public agregarReserva(): void{

    let producto=this.producto.idproducto;
     let servici=this.servicio.idservicio;
     let dateHours = <HTMLInputElement>document.getElementById('datetime');
     let newDate = new Date(dateHours.value);
      this.reserva.productos= producto;
      this.reserva.servicios= servici.toString();
      this.reserva.fechareserva=dateHours.value;
      this.reserva.horareserva=dateHours.value;

    

      this.negocioService.agregarReserva(this.reserva).subscribe(
  
        res  =>{
          // this.callType(res)
          // var idcategoria = this.callType;
          console.log(this.producto.categoria)
  
          Swal.fire(  'Reserva agregada',  `Se enviara un correo de confirmacion a : ${sessionStorage.getItem('email')}` ,  'success');

  
        console.log(res)
  
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
