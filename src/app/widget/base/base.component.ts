import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(private nav:NavbarService) {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }

  ngOnInit(): void {
  }

}
