import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // private user: string = "admin";
  // private passw: string = "123456";
  constructor(private loginService:LoginService) {
      //  this.signInWeb(this.user,this.passw);
   }

  ngOnInit() {
  }

  signInWeb(username :string, password :string, event: Event){
    event.preventDefault(); 
    this.loginService.signIn(username,password ).subscribe(
      res  =>{
      localStorage.setItem("token_sesion",res ["accessToken"]);

      console.log(res);

    },
    error => {
      console.log(error);
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
  window.alert(errorMessage);
  return throwError(errorMessage);
}

// navigate() {
//   this.router.navigateByUrl('/home');
// }
}
