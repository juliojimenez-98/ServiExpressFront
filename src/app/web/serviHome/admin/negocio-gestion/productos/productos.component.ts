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
  page=0;
  size = 4;
  contPages= 0;
  productos: Array<any>;
  categorias: Categoria[];
  public producto:Producto = new Producto();
  private util: Util = new Util();
  public idCategoria:any;

  constructor(private negocioService: NegocioService, private router:Router) {

  }


  ngOnInit(): void {
    this.cargarProductos();
    this.negocioService.getAllCategorias().subscribe(categorias => this.categorias = categorias)
  }

  cargarProductos(){
    this.negocioService.productos(this.page,this.size).subscribe(
      res=>{
        this.productos = res;
        console.log(this.page);
      },
      err=> {
        console.log(err.error)
      }
    )
  }

  sumPag(i:number){
    this.page = i+1;
    this.cargarProductos();
    console.log(i)
  }

  resPag(i:number){
    this.page = i-1;
    this.cargarProductos();
    console.log(i)
  }


  public agregarPRoducto(): void{

    console.log("hola"+this.producto.categoria)
    this.negocioService.agregarProducto(this.producto).subscribe(

      res  =>{
        // this.callType(res)
        // var idcategoria = this.callType;
        console.log(this.producto.categoria)

        Swal.fire(  'Producto agregado',  `El producto : ${this.producto.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/negociogestion']);
        this.cargarProductos();

      console.log(res)

  },
  error => {
    this.util.handleError(error);
  },

);

}

}
