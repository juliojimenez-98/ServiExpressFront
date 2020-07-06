import { Injectable } from '@angular/core';
import { URL_ENCUESTAS } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private urlencuesta1 = URL_ENCUESTAS.url + URL_ENCUESTAS.getEncuesta1;
  private urlencuesta3 = URL_ENCUESTAS.url + URL_ENCUESTAS.getEncuesta3;

  constructor(private http: HttpClient) { }
  private header: any;
  buscarEncuestas(fini: String, ffin: String) {

    const raw = JSON.stringify(
      { fechaini: fini, fechafin: ffin });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.post(`${this.urlencuesta1}`, raw, { headers: this.header });


  }

  reporte3() {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.get(`${this.urlencuesta3}`,  { headers: this.header });


  }


}
