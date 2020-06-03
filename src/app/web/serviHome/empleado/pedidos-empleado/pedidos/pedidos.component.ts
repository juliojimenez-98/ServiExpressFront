import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
