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
  p: number = 1;
  est: string;
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

  cambiarEstado(valor){
    this.est = valor
    this.pedidosService.getAllPedidosEstado(this.est).subscribe(
      pedidos => this.pedidos = pedidos
    )
  }


  async estadoPedido(pedido):Promise<void>{
    const { value: estado } = await Swal.fire({
      title: 'Selecciona el estado',
      input: 'select',
      position:"center",
      inputOptions: {
       2: 'Buen Estado',
       3: 'Recibido con detalles'
      },
      inputPlaceholder: 'Selecciona el estado de la reserva',
      showCancelButton: true,

    })
     if (estado == 2) {

       Swal.fire('Estado de reserva',`El estado cambió a: ${estado}`,'success')

       this.pedido.fechapedido = this.pedido.fechapedido
       this.pedido.empleado = JSON.parse(sessionStorage.getItem('idempledo'))
       this.pedidosService.updateEstadoPedido(pedido,estado)
       .subscribe(res=>{

         this.getAllPedidos();
       }
         );
     }else if (estado == 3) {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Comenta que pasó con el pedido',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })

      if (text) {
        Swal.fire(`Se informará tu comentario ${estado}`, (text))
        this.pedido.empleado = JSON.parse(sessionStorage.getItem('idempledo'))
        this.pedidosService.updateEstadoPedido(pedido,estado)
        .subscribe(res=>{

          this.getAllPedidos();
        }
          );

      }
     }
  }


}
