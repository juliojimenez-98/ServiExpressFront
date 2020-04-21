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
  constructor(private http:HttpClient) { }


   /**
   *
   * @param user Recive a user to create
   */
  signUp(user: UserModel){
    var email = user.email;
    user.username   = email.substring(0, email.lastIndexOf("@"));

    //Chekbox Si es que es empresa
    let chkEmpresa = <HTMLInputElement> document.getElementById("chkEmpresa");
    if (chkEmpresa.checked) {
        user.role= "4";
    }
    else{
      user.role= "2";
    }
    user.name="clientes";
    var raw = JSON.stringify({"name":user.name,"username":user.username,"email":user.email,"password":user.password,"password2":user.password2,"role":user.role});
    this.header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


    console.log(this.header);
    console.log(this.body);
    console.log(user);
    return this.http.put(`${this.urlSignUp}`,raw,{headers: this.header});
  }

  /**
   *
   * @param auth username or email
   * @param passw password user
   */
  signIn(auth: string, passw: string) {
    var raw = JSON.stringify({"usernameOrEmail":auth,"password":passw});
    this.header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log(this.header);
    console.log(this.body);
    return this.http.post(`${this.urlSignIn}`, raw,{headers: this.header});
  }

  /**
   *
   * @param selection true for put, false for post
   */
  updateOrCreate(selection: boolean,userInfo:UserInfoModel) {
    this.body = new FormData();
    this.body.append("id_usuario",userInfo.idUsuario);
    this.body.append("rut",userInfo.rut);
    this.body.append("nombre",userInfo.nombre);
    this.body.append("apellido",userInfo.apellido);
    this.body.append("fechaNacimiento",userInfo.fechaN);

    if (selection == true) {

      return this.http.put(`${this.udpCreate}`, this.body);
    } else {
      this.body.append("idcliente",userInfo.idUsuario);
      return this.http.post(`${this.udpCreate}`, this.body);
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
