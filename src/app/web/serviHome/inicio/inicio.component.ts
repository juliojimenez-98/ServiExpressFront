import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute } from '@angular/router';
// declare var drawGauge: any;
// import '../../../../assets/js/sb-admin-2.min.js';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  cliente = false;
  admin = false;
  empleado = false;
  public role = '';



  constructor(public nav: NavbarService,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.role = params.idrole;

    });

    if (this.role === '2') {
      this.cliente = true;
    } else if (this.role === '1') {
      this.admin = true;
    } else if (this.role === '3') {
      this.empleado = true;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();

  }

  ngOnInit(): void {

    this.loadScript('../assets/js/sb-admin-2.min.js');
    this.loadScript('../assets/vendor/jquery/jquery.min.js');
    // this.loadScript('../assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    this.loadScript('../assets/vendor/jquery-easing/jquery.easing.min.js');
    this.loadScript('../assets/vendor/chart.js/Chart.min.js');
    this.loadScript('../aassets/js/demo/chart-area-demo.js');
    this.loadScript('../assets/js/demo/chart-pie-demo.js');

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
