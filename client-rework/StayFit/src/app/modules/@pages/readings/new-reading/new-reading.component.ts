import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IReadingCategory } from 'src/app/modules/@core/interfaces/responses/readings/readings.interface';
import { GlobalConstants } from 'src/app/settings/global-constants';
import { IAppState } from 'src/app/state/app.state';
import { addReading, loadReadingCategories, /*loadReadingMainCategories, loadReadingSubCategories,*/ resetReadingSubCategories } from '../store/readings.actions';
import { getMainCategories, getSubCategories } from '../store/readings.selector';


@Component({
  selector: 'app-new-reading',
  templateUrl: './new-reading.component.html',
  styleUrls: ['./new-reading.component.scss'],
})
export class NewReadingComponent implements OnInit {
  constructor(private store: Store<IAppState>, private fb: FormBuilder) {}
  mainCategories$!: Observable<IReadingCategory[]>;
  subCategories$!: Observable<IReadingCategory[]>;
  formGroup!: FormGroup;

  requiredField:string = GlobalConstants.REQUIRED_FIELD;
  fieldMinLength: Function = GlobalConstants.FIELD_MIN_LENGTH;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      readingMainCategoryId: [''],
      readingSubCategoryId: [''],
      title: ['', [Validators.required,Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      image: ['',[Validators.required]],
      // bodyPart: [''],
    });
    this.store.dispatch(loadReadingCategories({}));
    this.mainCategories$ = this.store.select(getMainCategories);
  }

  loadSubCategories(value: { id: number; hasChildren: boolean }) {
    if (value.hasChildren) {
      this.store.dispatch(
        loadReadingCategories({ mainId:value.id })
      );
      this.subCategories$ = this.store.select(getSubCategories);
    }
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
}
