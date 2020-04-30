import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public name: string = "";


  constructor(private activatedRoute: ActivatedRoute,public nav: NavbarService) {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
    this.activatedRoute.params.subscribe( params =>{
      this.name=params['username'] ;

  });
  }

  ngOnInit(): void {
  }

}
