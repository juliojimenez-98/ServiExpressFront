import { Injectable } from '@angular/core';
import { URL_TO_LOGIN } from '../util/global';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private urlGetProveedor = URL_TO_LOGIN.url + URL_TO_LOGIN.getProveedor;
  private urlGetProducto = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllProducto;
  private urlRegPedido = URL_TO_LOGIN.url + URL_TO_LOGIN.regPedido;
  private urlGetAllPedidos = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllPedidos;
  private urlGetAllProductoById = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllProductoById;
  private header: any;

  constructor(private http: HttpClient) { }

  getAllProveedores(): Observable<Proveedor[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Proveedor[]>(`${this.urlGetProveedor}`, { headers: this.header });
  }

  getAllProductos(): Observable<Producto[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Producto[]>(`${this.urlGetProducto}`, { headers: this.header });
  }

  getAllPedidos(): Observable<Pedido[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Pedido[]>(`${this.urlGetAllPedidos}`, { headers: this.header });
  }

  agregarPedido(pedido: Pedido) {
    console.log('Entrando al servicio')
    const raw = JSON.stringify(
    {
      idproveedor: pedido.idproveedor,
      idempleado: pedido.idempleado,
      idproducto: pedido.idproducto,
      cantidad: pedido.cantidad,
      fechapedido: pedido.fechapedido,
      fecharecibo: pedido.fecharecibo,
      estado: pedido.estado
    });
    console.log('paso 2')
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.put(`${this.urlRegPedido}`, raw, { headers: this.header });
  }

  getAllProductoById(id:number): Observable<Producto[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Producto[]>(`${this.urlGetAllProductoById + '/' + id}`,{ headers: this.header });
  }
}
