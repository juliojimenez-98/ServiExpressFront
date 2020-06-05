import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { URL_TO_LOGIN } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { runInThisContext } from 'vm';
import { Producto } from '../models/producto';
import { Servicios, Servicios2 } from '../models/Servicios';
import { Reserva } from '../models/reserva';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  //URL's
  private urlRegCategoria = URL_TO_LOGIN.url + URL_TO_LOGIN.regCategoria;
  private urlRegProducto = URL_TO_LOGIN.url + URL_TO_LOGIN.regProducto;
  private urlRegServicio = URL_TO_LOGIN.url + URL_TO_LOGIN.regServicio;
  private urlGetCategoria = URL_TO_LOGIN.url + URL_TO_LOGIN.getCategoria;
  private urlGetCategoriaId = URL_TO_LOGIN.url + URL_TO_LOGIN.getCategoriaId;
  private urlGetProductos = URL_TO_LOGIN.url + URL_TO_LOGIN.getProductos;
  private urlGetAllCategoria = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllCategorias;
  private urlGetAllServicio = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllServicios;
  private urlGetServicio = URL_TO_LOGIN.url + URL_TO_LOGIN.getSerivicios;
  private urlGetAllProductoById = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllProductoById;
  private urlReserva = URL_TO_LOGIN.url + URL_TO_LOGIN.reservation;
  private urlUpdtCategoria = URL_TO_LOGIN.url + URL_TO_LOGIN.regCategoria;
  private getVeId = URL_TO_LOGIN.url + URL_TO_LOGIN.getVeiculosPorId;

  private header: any;

  constructor(private http: HttpClient) { }

  public categorias(page:number, size:number):Observable<any>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<any>(this.urlGetCategoria+ `page=${page}&size=${size}`, { headers: this.header });
  }

  getCategoria(idCategoria):Observable<Categoria>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Categoria>(`${this.urlGetCategoriaId}/${idCategoria}`, { headers: this.header })
  }

  getProducto(idProducto):Observable<Producto>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Producto>(`${this.urlRegProducto}/${idProducto}`, { headers: this.header })
  }

   public productos(page:number, size:number):Observable<any>{
     this.header = new HttpHeaders()
     .set('Content-Type', 'application/json; charset=utf-8')
     .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
     return this.http.get<any>(this.urlGetProductos+ `page=${page}&size=${size}`, { headers: this.header });
   }

   public servicios(page:number, size:number):Observable<any>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<any>(this.urlGetServicio+ `page=${page}&size=${size}`, { headers: this.header });
  }

  getAllCategorias(): Observable<Categoria[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Categoria[]>(`${this.urlGetAllCategoria}`, { headers: this.header });
  }

  getAllServicio(): Observable<Servicios[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Servicios[]>(`${this.urlGetAllServicio}`, { headers: this.header });
  }

  getAllServicio2(): Observable<Servicios2[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Servicios2[]>(`${this.urlGetAllServicio}`, { headers: this.header });
  }


  getCar(): Observable<Vehiculo[]>{
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Vehiculo[]>(`${this.getVeId + '/' + sessionStorage.getItem('idcliente') + '/allvehiculo'}`, { headers: this.header });
  }



  getAllProductoById(id:number): Observable<Producto[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Producto[]>(`${this.urlGetAllProductoById + '/' + id}`,{ headers: this.header });
  }

  agregarCategoria(categoria: Categoria) {
    const raw = JSON.stringify(
    {
      nombre: categoria.nombre,
      descripcion:categoria.descripcion
    });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.put(`${this.urlRegCategoria}`, raw, { headers: this.header });
  }

  agregarProducto(producto:Producto){
    console.log(producto.categoria.idcategoria)



    const raw = JSON.stringify(
      {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        valorbase: producto.valorbase,
        categoria: producto.categoria.idcategoria
      });
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
      return this.http.put(`${this.urlRegProducto}`, raw, { headers: this.header });
  }

  agregarServicio(servicio:Servicios){
    const raw = JSON.stringify(
      {
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        valorbase: servicio.valorbase,
        categoria: servicio.categoria.idcategoria
      });
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
      return this.http.put(`${this.urlRegServicio}`, raw, { headers: this.header });
  }


  agregarReserva(reserva:Reserva){
    console.log(reserva.idcliente)

    const raw = JSON.stringify(
      {
        idcliente: sessionStorage.getItem('idcliente'),
        idvehiculo: reserva.idvehiculo,
        servicios: reserva.servicios,
        productos: reserva.productos,
        fechareserva: reserva.fechareserva,
        horareserva: reserva.horareserva,
        estado: 0

      });
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
      return this.http.put(`${this.urlReserva}`, raw, { headers: this.header });
  }


  actualizarCategoria(categoria: Categoria) {
    const raw = JSON.stringify(
    {
      idcategoria:categoria.idcategoria,
      nombre: categoria.nombre,
      descripcion:categoria.descripcion
    });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.post(`${this.urlUpdtCategoria}`, raw, { headers: this.header });
  }

  actualizarProducto(producto: Producto) {
    const raw = JSON.stringify(
    {
      idproducto:producto.idproducto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      valorbase: producto.valorbase,
      categoria: producto.categoria.idcategoria

    });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.post(`${this.urlRegProducto}`, raw, { headers: this.header });
  }

  actualizar(servicio: Servicios) {
    const raw = JSON.stringify(
    {
      idproducto:servicio.idservicio,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      valorbase: servicio.valorbase,
      categoria: servicio.categoria.idcategoria

    });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.post(`${this.urlRegServicio}`, raw, { headers: this.header });
  }
}


