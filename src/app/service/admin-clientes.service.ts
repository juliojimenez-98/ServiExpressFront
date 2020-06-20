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

  private urlGetEmpleados = URL_TO_LOGIN.url + URL_TO_LOGIN.getEmpleados;
  private urlGetClientes = URL_TO_LOGIN.url + URL_TO_LOGIN.getAllClientes;
  private header: any;

  constructor(private http: HttpClient) {}


  getAllClientes(): Observable<Cliente[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Cliente[]>(`${this.urlGetClientes}`, { headers: this.header });
  }

  getAllEmpleados(): Observable<Empleado[]>{
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
    return this.http.get<Empleado[]>(`${this.urlGetEmpleados}`, { headers: this.header });
  }


}
