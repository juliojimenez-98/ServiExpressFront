import { Injectable } from '@angular/core';
import { URL_TO_LOGIN } from '../util/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/UserModel';
import { Observable } from 'rxjs';
import { UserInfoModel } from '../models/UserInfoModel';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlSignIn = URL_TO_LOGIN.url + URL_TO_LOGIN.signin;
  private urlSignUp = URL_TO_LOGIN.url + URL_TO_LOGIN.signup;
  private urlSignUpWork = URL_TO_LOGIN.url + URL_TO_LOGIN.signupwork;
  private udpCreate = URL_TO_LOGIN.url + URL_TO_LOGIN.updCre;
  private updCreateEmp = URL_TO_LOGIN.url + URL_TO_LOGIN.updCreEmp;
  private reqPassw = URL_TO_LOGIN.url + URL_TO_LOGIN.reqPass;
  private chnPassw = URL_TO_LOGIN.url + URL_TO_LOGIN.chgPasw;
  private body: any;
  private userToken;
  private header: any;
  constructor(private http: HttpClient) { }


  signUp(user: UserModel) {

    const raw = JSON.stringify(
    { name: user.name, username: user.username, email: user.email, password: user.password, role: user.role });
    this.header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(`${this.urlSignUp}`, raw, { headers: this.header });


  }

  signupwork(user: UserModel) {

    const raw = JSON.stringify(
      { name: user.name, username: user.username, email: user.email, password: user.password, role: user.role });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    return this.http.put(`${this.urlSignUpWork}`, raw, { headers: this.header });


  }

  getToken(){
    if (localStorage.getItem('token_sesion')) {
      this.userToken = localStorage.getItem('token_sesion');

    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean{
    console.log(this.userToken)
    if (this.userToken != null) {
      console.log('esta auth')
      return true;
    }
    console.log('no esta logueado')
    return false;
  }

  hasRole(role: string): boolean {
    if (sessionStorage.getItem('rolename').includes(role)) {
      return true;
    }
    return false;
  }


  /**
   *
   * @param auth username or email
   * @param passw password user
   */
  signIn(auth: string, passw: string) {
    const raw = JSON.stringify({ usernameOrEmail: auth, password: passw });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    console.log(this.header);
    console.log(this.body);
    return this.http.post(`${this.urlSignIn}`, raw, { headers: this.header });
  }

  /**
   *
   * @param selection true for put, false for post
   */
  updateOrCreate(selection: boolean, userInfo: UserInfoModel) {
    const raw = JSON.stringify(
      { id_usuario: userInfo.idUsuario, rut: userInfo.rut, nombre: userInfo.nombre, apellido: userInfo.apellido,
        telefono: userInfo.telefono, fechaNacimiento: userInfo.fechaN });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    if (selection === true) {
      return this.http.put(`${this.udpCreate}`, raw, { headers: this.header });
    } else {
      this.body.append('idcliente', userInfo.idUsuario);
      return this.http.post(`${this.udpCreate}`, raw, { headers: this.header });
    }

  }
  updateOrCreateEmp(selection: boolean, userInfo: UserInfoModel) {
    const raw = JSON.stringify(
      { id_usuario: userInfo.idUsuario, rut: userInfo.rut, nombre: userInfo.nombre, apellido: userInfo.apellido,
        telefono: userInfo.telefono, fechaNacimiento: userInfo.fechaN });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token_sesion') );
    if (selection === true) {
      return this.http.put(`${this.updCreateEmp}`, raw, { headers: this.header });
    } else {
      this.body.append('idempleado', userInfo.idUsuario);
      return this.http.post(`${this.updCreateEmp}`, raw, { headers: this.header });
    }

  }

  requestPassword(username: string) {

    console.log(this.reqPassw + `${username}`);
    return this.http.put(`${this.reqPassw + `/${username}`}`, this.body);
  }

  chanegePassword(token: string, password: string) {
    this.body = new FormData();
    this.body.append('password', password);
    return this.http.put(`${this.chnPassw + `/${token}`}`, this.body);
  }

}
