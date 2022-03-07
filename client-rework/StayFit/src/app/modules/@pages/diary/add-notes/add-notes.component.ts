import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { debounceTime, map, switchMap, take, tap } from 'rxjs/operators';

import { FormMode } from 'src/app/modules/@core/enums/form-mode.enum';

import { INote } from 'src/app/modules/@core/interfaces/diary/diary.interface';

import { INoteData } from 'src/app/modules/@core/interfaces/diary/post-requests/diary-notes.post';
import { setLoadingSpinner } from 'src/app/modules/shared/state/shared.actions';

import { IAppState } from 'src/app/state/app.state';

import { getCurrentRoute } from 'src/app/state/router/router.selector';

import { createNote, editNote, loadNoteById } from '../store/diary.actions';

import { getNoteById } from '../store/diary.selectors';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.setMoods();
    this.initForm();
  }

  noteForm!: FormGroup;
  moods: Map<string, boolean> = new Map();
  currentDate!: string;
  mode!: FormMode;
  noteId!:number;

  FormMode = FormMode;

  get isGoodMood() {
    return this.moods.get('Good');
  }

  get isNormalMood() {
    return this.moods.get('Normal');
  }

  get isBadMood() {
    return this.moods.get('Bad');
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        switchMap((data) => {
          return this.store.select(getCurrentRoute).pipe(
            take(1),
            tap((route) => {
              this.mode = data.mode;
              if (data.mode == FormMode.CREATE) {
                const { date } = route.params;
                this.currentDate = date;
              } else if (data.mode == FormMode.EDIT) {
                const { noteId } = route.params;
                this.noteId = noteId;
                this.store.dispatch(
                  loadNoteById({ noteId, withRedirection: false })
                );
              }
            }),
            debounceTime(500),
            switchMap((route) => {
              return this.store.select(getNoteById);
            }),
            tap((note) => {
              if (data.mode == FormMode.EDIT) {
                this.fillEditValues(note);
              }
            })
          );
        })
      )
      .subscribe();
  }

  fillEditValues(note: INote | null) {
    this.moods.set(note?.mood as string,true);
    this.noteForm.patchValue({
      activity: note?.activity,
      nutrition: note?.nutrition,
      other: note?.other,
      sleep: note?.sleepHours,
      mood: note?.mood,
    });
  }

  selectMood(mood: 'Good' | 'Normal' | 'Bad') {
    this.setMoods();
    this.moods.set(mood, true);
    this.noteForm.patchValue({
      mood,
    });
  }

  setMoods() {
    this.moods.set('Good', false);
    this.moods.set('Normal', false);
    this.moods.set('Bad', false);
  }

  save() {
    const { activity, nutrition, other, sleep, mood } = this.noteForm.value;

    const data: INoteData = {
      activity,
      mood,
      nutrition,
      other,
      sleepHours: sleep,
    };

    this.callAction(data);
  }

  private callAction(data:INoteData) {
    this.store.dispatch(setLoadingSpinner({status:true}));
    
    switch (this.mode) {
      case FormMode.CREATE:
        this.store.dispatch(createNote({date:this.currentDate,data}))
        break;
      case FormMode.EDIT:
        this.store.dispatch(editNote({noteId:this.noteId,data}));
        break;
    }
  }

  private initForm() {
    this.noteForm = this.fb.group({
      activity: [''],
      nutrition: [''],
      other: [''],
      sleep: [null, Validators.pattern(/^[0-9]+(:?.?[0-9]*)$/)],
      mood: ['', Validators.required],
    });
  }
}
