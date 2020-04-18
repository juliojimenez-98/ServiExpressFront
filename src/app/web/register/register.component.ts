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
    this.loginService.signUp(this.user).subscribe()

  }
}
