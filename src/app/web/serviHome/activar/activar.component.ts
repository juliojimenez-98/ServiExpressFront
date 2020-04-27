import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.css']
})
export class ActivarComponent implements OnInit {
  public name: string = "";

  constructor(private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe( params =>{
      this.name=params['username'] ;

      // console.log(this.heroe);
  });
  }

  ngOnInit(): void {
  }

}
