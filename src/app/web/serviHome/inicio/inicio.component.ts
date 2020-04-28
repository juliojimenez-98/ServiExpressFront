import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public name: string = "";


  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params =>{
      this.name=params['username'] ;

  });
  }

  ngOnInit(): void {
  }

}
