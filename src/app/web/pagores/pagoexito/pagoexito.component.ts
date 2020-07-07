import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
@Component({
  selector: 'app-pagoexito',
  templateUrl: './pagoexito.component.html',
  styleUrls: ['./pagoexito.component.css']
})


export class PagoexitoComponent implements OnInit {

  constructor(public nav:NavbarService,private router: Router) {

    
  }

 ngOnInit(): void {
   this.nav.hide();
 }



 irr(){
  this.router.navigate(['home/historialreserva']);
 }

}
