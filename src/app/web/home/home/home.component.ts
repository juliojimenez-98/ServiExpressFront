import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
  }

  getHomeImg() {
    return "url('./assets/img/background-img.jpg')";
  }

}
