import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { shareReplay } from 'rxjs/operators';

import { GlobalConstants } from 'src/app/settings/global-constants';

import { IAppState } from 'src/app/state/app.state';

import { IReadingCategory } from '../models/readings-category.model';

import { addReading, loadReadingMainCategories, loadReadingSubCategories, resetReadingSubCategories } from '../store/readings.actions';

import { getMainCategories, getSubCategories } from '../store/readings.selector';

@Component({
  selector: 'app-new-reading',
  templateUrl: './new-reading.component.html',
  styleUrls: ['./new-reading.component.scss'],
})
export class NewReadingComponent implements OnInit,OnDestroy {
  constructor(private store: Store<IAppState>, private fb: FormBuilder) {
    this.initForm();
  }
  ngOnDestroy(): void {
    this.store.dispatch(resetReadingSubCategories());
  }

  mainCategories$!: Observable<IReadingCategory[]>;
  subCategories$!: Observable<IReadingCategory[]>;

  formGroup!: FormGroup;

  requiredField:string = GlobalConstants.REQUIRED_FIELD;
  fieldMinLength: Function = GlobalConstants.FIELD_MIN_LENGTH;

  ngOnInit(): void {
    this.store.dispatch(loadReadingMainCategories({}));

    this.mainCategories$ = this.store.select(getMainCategories);
    this.subCategories$ = this.store.select(getSubCategories).pipe(shareReplay(1));
  }

  loadSubCategories(value: { id: number; }) {
    this.store.dispatch(loadReadingSubCategories({mainId:value.id}))
    this.store.dispatch(resetReadingSubCategories());
  }

  submit() {
    if(!this.formGroup.valid) {
      this.formGroup.updateValueAndValidity();
      return;
    }
    const formData = this.getFormData();
    this.store.dispatch(addReading({ data: formData }));
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
    
    Object.keys(formModel).forEach((key:any) => {
      let valueToAppend = this.formGroup.get(key)?.value;
      if(key === 'readingMainCategoryId'){
        valueToAppend = valueToAppend.id;
      }
      formData.append(key,valueToAppend);
    })
    return formData;
  }

  private initForm() {
    this.formGroup = this.fb.group({
      readingMainCategoryId: [''],
      readingSubCategoryId: [''],
      title: ['', [Validators.required,Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      image: ['',[Validators.required]],
    });
  }
}
