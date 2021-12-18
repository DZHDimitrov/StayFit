import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import {
  addReading,
  loadReadingMainCategories,
  loadReadingSubCategories,
} from '../store/admin.actions';
import { getMainCategories, getSubCategories } from '../store/admin.selector';

@Component({
  selector: 'app-new-reading',
  templateUrl: './new-reading.component.html',
  styleUrls: ['./new-reading.component.scss'],
})
export class NewReadingComponent implements OnInit {
  constructor(private store: Store<IAppState>, private fb: FormBuilder) {}
  mainCategories$!: Observable<any[]>;
  subCategories$!: Observable<any[]>;
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      readingMainCategoryId: [''],
      readingSubCategoryId: [''],
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.store.dispatch(loadReadingMainCategories());
    this.mainCategories$ = this.store.select(getMainCategories);
  }

  loadSubCategories(value: { id: number; hasChildren: boolean }) {
    if (value.hasChildren) {
      this.store.dispatch(
        loadReadingSubCategories({ mainCategoryId: value.id })
      );
      this.subCategories$ = this.store.select(getSubCategories);
    }
  }
  submit() {
    const data = {
      ...this.formGroup.value,
      readingMainCategoryId: this.formGroup.get('readingMainCategoryId')?.value
        .id,
    };
    this.store.dispatch(addReading({data}));
  }
}
