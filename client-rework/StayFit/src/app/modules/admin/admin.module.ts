import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewReadingComponent } from './new-reading/new-reading.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/admin.effects';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewReadingComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AdminEffects]),
  ],
})
export class AdminModule {}
