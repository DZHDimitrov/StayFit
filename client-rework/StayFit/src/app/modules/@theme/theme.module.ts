import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation/navigation.component';

import { FooterComponent } from './footer/footer.component';

import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [NavigationComponent,FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature(),
    MaterialModule,
  ],
  exports: [NavigationComponent,FooterComponent]
})
export class ThemeModule { }
