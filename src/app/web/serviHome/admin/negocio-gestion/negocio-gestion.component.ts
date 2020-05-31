import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-negocio-gestion',
  templateUrl: './negocio-gestion.component.html',
  styleUrls: ['./negocio-gestion.component.css']
})
export class NegocioGestionComponent implements OnInit {
  active = 1;
  page = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
