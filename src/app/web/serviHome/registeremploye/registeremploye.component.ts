import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { Util } from 'src/app/util/util';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-registeremploye',
  templateUrl: './registeremploye.component.html',
  styleUrls: ['./registeremploye.component.css']
})
export class RegisteremployeComponent implements OnInit {
  public user: UserModel = new UserModel();
  private util: Util = new Util();

  cliente = false;
  admin = false;
  empleado = false;


  constructor(public nav: NavbarService,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {

    });

    if (sessionStorage.getItem('idrole') === '2') {
      this.cliente = true;
    } else if (sessionStorage.getItem('idrole') === '1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole') === '3') {
      this.empleado = true;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }



  ngOnInit(): void {
  }

  public signUpWork(): void{
    var buildFormClient = this.util.buildFormEmploye(this.user);

    if (buildFormClient) {
       swal.fire({
         allowOutsideClick: false,
         icon: 'info',
         text:'Creando tu cuenta...'
       })
       swal.showLoading();
       this.loginService.signupwork(this.user).subscribe(
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
