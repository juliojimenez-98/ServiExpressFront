import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  data: any;


  constructor(public nav: NavbarService,private activatedRoute: ActivatedRoute,private router:Router) {
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };
    this.activatedRoute.params.subscribe(params => {
      this.role = params.idrole;

    });
  
    if (sessionStorage.getItem('idrole')=='2') {
      this.cliente = true;
    } else if (sessionStorage.getItem('idrole')=='1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole')=='3') {
      this.empleado = true;
    }
    this.nav.hide();
    this.nav.doSomethingElseUseful();

    if ((sessionStorage.getItem('idrole') == null)) {
      Swal.fire('No estás autenticado', 'Inicia sesión para acceder a las rutas', 'warning')
      this.router.navigate(['/login']);
    }

  }

  
  ngOnInit(): void {

    //  this.loadScript('../assets/js/sb-admin-2.min.js');
    //  this.loadScript('../assets/vendor/jquery/jquery.slim.min.js');
    //  this.loadScript('../assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    // this.loadScript('../../../assets/vendor/jquery-easing/jquery.easing.min.js');
    // this.loadScript('../../../assets/vendor/chart.js/Chart.min.js');
    // this.loadScript('../../../aassets/js/demo/chart-area-demo.js');
    // this.loadScript('../../../../assets/js/demo/chart-pie-demo.js');

  }

  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.body;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }


}
