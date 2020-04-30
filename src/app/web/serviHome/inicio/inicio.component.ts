import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {



  constructor(public nav: NavbarService) {
    this.nav.hide();
    this.nav.doSomethingElseUseful();

  }

  ngOnInit(): void {
  }

}
