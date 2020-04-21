import { throwError } from 'rxjs/internal/observable/throwError';
import { UserModel } from '../models/UserModel';

export class Util {

   handleError(error:any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }


    buildFormClient(user: UserModel):boolean{
        var email = user.email;
        user.username   = email.substring(0, email.lastIndexOf("@"));
        //Chekbox Si es que es empresa
        let chkEmpresa = <HTMLInputElement> document.getElementById("chkEmpresa");
        if (chkEmpresa.checked) {
            user.role= "4";
        }
        else{
          user.role= "2";
        }
        user.name="clientes";

        if (user.password!=user.password2) {
            window.alert("La contraseña deben ser iguales");
            return false;
        } else {
            return true;  

        }
        
      }
}

