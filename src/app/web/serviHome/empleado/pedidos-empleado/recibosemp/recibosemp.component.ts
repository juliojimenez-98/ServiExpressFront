import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/service/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibosemp',
  templateUrl: './recibosemp.component.html',
  styleUrls: ['./recibosemp.component.css']
})
export class RecibosempComponent implements OnInit {

  pedidos:Pedido[];
  public pedido:Pedido = new Pedido();
  constructor(private pedidosService:PedidoService, private router:Router) {

  }

  ngOnInit(): void {

    this.getAllPedidos();
  }


  getAllPedidos(){
    this.pedidosService.getAllPedidos().subscribe(
      pedidos => this.pedidos = pedidos
    );
  }



  async estadoPedido(pedido):Promise<void>{
    const { value: estado } = await Swal.fire({
      title: 'Selecciona el estado',
      input: 'select',
      position:"center",
      inputOptions: {
        0: 'Pendiente',
        1: 'Recibido',
        2: 'Cancelado'
      },
      inputPlaceholder: 'Selecciona el estado de la reserva',
      showCancelButton: true,

    })
    if (estado) {

      Swal.fire('Estado de reserva',`El estado cambió a: ${estado}`,'success')

      this.pedido.fechapedido = this.pedido.fechapedido
      this.pedido.empleado = JSON.parse(sessionStorage.getItem('idempledo'))
      this.pedidosService.updateEstadoPedido(pedido,estado)
      .subscribe(res=>{

        this.getAllPedidos();
      }
        );




    }

  }

}
