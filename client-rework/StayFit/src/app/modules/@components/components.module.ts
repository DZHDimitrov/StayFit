import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerNavbarComponent } from './inner-navbar/inner-navbar.component';
import { ReadingBlockComponent } from './reading-preview/reading-preview.component';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FoodsIntroComponent } from './foods-intro/foods-intro.component';

@NgModule({
  declarations: [InnerNavbarComponent, ReadingBlockComponent, SearchBarComponent,SearchBarComponent, FoodsIntroComponent,],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    EffectsModule.forFeature(),
  ],
  exports: [InnerNavbarComponent, ReadingBlockComponent,SearchBarComponent,FoodsIntroComponent],
  providers: [],
})
export class ComponentsModule {}
