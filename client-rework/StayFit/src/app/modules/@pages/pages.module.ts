import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { ComponentsModule } from '../@components/components.module';

import { MaterialModule } from '../material/material.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // NewFoodComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[
    // NewFoodComponent,
  ]
})
export class PagesModule {}
