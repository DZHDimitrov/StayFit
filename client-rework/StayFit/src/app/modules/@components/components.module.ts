import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule, NbLayoutModule } from '@nebular/theme';

const NbModules = []

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
  ],
  exports:[],
  providers:[]
})
export class ComponentsModule { }
