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
  public categorias: any;
  public categoria: Categoria = new Categoria();
  private util: Util = new Util();
  constructor(private negocioService: NegocioService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarDatosCategoria();

  }

  cargarCategorias() {
    this.negocioService.getAllCategorias().subscribe(resp => {
      this.categorias = resp;
    })
  }

  cargarDatosCategoria() {
    this.activatedRoute.params.subscribe(params => {
      this.categoria.descripcion = params['description'];
      this.categoria.idcategoria = params['id'];
      this.categoria.nombre = params['name'];
    }
    )
  }





  public agregarCategoria(): void {

    console.log(this.categoria);
    this.negocioService.agregarCategoria(this.categoria).subscribe(
      res => {


        Swal.fire('Categoria Agregada', `La categoría :  ${this.categoria.nombre} se agregó con exito`, 'success');
        this.router.navigate(['home/negociogestion/categorias']);
        this.cargarCategorias();
      },
      error => {
        this.util.handleError(error);
      },

    );

  }

  public actCategoria() {
    console.log(this.categoria);
    this.negocioService.actualizarCategoria(this.categoria).subscribe(
      res => {
        Swal.fire('Categoria actualizada', `La categoría :  ${this.categoria.nombre} se actualizó con exito`, 'success');
        this.router.navigate(['/home/negociogestion/categorias']);
        this.cargarCategorias();

      },
      error => {
        this.util.handleError(error);
      },

    );

  }

}
