import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../@core/guards/admin.guard';
import { AuthGuard } from '../@core/guards/auth.guard';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  {
    path:'',
    component:PanelComponent,
    // canActivate:[AuthGuard,AdminGuard]
  },
  {
    path:"**",
    component:PanelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
