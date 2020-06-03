import { Component, OnInit } from '@angular/core';
import { NegocioService } from 'src/app/service/negocio.service';
import { Servicios } from 'src/app/models/Servicios';
import { Util } from 'src/app/util/util';
import { Categoria } from 'src/app/models/categoria';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios-n',
  templateUrl: './servicios-n.component.html',
  styleUrls: ['./servicios-n.component.css']
})
export class ServiciosNComponent implements OnInit {
  page=0;
  size = 4;
  servicios: Array<any>;
  categorias: Categoria[];
  public servicio:Servicios = new Servicios();
  private util: Util = new Util();
  constructor(private negocioService:NegocioService, private router:Router) { }

  ngOnInit(): void {
    this.cargarServicios()
    this.negocioService.getAllCategorias().subscribe(categorias => this.categorias = categorias)
  }

  cargarServicios(){
    this.negocioService.servicios(this.page,this.size).subscribe(
      res=>{
        this.servicios = res;
        console.log(this.page);
      },
      err=> {
        console.log(err.error)
      }
    )
  }

  sumPag(i:number){
    this.page = i+1;
    this.cargarServicios();
    console.log(i)
  }

  resPag(i:number){
    this.page = i-1;
    this.cargarServicios();
    console.log(i)
  }

  public agregarServicio(): void{

    this.negocioService.agregarServicio(this.servicio).subscribe(

      res  =>{
        // this.callType(res)
        // var idcategoria = this.callType;
        console.log(this.servicio.categoria)

        Swal.fire(  'Servicio agregado',  `El Servicio : ${this.servicio.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/negociogestion']);
        this.cargarServicios();

      console.log(res)

  },
  error => {
    this.util.handleError(error);
  },

);

}

}
