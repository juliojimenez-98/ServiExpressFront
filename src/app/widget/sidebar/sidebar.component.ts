import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mostrar = false;
  public role = '';
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.role = params.idrole;

    });

    if (this.role === '2') {
      this.mostrar = true;
    } else {

    }
  }

  ngOnInit(): void {
  }

}

