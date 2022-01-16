import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from './panel/panel.component';
import { PagesModule } from '../@pages/pages.module';
import { FoodsModule } from '../@pages/foods/foods.module';
import { ReadingsModule } from '../@pages/readings/readings.module';

@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    PagesModule,
    FoodsModule,
    ReadingsModule,
    // ReactiveFormsModule,
    // EffectsModule.forFeature([AdminEffects]),
  ],
})
export class AdminModule {}
