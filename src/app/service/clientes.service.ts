import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Cliente } from '../models/cliente';
import { URL_TO_LOGIN } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfoModel } from '../models/UserInfoModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlRegVehiculo = URL_TO_LOGIN.url + URL_TO_LOGIN.regVehiculo;
  private urlClienteUpdate= URL_TO_LOGIN.updCre + URL_TO_LOGIN.updCre;
  private header: any;

  constructor(private http: HttpClient) { }

  registrarVehiculo(vehiculo: Vehiculo) {




    const raw = JSON.stringify(
    { idcliente: vehiculo.idcliente, idvehiculo: vehiculo.idvehiculo, patente: vehiculo.patente,
      marca: vehiculo.marca, modelo: vehiculo.modelo, tipovehiculo: vehiculo.tipovehiculo,
      anio: vehiculo.anio, nrochasis: vehiculo.nrochasis});
    this.header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    return this.http.put(`${this.urlRegVehiculo}`, raw, { headers: this.header });


  }
}
