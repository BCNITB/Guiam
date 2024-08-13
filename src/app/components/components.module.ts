import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OncelioComponent } from './oncelio/oncelio.component';

import { TargetComponent } from './target/target.component';

import { Map00Component } from './maps/map00/map00.component';

@NgModule({
  declarations: [
    OncelioComponent,
    TargetComponent,
    Map00Component
  ],
  exports:[
    OncelioComponent,
    TargetComponent,
    Map00Component
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
