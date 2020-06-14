import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
})
export class EncuestaComponent implements OnInit {

  constructor(public nav:NavbarService) {
   }

  ngOnInit(): void {
    this.nav.hide();
  }

}
