import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';

import { MaterialModule } from '../../material/material.module';

import { ProgressComponent } from './progress/progress.component';

import { AddMeasurementComponent } from './add-measurement/add-measurement.component';

import { ReactiveFormsModule } from '@angular/forms';

import { ProgressEffects } from './store/progress.effects';

import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [ProgressComponent, AddMeasurementComponent],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ProgressEffects])
  ]
})
export class ProgressModule { }
