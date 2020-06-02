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
  page = 0;
  size = 6;
  contPages= 0;
  totalPages: Array<number>;
  public categoria:Categoria = new Categoria();
  categorias: Array<any>;
  private util: Util = new Util();
  constructor(private negocioService: NegocioService, private router:Router) { }

  ngOnInit(): void {
    // this.negocioService.getCategorias().subscribe(
    //   category => this.category = category
    // );
    this.cargarCategorias();

  }

  cargarCategorias(){
    this.negocioService.categorias(this.page,this.size).subscribe(
      res=>{
        this.categorias = res;
        this.totalPages = new Array(res['totalPages']);
        console.log(this.page);
      },
      err=> {
        console.log(err.error)
      }
    )
  }

  sumPag(i:number){
    this.page = i+1;
    this.cargarCategorias();
    console.log(i)
  }

  resPag(i:number){
    this.page = i-1;
    this.cargarCategorias();
    console.log(i)
  }


  public agregarCategoria(): void{

    this.negocioService.agregarCategoria(this.categoria).subscribe(
      res  =>{


        Swal.fire(  'Categoria Agregada',  `La categoría :  ${this.categoria.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/negociogestion', res]);

  },
  error => {
    this.util.handleError(error);
  },

);

}

}
