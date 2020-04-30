import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public name = '';
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.name = params.name;

    });
  }

  ngOnInit(): void {
  }

}
