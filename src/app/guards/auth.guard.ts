import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
      private router:Router){}

  canActivate():boolean{
     if (this.loginService.estaAutenticado()) {
       return true;
         }
         Swal.fire('Inicia Sesión', 'No estás autenticado', 'warning')
         this.router.navigate(['/login']);
      return false;



  }


}
