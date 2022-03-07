import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayComponent } from './today/today.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../../material/material.module';
import { DashboardEffects } from './store/dashboard.effects';
import { EffectsModule } from '@ngrx/effects';
import { DiaryEffects } from '../diary/store/diary.effects';

@NgModule({
  declarations: [
    TodayComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    EffectsModule.forFeature([DashboardEffects,DiaryEffects])
  ]
})
export class DashboardModule { }
