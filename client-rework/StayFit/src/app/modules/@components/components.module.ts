import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerNavbarComponent } from './inner-navbar/inner-navbar.component';
import { ReadingBlockComponent } from './reading-preview/reading-preview.component';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InnerNavbarComponent, ReadingBlockComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    EffectsModule.forFeature(),
  ],
  exports: [InnerNavbarComponent, ReadingBlockComponent],
  providers: [],
})
export class ComponentsModule {}
