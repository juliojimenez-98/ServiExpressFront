import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.hide();

    this.cargarAppJs('../assets/js/app.js');
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
