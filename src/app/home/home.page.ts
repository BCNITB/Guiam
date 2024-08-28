import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonModal, IonIcon, IonCard } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { ComponentsModule } from "../components/components.module";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCard, IonIcon, IonModal, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ComponentsModule],
})
export class HomePage implements OnInit {
  
  containerHeight!: number;
  containerWidth!: number;

  oncelioHeight: number = 38;
  oncelioWidth: number = 43;
  oncelioPosition: number = 0;

  movements: string[] = [];

  rotation: number = 0;
  steptime: number;
  
  playing: boolean;
  victory: boolean;
  gameOver: boolean;
  isModalOpen: boolean;

  constructor(private platform: Platform) { 
    this.containerHeight = this.platform.height();
    this.containerWidth = this.platform.width() < 576 ? this.platform.width() : 576;

    this.steptime = 500;
    this.playing = true;
    this.victory = false;
    this.gameOver = false;
    this.isModalOpen = true;
  }

  ngOnInit(): void{
    this.SetContainerSize();
  }

  SetContainerSize(){
    this.containerHeight = this.platform.height();
    this.containerWidth = this.platform.width() < 576 ? this.platform.width() : 576;
  }

  MoveUp(){
    this.movements.push('up');
  }

  MoveRight(){
    this.movements.push('right');
  }

  MoveDown(){
    this.movements.push('down');
  }

  MoveLeft(){
    this.movements.push('left');
  }

  async Move(){
    let mouse: any = document.getElementById('mouse');
    let mouseCoords = mouse.getBoundingClientRect();
    let coord = [Math.round(mouseCoords.top), Math.round(mouseCoords.left)];
    
    console.log('Top Coords: ', mouseCoords.top);
    console.log('ROTACIÓN IZQUIERDA: ', coord);

    for(let i = 0; i < this.movements.length; i++){
       switch(this.movements[i]){
        case 'up':
          if(this.rotation == -1){
            coord[1] = coord[1] - 50;
            mouse.style.left = coord[1] + 'px';
          }
          else if(this.rotation == -2){
            coord[0] = coord[0] + 50;
            mouse.style.top =  coord[0] + 'px';  
          }
          else if(this.rotation == 1){
            coord[1] = coord[1] + 50;
            mouse.style.left = coord[1] + 'px';
          }
          else {
            coord[0] = coord[0] - 50;
            mouse.style.top =  coord[0] + 'px';  
          }
          break;
        case 'down':
          if(this.rotation == 1){
            coord[1] = coord[1] - 50;
            mouse.style.left = coord[1] + 'px';
          }
          else if(this.rotation == 2){
            coord[0] = coord[0] + 50;
            mouse.style.top =  coord[0] + 'px';  
          }
          else if(this.rotation == -1){
            coord[1] = coord[1] + 50;
            mouse.style.left = coord[1] + 'px';
          }
          else {
            coord[0] = coord[0] + 50;
            mouse.style.top =  coord[0] + 'px';  
          }
          break;
        case 'left':
          this.rotation = this.rotation-1;
          
          if(this.rotation == -3)
            this.rotation = 1;
          
          mouse.style.transform = 'rotate(' + (90*this.rotation) + 'deg)';
          break;
        case 'right':
          this.rotation = this.rotation+1;

          if(this.rotation == 3)
            this.rotation = -1;

          mouse.style.transform = 'rotate(' + (90*this.rotation) + 'deg)';
            break;
       }

       await this.sleep(this.steptime);
    }

    this.EndGame(coord);
    console.log('Cpprd: ', coord)
  }

  sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  EndGame(coord: any){
    this.playing = false;

    this.ChecKResult(coord);
  }

  ChecKResult(coord: any){
    let target: any = document.getElementById('target');
    let targetCoords = target.getBoundingClientRect();
    let coordsTarget = [Math.round(targetCoords.top), Math.round(targetCoords.left)];

    console.log('Target; ', coordsTarget);

    if ((coord[0] == coordsTarget[0]) && (coord[1] == coordsTarget[1]))
      this.victory = true;
    else
      this.gameOver = true;
  }

  /*UseKeyboard(){
    document.addEventListener("keyup", function (event) {
      if(event.code == 'ArrowUp'){
        document.getElementById('up-arrow')?.click;
        console.log('FLECHA ARRIBA');    
      }
      if(event.code == 'ArrowLeft'){
        document.getElementById('left-arrow')?.click;
      }
      if(event.code == 'ArrowDown'){
        document.getElementById('down-arrow')?.click;
      }
      if(event.code == 'ArrowRight'){
        document.getElementById('right-arrow')?.click;
      }
      if(event.code == 'Enter' || event.code == 'Space'){
        document.getElementById('go')?.click;
      }
    });
  }*/

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}