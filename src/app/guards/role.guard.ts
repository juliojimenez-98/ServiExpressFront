import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private loginService:LoginService,
    private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let role = next.data['role'] as string;
      if (this.loginService.hasRole(role)) {

        return true
      }
      console.log(sessionStorage.getItem('rolename'))
      Swal.fire('Acceso denegado', `hola ${sessionStorage.getItem('name')} No tienes acceso a esta ruta`, 'warning');
      this.router.navigate(['/home/inicio'])
      return false;
  }

}
