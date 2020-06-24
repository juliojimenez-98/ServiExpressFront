import { Component, OnInit } from '@angular/core';
import { AdminProveedoresService } from 'src/app/service/admin-proveedores.service';
import { Proveedor } from 'src/app/models/proveedor';
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





}
