import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbMenuModule } from '@nebular/theme';
import { LayoutModule } from 'src/app/layout/layout.module';

const NB_MODULES = [
  NbButtonModule,
  NbIconModule,
  NbMenuModule,
  NbCardModule,
]

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    LayoutModule,
    ...NB_MODULES,
  ],
})
export class HomeModule { }
