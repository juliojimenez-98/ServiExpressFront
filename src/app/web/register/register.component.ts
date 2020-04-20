import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ThrowStmt } from '@angular/compiler';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: UserModel = new UserModel()


  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public signUp(): void{
    this.user.role= "2";
    var email = this.user.email;
    this.user.username   = email.substring(0, email.lastIndexOf("@"));
    this.user.name="prueba";

    console.log(this.user);
    this.loginService.signUp(this.user).subscribe()
  }
}
