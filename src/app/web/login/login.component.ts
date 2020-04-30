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
