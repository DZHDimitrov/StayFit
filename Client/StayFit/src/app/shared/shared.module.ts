import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../layout/navigation/navigation.component';
import { NbButtonModule, NbContextMenuModule, NbLayoutModule, NbMenuService, NbSelectModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NbLayoutModule,
    NbSelectModule,
    NbContextMenuModule,
    NbButtonModule,
  ],
  exports: [
  ],
  providers: [
    NbMenuService,
  ]
})
export class SharedModule { }
