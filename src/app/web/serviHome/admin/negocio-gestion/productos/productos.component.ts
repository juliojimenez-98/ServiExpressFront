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
  p: number = 1;
  productos: Producto[];
  categorias: Categoria[];
  public producto:Producto = new Producto();
  private util: Util = new Util();
  public idCategoria:any;
  public moneda: any;

  constructor(private negocioService: NegocioService, private router:Router, private activateRoute:ActivatedRoute) {
    sessionStorage.setItem("moneda",'$');
    this.moneda = sessionStorage.getItem('moneda');
  }


  ngOnInit(): void {
    this.cargarAllProductos();
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


  cargarAllProductos(){
    this.negocioService.getAllProductos().subscribe(productos => this.productos = productos)
  }


  public agregarPRoducto(): void{

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Creando servicio...'
    })
    this.negocioService.agregarProducto(this.producto).subscribe(

      res  =>{
        Swal.close();
        // this.callType(res)
        // var idcategoria = this.callType;
        console.log(this.producto.categoria)

        Swal.fire(  'Producto agregado',  `El producto : ${this.producto.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/negociogestion/productos']);
        this.cargarAllProductos();

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
      Swal.fire(  'Servicio actualizado',  `El servicio :  ${this.producto.nombre} se actualizó con exito` ,  'success');
      this.router.navigate(['/home/negociogestion/productos']);
      this.cargarAllProductos();
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
