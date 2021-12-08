import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { InnerNavbarComponent } from './inner-navbar/inner-navbar.component';
import { ReadingBlockComponent } from './reading-block/reading-block.component';
import { EffectsModule } from '@ngrx/effects';

const NbModules = [];

@NgModule({
  declarations: [InnerNavbarComponent, ReadingBlockComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    EffectsModule.forFeature(),
  ],
  exports: [InnerNavbarComponent, ReadingBlockComponent],
  providers: [],
})
export class ComponentsModule {}
