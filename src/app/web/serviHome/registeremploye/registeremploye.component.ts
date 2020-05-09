import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { Util } from 'src/app/util/util';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registeremploye',
  templateUrl: './registeremploye.component.html',
  styleUrls: ['./registeremploye.component.css']
})
export class RegisteremployeComponent implements OnInit {
  public user: UserModel = new UserModel();
  private util: Util = new Util();
  public nombre : string = null;
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

    if ((sessionStorage.getItem('idrole') !== '1')) {
      Swal.fire('Restringido', `${sessionStorage.getItem('name')} no tienes acceso a esta página`, 'warning')
      this.router.navigate(['/login']);
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
         text:'Creando usuario empleado'
       })
       swal.showLoading();
       this.loginService.signupwork(this.user).subscribe(
         res  =>{swal.close();
                 swal.fire(  'Creado correctamente',  `Se ha enviado un mensaje al correo ${this.user.email}` ,  'success');
                 this.nombre = '';

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
