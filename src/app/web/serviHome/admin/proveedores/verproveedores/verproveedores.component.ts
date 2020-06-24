import { Component, OnInit } from '@angular/core';
import { AdminProveedoresService } from 'src/app/service/admin-proveedores.service';
import { Proveedor } from 'src/app/models/proveedores';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verproveedores',
  templateUrl: './verproveedores.component.html',
  styleUrls: ['./verproveedores.component.css']
})
export class VerproveedoresComponent implements OnInit {

  p: number = 1;
  proveedores: Proveedor[];
  public proveedor:Proveedor = new Proveedor();

  constructor(private proveedorService: AdminProveedoresService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores(){
    this.proveedorService.getAllProveedores().subscribe(
      proveedores => this.proveedores = proveedores
    );
  }
  cargarDatosCategoria(){
    this.activatedRoute.params.subscribe(params=>{
      let idproveedor = params["idproveedor"]
      if(idproveedor){
        this.proveedorService.getProveedor(idproveedor).subscribe( (proveedor) =>
        this.proveedor = proveedor
        )
      }
    }
      )
  }



}
