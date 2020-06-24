import { Component, OnInit } from '@angular/core';
import { AdminProveedoresService } from 'src/app/service/admin-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedor } from 'src/app/models/proveedor';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-registrarproveedores',
  templateUrl: './registrarproveedores.component.html',
  styleUrls: ['./registrarproveedores.component.css']
})
export class RegistrarproveedoresComponent implements OnInit {

  public proveedor:Proveedor = new Proveedor();
  private util: Util = new Util();
  constructor(private proveedorService: AdminProveedoresService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }
  public agregarProveedor(): void{

    this.proveedorService.agregarProveedor(this.proveedor).subscribe(
      res  =>{
        console.log(res)

        Swal.fire(  'Proveedor agregado',  `El proveedor :  ${this.proveedor.nombre} se agregó con exito` ,  'success');
        this.router.navigate(['home/proveedores/verproveedores']);
  },
  error => {
    this.util.handleError(error);
  },

);

}
}
