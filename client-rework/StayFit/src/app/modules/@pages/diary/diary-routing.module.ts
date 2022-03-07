import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormMode } from '../../@core/enums/form-mode.enum';
import { DiaryGuard } from '../../@core/guards/diary.guard';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    {
        path:':year/:month/overview',
        component:OverviewComponent,
    },
    {
      path:':date/add',
      component:AddNotesComponent,
      data:{mode:FormMode.CREATE}
    },
    {
      path:':noteId/view',
      component:NoteViewComponent,
    },
    {
      path:':noteId/edit',
      component:AddNotesComponent,
      data:{mode:FormMode.EDIT}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryRoutingModule {}