import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Util } from '../../util/util';
import { ThrowStmt } from '@angular/compiler';
import { UserModel } from 'src/app/models/UserModel';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: UserModel = new UserModel();
  private util: Util = new Util();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public signUp(): void{
   var buildFormClient = this.util.buildFormClient(this.user);

   if (buildFormClient) {
      swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Creando tu cuenta...'
      })
      swal.showLoading();
      this.loginService.signUp(this.user).subscribe(
        res  =>{swal.close();
                swal.fire(  'Creado correctamente',  'Te enviamos un correo con tus datos' ,  'success');
                this.router.navigate(['/login', res]);

        },
        error => {
          this.util.handleError(error);
        },

      );
    } else {
      console.log("error");

    }


  }



}
