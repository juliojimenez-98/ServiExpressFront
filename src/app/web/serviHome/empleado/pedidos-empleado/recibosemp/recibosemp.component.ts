import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/service/pedido.service';
import { Router } from '@angular/router';
import { NegocioService } from 'src/app/service/negocio.service';
import { Producto } from 'src/app/models/producto';
import { ThrowStmt } from '@angular/compiler';

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
  public producto:Producto = new Producto();
  constructor(private pedidosService:PedidoService, private router:Router, private service:NegocioService) {

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


  async estadoPedido(pedido$):Promise<void>{
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
       this.pedidosService.updateEstadoPedido(pedido$.idpedido,estado).subscribe();

      if (this.producto) {
        var stockAct = pedido$.producto.stock * 1 + pedido$.cantidad *1
       console.log(stockAct)
       this.producto.categoria = pedido$.producto.categoria
       console.log(this.producto.categoria)
       this.producto = pedido$.producto;
       this.producto.stock = stockAct;
       console.log(this.producto)

       this.service.actualizarProducto(this.producto).subscribe(
        res  =>{
           console.log(res)
           console.log(this.producto)
             Swal.fire(  'Actualizando stock',  `Se le actualizó el stock al producto ahora es  :  ${this.producto.stock} ` ,  'success');

       }
       );
      }


     }else if (estado == 3) {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        title:'Observacion del pedido',
        inputPlaceholder: 'Comenta que pasó con el pedido',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })


      if (text) {
        // Swal.fire(`Se informará tu comentario ${estado}`, (text))
        // this.pedido.empleado = JSON.parse(sessionStorage.getItem('idempledo'))
        // this.pedidosService.updateEstadoPedido(pedido$.idpedido,estado)
        // .subscribe(res=>{

        //   this.getAllPedidos();
        // }
        //   );

        this.pedido = pedido$
        this.pedido.comentariopedido = text
      this.pedido.estado = 3;
        this.pedidosService.actualizarPedido(this.pedido).subscribe(
         res=>{
           console.log(res)
           Swal.fire('Comentario enviado' ,`Tu comentario " ${text} " fue enviado`, 'warning')
           this.router.navigate(['home/pedidosempleado/pedidosemp'])


         }
       )

      }

     }
  }
  verObservacion(pedido$){
    Swal.fire('Observacion del pedido', `${pedido$.comentariopedido}`)
  }


}
