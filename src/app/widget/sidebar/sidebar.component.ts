import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cliente = false;
  admin = false;
  empleado = false;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
    });

    if (sessionStorage.getItem('idrole') === '2') {
      this.cliente = true;
      console.log(this.cliente)
    } else if (sessionStorage.getItem('idrole') === '1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole') === '3') {
      this.empleado = true;
    }

  }

  ngOnInit(): void {
     this.loadScript('../assets/js/sb-admin-2.min.js');
    //this.loadScript('../assets/vendor/jquery/jquery.slim.min.js');
    //this.loadScript('../assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    //this.loadScript('../../../assets/vendor/jquery-easing/jquery.easing.min.js');
    //this.loadScript('../../../assets/vendor/chart.js/Chart.min.js');
    //this.loadScript('../../../aassets/js/demo/chart-area-demo.js');
    //this.loadScript('../../../../assets/js/demo/chart-pie-demo.js');
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

