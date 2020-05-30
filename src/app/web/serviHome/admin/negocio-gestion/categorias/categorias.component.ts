import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Util } from 'src/app/util/util';
import { NegocioService } from 'src/app/service/negocio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  page = 1;
  public categoria:Categoria = new Categoria();
  private util: Util = new Util();
  constructor(private negocioService: NegocioService, private router:Router) { }

  ngOnInit(): void {
  }
  public agregarCategoria(): void{

    this.negocioService.agregarCategoria(this.categoria).subscribe(
      res  =>{


        Swal.fire(  'Categoria Agregada',  `La categoría fue agregada : ${this.categoria.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/negociogestion', res]);

  },
  error => {
    this.util.handleError(error);
  },

);

}

}
