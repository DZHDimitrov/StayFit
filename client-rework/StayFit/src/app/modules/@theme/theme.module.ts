import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';

const NB_MODULES = [
  NbIconModule,
  NbEvaIconsModule,
  NbContextMenuModule,
  NbButtonModule,
  NbMenuModule,
  NbCardModule,
]

@NgModule({
  declarations: [NavigationComponent,FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ...NB_MODULES
  ],
  exports: [NavigationComponent,FooterComponent]
})
export class ThemeModule { }
