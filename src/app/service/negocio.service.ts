import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { URL_TO_LOGIN } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { runInThisContext } from 'vm';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  private urlRegCategoria = URL_TO_LOGIN.url + URL_TO_LOGIN.regCategoria;
  private urlRegProducto = URL_TO_LOGIN.url + URL_TO_LOGIN.regProducto;
  private urlGetCategoria = URL_TO_LOGIN.url + URL_TO_LOGIN.getCategoría;
  private urlGetAllCategoria = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllCategorias;
  private header: any;

  constructor(private http: HttpClient) { }

//   getCategorias(): Observable<Categoria[]>{
//     this.header = new HttpHeaders()
//     .set('Content-Type', 'application/json; charset=utf-8')
//     .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
//     return this.http.get<Categoria[]>(`${this.getCategorias}`, { headers: this.header });
//  }

  public categorias(page:number, size:number):Observable<any>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<any>(this.urlGetCategoria+ `page=${page}&size=${size}`, { headers: this.header });
  }

  getAllCategorias(): Observable<Categoria[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Categoria[]>(`${this.urlGetAllCategoria}`, { headers: this.header });
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
        valorbase: producto.valorBase,
        categoria: producto.categoria.idcategoria
      });
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
      return this.http.put(`${this.urlRegProducto}`, raw, { headers: this.header });
  }
}
