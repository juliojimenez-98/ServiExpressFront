import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Util } from "../../util/util";
import { ThrowStmt } from '@angular/compiler';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: UserModel = new UserModel()
  private util:Util = new Util();

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public signUp(): void{
   var buildFormClient=this.util.buildFormClient(this.user);

    if (buildFormClient) {
      this.loginService.signUp(this.user).subscribe(
        res  =>{
          window.alert(res ["message"]);
          //console.log(res);
    
        },
        error => {
          //console.log(error);
          this.util.handleError(error);
        },
    
      );
    } else {
      console.log("error");
      
    }
    

  }



}
