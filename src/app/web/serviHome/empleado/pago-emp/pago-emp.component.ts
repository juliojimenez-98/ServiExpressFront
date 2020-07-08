import { Component, OnInit } from '@angular/core';
import { ReservaPago } from 'src/app/models/ReservaPago';
import { NegocioService } from 'src/app/service/negocio.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import { Router } from '@angular/router';

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
  pagado=false;
  constructor(private service:NegocioService, private router:Router) {
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
    this.pagado = true;
    this.service.updateEstadoReservaPago(reserva).subscribe()

    setTimeout(() => {
      this.descargarBoletaManual()
     }, 1500);

     setTimeout(() => {
      Swal.fire('Reserva pagada', `la reserva fue pagada con éxito`,'success');
      this.router.navigate(['home/pagoemp'])
     }, 2000);

     setTimeout(() => {
      this.router.navigate(['home/pagoemp'])
     }, 2000);


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
          doc.addImage(newImage, 'PNG',  10, 10,750, 400);
          filename = 'boletaPagoManual' + '.pdf';
          doc.save(filename);
        };
      })
      .catch(function(error) {
       // Error Handling
      });



  }

}
