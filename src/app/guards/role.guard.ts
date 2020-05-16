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
      // if (this.loginService.estaAutenticado()) {
      //   this.router.navigateByUrl('login')
      //   return false;
      // }
      // let rolename1 = sessionStorage.getItem('rolename');
      let role = next.data['role'] as string;
      console.log(role)
      if (this.loginService.hasRole(role)) {
        return true
      }

      Swal.fire('Acceso denegado', `hola ${sessionStorage.getItem('name')} No tienes acceso a esta ruta`, 'warning');
      this.router.navigate(['/inicio'])
      return false;
  }

}
