import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { NegocioService } from 'src/app/service/negocio.service';
import { Servicios } from 'src/app/models/Servicios';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';

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
  constructor(private negocioService: NegocioService,) { }

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

      console.log("hola"+this.servicio.categoria)
      console.log("hola"+this.servicio.valorbase)

      this.servicios.forEach(element => {
        console.log(element.categoria)
      });


  //     this.negocioService.agregarProducto(this.producto).subscribe(
  
  //       res  =>{
  //         // this.callType(res)
  //         // var idcategoria = this.callType;
  //         console.log(this.producto.categoria)
  
  //         Swal.fire(  'Producto agregado',  `El producto : ${this.producto.nombre} se agregó con exito` ,  'success');
  //         this.router.navigate(['home/negociogestion']);
  //         this.cargarProductos();
  
  //       console.log(res)
  
  //   },
  //   error => {
  //     this.util.handleError(error);
  //   },
  
  // );
  
  }

  public cargaBox(): void{

    this.negocioService.getAllProductoById(169).subscribe(productos => this.productos = productos)
  }
}
