import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { NegocioService } from 'src/app/service/negocio.service';
import { Servicios } from 'src/app/models/Servicios';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  servicios: Servicios[];
  constructor(private negocioService: NegocioService,) { }

  ngOnInit(): void {
    this.cargarAppJs('../assets/js/app.js');

    this.negocioService.getAllServicio().subscribe(servicios => this.servicios = servicios)
  }
  public cargarAppJs(url: string) {
       const body = <HTMLDivElement> document.body;
       const script = document.createElement('script');
       script.innerHTML = '';
       script.src = url;
       script.async = false;
       script.defer = true;
       body.appendChild(script);
     }




}
