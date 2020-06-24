import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/proveedor';
import { URL_TO_LOGIN } from '../util/global';

@Injectable({
  providedIn: 'root'
})
export class AdminProveedoresService {

  private urlGetProveedor = URL_TO_LOGIN.url + URL_TO_LOGIN.getProveedor;
  private urlGetProveedorId = URL_TO_LOGIN.url + URL_TO_LOGIN.getProveedorId;
  private header: any;

  constructor(private http: HttpClient) { }

  getAllProveedores(): Observable<Proveedor[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Proveedor[]>(`${this.urlGetProveedor}`, { headers: this.header });
  }

  getProveedor(idProveedor):Observable<Proveedor>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Proveedor>(`${this.urlGetProveedorId}/${idProveedor}`, { headers: this.header })
  }

  agregarProveedor(proveedor: Proveedor) {
    const raw = JSON.stringify(
    {
      rut: proveedor.rut,
      nombre: proveedor.nombre,
      apellido:proveedor.apellido,
      correo:proveedor.correo,
      empresa:proveedor.empresa,
      producto:proveedor.producto,
      telefono:proveedor.telefono
    });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.put(`${this.urlGetProveedorId}`, raw, { headers: this.header });
  }
}
