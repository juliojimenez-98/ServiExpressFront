import { Component, OnInit } from '@angular/core';
import { ReservaPago } from 'src/app/models/ReservaPago';
import { NegocioService } from 'src/app/service/negocio.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-pago-emp',
  templateUrl: './pago-emp.component.html',
  styleUrls: ['./pago-emp.component.css']
})
export class PagoEmpComponent implements OnInit {
  reservasPagos:ReservaPago[]
  patente:string;
  public reservapago:ReservaPago = new ReservaPago();
  moneda:string;
  constructor(private service:NegocioService) {
    this.moneda = sessionStorage.getItem('moneda')
   }

  ngOnInit(): void {
  }

  getReservaPago(valor){
    this.patente = valor
    this.service.getReservaPago(this.patente).subscribe(
      reservaPago => this.reservasPagos = reservaPago
    )
  }

  actualizarEstadoReserva(reserva){

    this.service.updateEstadoReservaPago(reserva).subscribe(res=>{

      Swal.fire('Estado de reserva','El estado cambió a Pagado','success')

    }
    )

  }

  descargarBoletaManual(){
    var node = document.getElementById('contenido');
    var img;
    var filename;
    var newImage;
    domtoimage.toPng(node, { bgcolor: '#fff' })
      .then(function(dataUrl) {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;
        img.onload = function(){
        var pdfWidth = img.width;
        var pdfHeight = img.height;
          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
          var doc;
          if(pdfWidth > pdfHeight)
          {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }
          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();
          doc.addImage(newImage, 'PNG',  10, 10,550, 270);
          filename = 'boletaPagoManual' + '.pdf';
          doc.save(filename);
        };
      })
      .catch(function(error) {
       // Error Handling
      });

  }

}
