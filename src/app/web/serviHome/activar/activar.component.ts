import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfoModel } from 'src/app/models/UserInfoModel';
import { Util } from 'src/app/util/util';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.css']
})
export class ActivarComponent implements OnInit {
  public name = '';

  public user: UserInfoModel = new UserInfoModel();
  private util: Util = new Util();
  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService) {

    this.activatedRoute.params.subscribe( params => {
      this.name = params.name ;
      this.user.idUsuario=params.iduser;
      // console.log(this.heroe);
  });
  }

  ngOnInit(): void {
  }


  public registerPerson(): void{
    let buildFormPerson = this.util.buildFormPerson(this.user);

    console.log(this.user);
    this.loginService.updateOrCreate(true, this.user).subscribe(
         res  => {
            console.log(res);

         },
         error => {
           this.util.handleError(error);
         },

       );



   }
}
