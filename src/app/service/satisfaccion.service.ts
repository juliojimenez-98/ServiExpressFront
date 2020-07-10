import { Injectable } from '@angular/core';
import { URL_TO_LOGIN } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Encuesta, Encuesta2, Encuesta1 } from '../models/Encuesta';

@Injectable({
  providedIn: 'root'
})
export class SatisfaccionService {

  private urlEnviarEncuesta = URL_TO_LOGIN.url + URL_TO_LOGIN.enviarEncuesta;
  private header: any;

  constructor(private http:HttpClient) { }

  enviarEncuesta(encuesta:Encuesta,encuesta1:Encuesta1,encuesta2:Encuesta2){
    const raw = JSON.stringify(
      [{
        nombre:encuesta.nombre,
        tipo:encuesta.tipo,
        fecha:encuesta.fecha
      },
      {
        nombre:encuesta1.nombre,
        tipo:encuesta1.tipo,
        fecha:encuesta1.fecha
      },
      {
        nombre:encuesta2.nombre,
        tipo:encuesta2.tipo
      }

      ]);
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
      return this.http.put(`${this.urlEnviarEncuesta}`, raw, { headers: this.header });
  }
}
