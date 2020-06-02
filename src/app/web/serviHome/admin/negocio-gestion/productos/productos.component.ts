import { Component, OnInit } from '@angular/core';
import { NegocioService } from 'src/app/service/negocio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/models/producto';
import { Util } from 'src/app/util/util';
import { Categoria } from 'src/app/models/categoria';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  page=1;
  categorias: Categoria[];
  public producto:Producto = new Producto();
  private util: Util = new Util();
  public idCategoria:any;
  // categoriaform = FormGroup;

  constructor(private negocioService: NegocioService, private router:Router) {
    // this.categoriaform = new FormGroup({
    //   cate: new FormControl(null)
    // });

  }


  ngOnInit(): void {
    this.negocioService.getAllCategorias().subscribe(categorias => this.categorias = categorias)
  }

  // callType(value){
  //   console.log(value)
  //   sessionStorage.setItem("idcategoria", value);
  //   console.log(sessionStorage.getItem('idcategoria'))
  // }

  // compararCategoria(o1:Categoria, o2:Categoria){
  //   return o1 ===null || o2=== null? false: o1.idcategoria===o2.idcategoria;
  // }

  public agregarPRoducto(): void{

    console.log("hola"+this.producto.categoria)
    this.negocioService.agregarProducto(this.producto).subscribe(

      res  =>{
        // this.callType(res)
        // var idcategoria = this.callType;
        console.log(this.producto.categoria)

        Swal.fire(  'Producto agregado',  `El producto : ${this.producto.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/negociogestion']);

      console.log(res)

  },
  error => {
    this.util.handleError(error);
  },

);

}

}
