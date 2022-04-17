import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { shareReplay, take } from 'rxjs/operators';

import { GlobalConstants } from 'src/app/settings/global-constants';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { IReadingCategory } from '../models/readings-category.model';

import { IReading } from '../models/readings-reading.model';

import {
  editReading,
  loadReadingForEdit,
  loadReadingMainCategories,
  loadReadingSubCategories,
  resetReadingSubCategories,
} from '../store/readings.actions';

import {
  getMainCategories,
  getReadingById,
  getSubCategories,
} from '../store/readings.selector';

@Component({
  selector: 'app-edit-reading',
  templateUrl: './edit-reading.component.html',
  styleUrls: ['./edit-reading.component.scss'],
})
export class EditReadingComponent implements OnInit {
  constructor(private store: Store<IAppState>, private fb: FormBuilder) {
    this.initForm();
  }

  mainCategories$!: Observable<IReadingCategory[]>;
  subCategories$!: Observable<IReadingCategory[]>;
  reading!: IReading | null;

  formGroup!: FormGroup;

  requiredField: string = GlobalConstants.REQUIRED_FIELD;
  fieldMinLength: Function = GlobalConstants.FIELD_MIN_LENGTH;

  ngOnInit(): void {
    this.store
      .select(getRouterState)
      .pipe(take(1))
      .subscribe((route) => {
        const params = route.state.params;
        this.store.dispatch(loadReadingForEdit({ id: params.id }));
      });

    this.store.dispatch(loadReadingMainCategories({}));
    this.mainCategories$ = this.store.select(getMainCategories);
    this.mainCategories$.subscribe(console.log);

    this.subCategories$ = this.store
      .select(getSubCategories)
      .pipe(shareReplay(1));

    setTimeout(() => {
      this.store
        .select(getReadingById)
        .pipe(take(1))
        .subscribe((reading: any) => {
          this.reading = reading;
          this.formGroup.patchValue({
            readingMainCategoryId: reading.mainCategoryId,
            readingSubCategoryId: reading.subCategoryId,
            title: reading.title,
            content: reading.content,
            image: reading.imageUrl,
          });

          this.loadSubCategories(reading.mainCategoryId);
        });
    });
  }

  loadSubCategories(id: number) {
    if (id) {
      this.store.dispatch(loadReadingSubCategories({ mainId: id }));
      this.store.dispatch(resetReadingSubCategories());
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      this.formGroup.updateValueAndValidity();
      return;
    }

    const formData = this.getFormData();

    if (this.reading?.id) {
      this.store.dispatch(editReading({ readingId: this.reading?.id, data: formData }));
    }
  }

  fileChange(files: FileList | null) {
    if (files && files[0].size > 0) {
      this.formGroup.patchValue({
        image: files[0],
      });
    }
  }

  private getFormData(): FormData {
    const formModel = this.formGroup.value;

    let formData = new FormData();

    Object.keys(formModel).forEach((key: any) => {
      let valueToAppend = this.formGroup.get(key)?.value;
      if (valueToAppend) {
        formData.append(key, valueToAppend);
      }
    });
    return formData;
  }

  private initForm() {
    this.formGroup = this.fb.group({
      readingMainCategoryId: [''],
      readingSubCategoryId: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required]],
    });
  }
}
