import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutrientFormatter } from './pipes/nutrients';



@NgModule({
  declarations: [NutrientFormatter],
  imports: [
    CommonModule
  ],
  exports: [NutrientFormatter],
})
export class CoreModule { }
