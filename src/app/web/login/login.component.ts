import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: string = "admin";
  private passw: string = "123456";
  constructor(private loginService:LoginService) {
       this.signInWeb(this.user,this.passw);
   }

  ngOnInit() {
  }

  signInWeb(userto :string, passw:string){
    this.loginService.signIn(userto,passw).subscribe(resp =>{
      localStorage.setItem("token_sesion",resp["accessToken"]);
      console.log(resp);
    });
  }

}
