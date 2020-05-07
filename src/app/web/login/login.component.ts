import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private estado: boolean = false;


  constructor(private loginService: LoginService, private router: Router) {
    //  this.signInWeb(this.user,this.passw);
    if (sessionStorage.getItem('current') === 'true' && sessionStorage.getItem('Avtivo') === 'false') {
      this.router.navigate(['/activar']);
    }else if (sessionStorage.getItem('current') === 'true'){
      this.router.navigate(['/inicio']);
    }
  }

  ngOnInit() {
  }

  signInWeb(username: string, password: string, event: Event) {
    event.preventDefault();
    swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Iniciando sesión...'
    })
    swal.showLoading();

    this.loginService.signIn(username, password).subscribe(
      res => {
        swal.close();

        localStorage.setItem("token_sesion", res["accessToken"]);
        //modo temporal despues hacerlo de una forma mas dinamica
        sessionStorage.setItem("iduser", res["iduser"]);
        sessionStorage.setItem("idrole", res["idrole"]);
        sessionStorage.setItem("Avtivo", res["Avtivo"]);
        sessionStorage.setItem("rolename", res["rolename"]);
        sessionStorage.setItem("tokenType", res["tokenType"]);
        sessionStorage.setItem("username", res["username"]);
        sessionStorage.setItem("name", res["name"]);
        sessionStorage.setItem("current", 'true');


        this.estado = res["Avtivo"];
        if (this.estado) {
          this.router.navigate(['/inicio', res]);
        } else {
          this.router.navigate(['/activar', res]);
        }






      },
      error => {
        if (error.status == 401) {
          swal.fire('Error login', 'Usuario o contraseña Incorrecta', 'error')
        }
        this.handleError(error);
      },

    );


  }

  handleError(error) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }

    return throwError(errorMessage);
  }

  // navigate() {
  //   this.router.navigateByUrl('/home');
  // }
}
