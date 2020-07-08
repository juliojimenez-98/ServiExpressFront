import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { NegocioService } from 'src/app/service/negocio.service';
@Component({
  selector: 'app-pagoexito',
  templateUrl: './pagoexito.component.html',
  styleUrls: ['./pagoexito.component.css']
})


export class PagoexitoComponent implements OnInit {

  constructor(public nav:NavbarService,private router: Router,private service:NegocioService) {

    
  }

 ngOnInit(): void {
   this.nav.hide();
   this.service.updateEstadoReserva(sessionStorage.getItem('idReservaTemp'),"5")
   .subscribe();
 }



 irr(){


  this.router.navigate(['home/historialreserva']);
 }

}
