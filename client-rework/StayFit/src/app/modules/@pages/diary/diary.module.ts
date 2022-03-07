import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { OverviewComponent } from './overview/overview.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { DiaryEffects } from './store/diary.effects';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteViewComponent } from './note-view/note-view.component';


@NgModule({
  declarations: [OverviewComponent, AddNotesComponent, NoteViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DiaryRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([DiaryEffects])
  ]
})
export class DiaryModule { }
