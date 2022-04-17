import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs';

import {
  catchError,
  debounceTime,
  exhaustMap,
  filter,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { DiaryService } from 'src/app/modules/@core/backend/services/diary.service';

import { USER_NAV_ITEMS_DIARY } from 'src/app/modules/@theme/misc/content/navigation.content';

import { setNavMenu } from 'src/app/modules/@theme/state/theme.actions';

import { setLoadingSpinner } from 'src/app/modules/shared/state/shared.actions';

import { IAppState } from 'src/app/state/app.state';

import {
  createDiary,
  createDiarySuccess,
  createNote,
  createNoteFailure,
  createNoteSuccess,
  editNote,
  editNoteSuccess,
  loadNoteById,
  loadNoteByIdSuccess,
  loadNotes,
  loadNotesSuccess,
} from './diary.actions';

@Injectable()
export class DiaryEffects {
  constructor(
    private actions$: Actions,
    private diaryService: DiaryService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<IAppState>
  ) {}

  createDiary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createDiary),
      tap(action => {
        this.store.dispatch(setLoadingSpinner({status:true}))
      }),
      debounceTime(1500),
      switchMap((action) => {
        return this.diaryService.createDiary().pipe(
          map((res) => {
            return createDiarySuccess({ diaryId: res.data });
          })
        );
      })
    );
  });

  createDiarySuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createDiarySuccess),
      tap(action => {
        this.toastr.success('Дневникът Ви беше създаден успешно.')
        this.store.dispatch(setNavMenu({navItems:USER_NAV_ITEMS_DIARY}));
        this.store.dispatch(setLoadingSpinner({status:false}))
      })
    )
  },{dispatch:false})

  loadNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNotes),
      switchMap(({ payload }) => {
        return this.diaryService.loadNotes(payload.year, payload.month).pipe(
          map((res) => {
            return loadNotesSuccess({ notes: res.data });
          })
        );
      })
    );
  });

  createNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNote),
      debounceTime(1500),
      switchMap(({ payload }) => {
        return this.diaryService.createNote(payload.date, payload.data).pipe(
          finalize(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
          }),
          map((res) => {
            if (!res.isOk) {
              throw new Error(res.Errors[0].Error);
            }
            const [month, day, year] = payload.date.split('-');
            return createNoteSuccess({ noteId: res.data, month, year });
          }),
          catchError((error) => {
            return of(createNoteFailure());
          })
        );
      })
    );
  });

  createNoteRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createNoteSuccess),
        tap(({ payload }) => {
          this.router.navigate([
            'pages',
            'diary',
            payload.year,
            payload.month,
            'overview',
          ]);
        })
      );
    },
    { dispatch: false }
  );

  loadNoteById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNoteById),
      switchMap(({ payload }) => {
        return this.diaryService
          .loadNoteById(payload.noteId, payload.take)
          .pipe(
            map((res) => {
              return loadNoteByIdSuccess({
                note: res.data,
                withRedirection: payload.withRedirection,
              });
            })
          );
      })
    );
  });

  loadNoteByIdRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadNoteByIdSuccess),
        filter(({ payload }) => payload.withRedirection == true),
        tap(({ payload }) => {
          if (!payload.note.isModified) {
            const date = payload.note.createdOn!.split('.').join('-');
            this.router.navigate(['pages', 'diary', date, 'add']);
          } else {
            this.router.navigate(['pages', 'diary', payload.note.id, 'view']);
          }
        })
      );
    },
    { dispatch: false }
  );

  editNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editNote),
      debounceTime(1500),
      exhaustMap(({ payload }) => {
        return this.diaryService.editNote(payload.noteId, payload.data).pipe(
          finalize(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
          }),
          map((res) => {
            return editNoteSuccess({ createdOn: res.data });
          })
        );
      })
    );
  });

  editNoteRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editNoteSuccess),
        tap(({ payload }) => {
          const [days, months, years] = payload.createdOn!.split('.');
          this.router.navigate([
            '/',
            'pages',
            'diary',
            years,
            months,
            'overview',
          ]);
          this.toastr.success('Успешно обновихте записките си')
        })
      );
    },
    { dispatch: false }
  );
}
