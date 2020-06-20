import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Util } from 'src/app/util/util';
import { NegocioService } from 'src/app/service/negocio.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  p: number = 1;
  categorias: Categoria[];
  public categoria:Categoria = new Categoria();
  private util: Util = new Util();
  constructor(private negocioService: NegocioService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarDatosCategoria();

  }

  cargarCategorias(){
    this.negocioService.getAllCategorias().subscribe(categorias => this.categorias = categorias)
  }

  cargarDatosCategoria(){
    this.activatedRoute.params.subscribe(params=>{
      let idcategoria = params["idcategoria"]
      if(idcategoria){
        this.negocioService.getCategoria(idcategoria).subscribe( (categoria) =>
        this.categoria = categoria
        )
      }


    }
      )
  }





  public agregarCategoria(): void{

    this.negocioService.agregarCategoria(this.categoria).subscribe(
      res  =>{


        Swal.fire(  'Categoria Agregada',  `La categoría :  ${this.categoria.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/negociogestion/categorias']);
        this.cargarCategorias();
  },
  error => {
    this.util.handleError(error);
  },

);

}

public actCategoria(): void{

  this.negocioService.actualizarCategoria(this.categoria).subscribe(
    res  =>{
      Swal.fire(  'Categoria actualizada',  `La categoría :  ${this.categoria.nombre} se actualizó con exito` ,  'success');
      this.router.navigate(['/home/negociogestion/categorias']);
      this.cargarCategorias();

},
error => {
  this.util.handleError(error);
},

);

}

}
