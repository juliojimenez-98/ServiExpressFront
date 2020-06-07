import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from "../models/cliente";
import { of,Observable} from 'rxjs';
import { Empleado } from '../models/empleado';
import { URL_TO_LOGIN } from '../util/global';

@Injectable({
  providedIn: 'root'
})
export class AdminClientesService {

  private urlGetEmpleadosPag = URL_TO_LOGIN.url + URL_TO_LOGIN.getEmpleadosPag;
  private getClientesPag = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllClientesPag;
  private header: any;

  constructor(private http: HttpClient) {}


   public empleadosPag(page:number, size:number):Observable<any>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<any>(this.urlGetEmpleadosPag+ `page=${page}&size=${size}`, { headers: this.header });
  }
  public getClientes(page:number, size:number):Observable<any>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<any>(this.getClientesPag+ `page=${page}&size=${size}`, { headers: this.header });
  }


}
