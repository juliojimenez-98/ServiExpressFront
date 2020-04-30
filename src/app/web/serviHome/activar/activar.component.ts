import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoModel } from 'src/app/models/UserInfoModel';
import { Util } from 'src/app/util/util';
import { LoginService } from 'src/app/service/login.service';
import { NavbarService } from 'src/app/service/navbar.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.css']
})
export class ActivarComponent implements OnInit {
  model: NgbDateStruct;
  public name = '';
  public parametros: any;

  public user: UserInfoModel = new UserInfoModel();
  private util: Util = new Util();
  constructor(private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              public nav: NavbarService,
              private router: Router) {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
    this.activatedRoute.params.subscribe( params => {
      this.name = params.name ;
      this.user.idUsuario = params.iduser;
      // console.log(this.heroe);
      this.parametros = params;

  });


  }

  ngOnInit(): void {
  }


  public registerPerson(): void{
    const buildFormPerson = this.util.buildFormPerson(this.user);
    this.user.fechaN = this.model.year.toString() + this.model.month.toString() + this.model.day.toString();
    console.log(this.user.fechaN);
    this.loginService.updateOrCreate(true, this.user).subscribe(
         res  => {
            console.log(this.parametros);
            this.router.navigate(['/inicio', this.parametros]);
         },
         error => {
           this.util.handleError(error);
         },

       );



   }
}
