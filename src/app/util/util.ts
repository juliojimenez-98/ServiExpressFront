import { throwError } from 'rxjs/internal/observable/throwError';
import { UserModel } from '../models/UserModel';
import Swal from 'sweetalert2';
import { UserInfoModel } from '../models/UserInfoModel';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
      router.navigate(['/inicio']);
    }
  }

  // load
  load(router: Router) {
    if (sessionStorage.getItem('Avtivo') === 'false') {
      router.navigate(['/activar']);
    } else {
      router.navigate(['/inicio']);
    }
  }







}

