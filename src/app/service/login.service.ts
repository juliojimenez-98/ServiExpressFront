import { Injectable } from '@angular/core';
import { URL_TO_LOGIN } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/UserModel';
import { Observable } from 'rxjs';
import { UserInfoModel } from '../models/UserInfoModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlSignIn = URL_TO_LOGIN.url + URL_TO_LOGIN.signin;
  private urlSignUp = URL_TO_LOGIN.url + URL_TO_LOGIN.signup;
  private udpCreate = URL_TO_LOGIN.url + URL_TO_LOGIN.updCre;
  private reqPassw = URL_TO_LOGIN.url + URL_TO_LOGIN.reqPass;
  private chnPassw = URL_TO_LOGIN.url + URL_TO_LOGIN.chgPasw;
  private body: any;
  private header: any;
  constructor(private http: HttpClient) { }


  /**
  *
  * @param user Recive a user to create
  */
  signUp(user: UserModel) {

    var raw = JSON.stringify({ "name": user.name, "username": user.username, "email": user.email, "password": user.password, "role": user.role });
    this.header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(`${this.urlSignUp}`, raw, { headers: this.header });


  }

  /**
   *
   * @param auth username or email
   * @param passw password user
   */
  signIn(auth: string, passw: string) {
    var raw = JSON.stringify({ "usernameOrEmail": auth, "password": passw });
    this.header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log(this.header);
    console.log(this.body);
    return this.http.post(`${this.urlSignIn}`, raw, { headers: this.header });
  }

  /**
   *
   * @param selection true for put, false for post
   */
  updateOrCreate(selection: boolean, userInfo: UserInfoModel) {
    var raw = JSON.stringify({ "id_usuario": userInfo.idUsuario, "rut": userInfo.rut, "nombre": userInfo.nombre, "apellido": userInfo.apellido, "telefono": userInfo.telefono, "fechaNacimiento": userInfo.fechaN });
    this.header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    if (selection == true) {
      return this.http.put(`${this.udpCreate}`, raw, { headers: this.header });
    } else {
      this.body.append("idcliente", userInfo.idUsuario);
      return this.http.post(`${this.udpCreate}`, raw, { headers: this.header });
    }

  }

  requestPassword(username: string) {

    console.log(this.reqPassw + `${username}`);
    return this.http.put(`${this.reqPassw + `/${username}`}`, this.body);
  }

  chanegePassword(token: string, password: string) {
    this.body = new FormData();
    this.body.append("password", password);
    return this.http.put(`${this.chnPassw + `/${token}`}`, this.body);
  }

}
