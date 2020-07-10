import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import Swal from 'sweetalert2';
import { SatisfaccionService } from 'src/app/service/satisfaccion.service';
import { Encuesta, Encuesta2, Encuesta1 } from 'src/app/models/Encuesta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
})
export class EncuestaComponent implements OnInit {

  public encuesta:Encuesta = new Encuesta();
  public encuesta1:Encuesta1 = new Encuesta1();
  public encuesta2:Encuesta2 = new Encuesta2();

  constructor(public nav:NavbarService, private service:SatisfaccionService, private router:Router) {
   }

  ngOnInit(): void {
    this.nav.hide();
  }

  enviarEncusta(){
    this.encuesta.nombre = 'servicio';
    this.encuesta1.nombre = 'tiempo';
    this.encuesta2.nombre = 'recomendacion';
    this.service.enviarEncuesta(this.encuesta,this.encuesta1,this.encuesta2).subscribe(
      res=>{
        console.log(res)
        Swal.fire('Encuesta enviada', 'Gracias por ayudarnos a mejorar, ServiExpress.', 'success')
        this.router.navigate(['/'])
      }
    )
  }

}
