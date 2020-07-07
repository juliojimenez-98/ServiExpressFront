import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-pagoexito',
  templateUrl: './pagoexito.component.html',
  styleUrls: ['./pagoexito.component.css']
})
export class PagoexitoComponent implements OnInit {

  constructor(public nav:NavbarService) {
  }

 ngOnInit(): void {
   this.nav.hide();
 }


}
