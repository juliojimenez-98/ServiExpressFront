import { Component, OnInit } from '@angular/core';
import { NegocioService } from 'src/app/service/negocio.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private negocioService: NegocioService, private router:Router, private activateRoute:ActivatedRoute) {

  }


  ngOnInit(): void {
    this.cargarProductos();
    this.cargarDatosProducto();
    console.log(this.producto)

    this.negocioService.getAllCategorias().subscribe(categorias => this.categorias = categorias)
  }

  cargarDatosProducto(){
    this.activateRoute.params.subscribe(params=>{
      let idproducto = params["idproducto"]
      if(idproducto){
        this.negocioService.getProducto(idproducto).subscribe( (producto) =>
        this.producto = producto
        )
        console.log(this.producto)
        console.log(this.producto.categoria)
      }


    }
      )
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

public actProducto(): void{

  this.negocioService.actualizarProducto(this.producto).subscribe(
    res  =>{
      console.log(this.producto.idproducto)
      console.log(this.producto)
      console.log(res)
      Swal.fire(  'Categoria actualizada',  `La categoría :  ${this.producto.nombre} se actualizó con exito` ,  'success');
      this.router.navigate(['/home/negociogestion/productos']);
      this.cargarProductos();

},
error => {
  this.util.handleError(error);
},

);

}

// compararCategoria(o1:Categoria, o2:Categoria){

//   return o1 === null || o2 === null? false: o1.idcategoria === o2.idcategoria;

// }

}
