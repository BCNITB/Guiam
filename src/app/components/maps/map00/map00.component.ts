import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map00',
  templateUrl: './map00.component.html',
  styleUrls: ['./map00.component.scss'],
})
export class Map00Component  implements OnInit {

  canvas: any;

  constructor() {
    this.canvas = document.getElementById('canvas'); 
   }

  ngOnInit() {}

}
