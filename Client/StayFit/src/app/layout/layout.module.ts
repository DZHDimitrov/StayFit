import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule, NbLayoutModule, NbMenuModule } from '@nebular/theme';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

const NB_MODULES = [
  NbLayoutModule,
  NbContextMenuModule,
  NbButtonModule,
  NbIconModule,
  NbMenuModule,
  NbCardModule
]

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...NB_MODULES
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
