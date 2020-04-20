import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './web/login/login.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ServiExpressFront';
  faCoffee = faCoffee;

  constructor(private router:Router){}
  Login(){
    this.router.navigate(["login"]);
  }
  Register(){
    this.router.navigate(["register"]);
  }
}

