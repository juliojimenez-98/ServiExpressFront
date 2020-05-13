import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from "../models/cliente";
import { of,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminClientesService {

  private urlEndPoint:string ='http://127.0.0.1:8090/api/entidad/allclientes';
  private header: any;

  constructor(private http: HttpClient) {}

    getCLientes(): Observable<Cliente[]>{
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion'));
      return this.http.get<Cliente[]>(`${this.urlEndPoint}`, { headers: this.header });
    
  
    
   }
}
