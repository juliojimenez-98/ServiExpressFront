import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PedidoService } from 'src/app/service/pedido.service';
import { Proveedor } from 'src/app/models/proveedor';
import { Producto } from 'src/app/models/producto';
import { Pedido } from 'src/app/models/Pedido';
import { Router } from '@angular/router';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  proveedores: Proveedor[];
  private util: Util = new Util();
  productos: Producto[];
  public pedido:Pedido = new Pedido();
  constructor(private pedidosService:PedidoService, private router:Router) { }

  ngOnInit(): void {
    this.getProveedores();
    this.getProductos();
  }

  getProveedores(){
    this.pedidosService.getAllProveedores().subscribe(
      proveedores => this.proveedores = proveedores
    );
  }

  getProductos(){
    this.pedidosService.getAllProductos().subscribe(
      productos => this.productos = productos
    );
  }

  public agregarPedido(): void{
    this.pedido.idempleado = JSON.parse(sessionStorage.getItem('idempleado'));
    this.pedido.estado= 0;
    console.log(this.pedido)
    this.pedidosService.agregarPedido(this.pedido).subscribe(
      res  =>{
        console.log(res)

        Swal.fire(  'Pedido Realizado',  `El pedido se realizó con exito` ,  'success');
        this.router.navigate(['home/pedidosempleado/pedidosemp']);
  },
  error => {
    console.log(error)
    this.util.handleError(error);
  },

);

}


  async estadoPedido():Promise<void>{
    const { value: estado } = await Swal.fire({
      title: 'Selecciona el estado',
      input: 'select',
      position:"center",
      inputOptions: {
        Recibido: 'Recibido',
        Pendiente: 'Pendiente',
        Nollego: 'No llego'
      },
      inputPlaceholder: 'Selecciona el estado de la reserva',
      showCancelButton: true,

    })
    if (estado) {

      Swal.fire('Estado de reserva',`El estado cambió a: ${estado}`,'success')
    }
  }

}
