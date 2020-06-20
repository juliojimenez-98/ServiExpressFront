import { Component, OnInit } from '@angular/core';
import { NegocioService } from 'src/app/service/negocio.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Util } from 'src/app/util/util';

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
