import { throwError } from 'rxjs/internal/observable/throwError';
import { UserModel } from '../models/UserModel';
import Swal from 'sweetalert2';
import { UserInfoModel } from '../models/UserInfoModel';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Empleado } from '../models/empleado';

export class Util {

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    Swal.fire('Error', `${error.error.message}`, 'error')
    // return throwError(errorMessage);
  }



  buildFormClient(user: UserModel): boolean {
    var email = user.email;
    user.username = email.substring(0, email.lastIndexOf("@"));
    //Chekbox Si es que es empresa
    let chkEmpresa = <HTMLInputElement>document.getElementById('chkEmpresa');
    if (chkEmpresa.checked) {
      user.role = '4';
    }
    else {
      user.role = '2';
    }
    // user.name="clientes";



    if (user.password !== user.password2) {
      Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
      return false;
    } else {
      return true;

    }



  }


  buildFormEmploye(user: UserModel): boolean {
    var email = user.email;
    user.username = email.substring(0, email.lastIndexOf("@"));
    //Chekbox Si es que es empresa
    let chkEmpresa = <HTMLInputElement>document.getElementById('chkEmpresa');
    if (chkEmpresa.checked) {
      user.role = '1';
    }
    else {
      user.role = '3';
    }
    // user.name="clientes";



    if (user.password !== user.password2) {
      Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
      return false;
    } else {
      return true;

    }



  }


  //logica termino de registro
  buildFormPerson(user: UserInfoModel, model: NgbDateStruct ): boolean {

    const date = new Date(model.year, model.month, model.day);
    user.fechaN = this.formatDate(date);
    return true;

  }


  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth()),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }



  // Comprobar usuario iniciado
  current(router: Router) {
    if (sessionStorage.getItem('current') === 'true' && sessionStorage.getItem('Avtivo') === 'false') {
      router.navigate(['/activar']);
    }else if (sessionStorage.getItem('current') === 'true'){
      router.navigate(['/home/inicio']);
    }
  }

  // load
  load(router: Router) {
    if (sessionStorage.getItem('Avtivo') === 'false') {
      router.navigate(['/activar']);
    } else {
      router.navigate(['/home/inicio']);
    }
  }



  obtenerPerfil(res :any){
    if (sessionStorage.getItem('idrole')=='1' || sessionStorage.getItem('idrole')=='3') {
      sessionStorage.setItem("idempleado",res["idempleado"]);
      sessionStorage.setItem("Avtivo", res["Avtivo"]);
      sessionStorage.setItem("rolename", res["rolename"]);
      sessionStorage.setItem("tokenType", res["tokenType"]);
      sessionStorage.setItem("username", res["username"]);
      sessionStorage.setItem("name", res["name"]);
      sessionStorage.setItem("apellido", res["apellido"]);
      sessionStorage.setItem("rut", res["rut"]);
      sessionStorage.setItem("telefono", res["telefono"]);
      sessionStorage.setItem("fechaNacimiento", res["fechaNacimiento"]);
      sessionStorage.setItem("current", 'true');


    }else if (sessionStorage.getItem('idrole')=='2'||sessionStorage.getItem('idrole')=='4') {
      sessionStorage.setItem("idcliente", res["idcliente"]);
      sessionStorage.setItem("Avtivo", res["Avtivo"]);
      sessionStorage.setItem("rolename", res["rolename"]);
      sessionStorage.setItem("tokenType", res["tokenType"]);
      sessionStorage.setItem("username", res["username"]);
      sessionStorage.setItem("name", res["name"]);
      sessionStorage.setItem("apellido", res["apellido"]);
      sessionStorage.setItem("rut", res["rut"]);
      sessionStorage.setItem("telefono", res["telefono"]);
      sessionStorage.setItem("fechaNacimiento", res["fechaNacimiento"]);
      sessionStorage.setItem("current", 'true');
    }
  }


  getUserDatos(res :any){
    sessionStorage.setItem("username", res["username"]);
      sessionStorage.setItem("name", res["name"]);
      sessionStorage.setItem("apellido", res["apellido"]);
      sessionStorage.setItem("rut", res["rut"]);
      sessionStorage.setItem("telefono", res["telefono"]);
      sessionStorage.setItem("fechaNacimiento", res["fechaNacimiento"]);
      sessionStorage.setItem("current", 'true');
  }
}

