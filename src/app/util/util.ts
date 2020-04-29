import { throwError } from 'rxjs/internal/observable/throwError';
import { UserModel } from '../models/UserModel';
import Swal from 'sweetalert2';
import { UserInfoModel } from '../models/UserInfoModel';

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
        Swal.fire('Error', `${error.error.message}`,'error')
        // return throwError(errorMessage);
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
        // user.name="clientes";


        if (user.password!=user.password2) {
            Swal.fire('Error', 'Las contraseñas deben ser iguales','error')
            return false;
        } else {
            return true;

        }



      }


      //logica termino de registro
      buildFormPerson(user: UserInfoModel):boolean{

            return true;






      }
}

