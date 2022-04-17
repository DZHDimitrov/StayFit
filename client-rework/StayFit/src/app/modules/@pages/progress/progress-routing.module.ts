import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { FormMode } from '../../@core/enums/form-mode.enum';

import { AddMeasurementComponent } from './add-measurement/add-measurement.component';

import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddMeasurementComponent,
    data: {
      mode: FormMode.CREATE,
    },
  },
  {
    path: ':measurementId/edit',
    component: AddMeasurementComponent,
    data: {
      mode: FormMode.EDIT,
    },
  },
  {
    path: '',
    component: ProgressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressRoutingModule {}
