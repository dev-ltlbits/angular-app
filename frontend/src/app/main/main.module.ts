import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule
  ],
  declarations: []
})
export class MainModule { }
