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
    } else if (sessionStorage.getItem('idrole') === '1') {
      this.admin = true;
    } else if (sessionStorage.getItem('idrole') === '3') {
      this.empleado = true;
    }



  }



  ngOnInit(): void {
    this.cargarScript('./assets/js/sb-admin-2.min.js');
  }
  public cargarScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


}

