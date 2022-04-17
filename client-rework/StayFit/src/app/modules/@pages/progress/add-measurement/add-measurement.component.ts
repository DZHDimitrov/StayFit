import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter, take } from 'rxjs/operators';

import { FormMode } from 'src/app/modules/@core/enums/form-mode.enum';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import {
  createMeasurement,
  editMeasurementById,
  loadMeasurementById,
} from '../store/progress.actions';

import { getMeasurement } from '../store/progress.selectors';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss'],
})
export class AddMeasurementComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  measurementForm!: FormGroup;
  
  FormMode = FormMode;
  mode!: FormMode;
  measurementId!: string;

  ngOnInit(): void {
    this.store.select(getRouterState).subscribe((route) => {
      const { measurementId } = route.state.params;
      this.measurementId = measurementId;
    });

    this.route.data.pipe(take(1)).subscribe((data) => {
      this.mode = data.mode;
      if (this.mode === FormMode.EDIT) {
        this.store.dispatch(
          loadMeasurementById({ measurementId: this.measurementId })
        );
      }
    });

    if(this.mode === FormMode.EDIT) {
      this.store
      .select(getMeasurement)
      .pipe(filter((m) => m !== null))
      .subscribe((m: any) => {
        Object.keys(m).forEach((key) => {
          const fieldName =
            key.substring(0, 1).toUpperCase() + key.substring(1);
          const existingField = this.measurementForm.get(fieldName);
          if (existingField) {
            this.measurementForm.patchValue({ [fieldName]: m[key] ?? null });
          }
        });
      });
    }

  }

  save() {
    const data = { ...this.measurementForm.value };

    this.store.dispatch(createMeasurement({ data }));
  }

  edit() {
    const data = { ...this.measurementForm.value};

    this.store.dispatch(editMeasurementById({measurementId:this.measurementId,data}));
  }

  private initForm() {
    this.measurementForm = this.fb.group({
      DateOfMeasurement: null,
      Height: null,
      Weight: null,
      Fats: null,
      Neck: null,
      Shoulders: null,
      Chest: null,
      LeftArm: null,
      RightArm: null,
      LeftForearm: null,
      RightForearm: null,
      Waist: null,
      Wrist: null,
      Hips: null,
      LeftThigh: null,
      RightThigh: null,
      LeftCalf: null,
      RightCalf: null,
      Ankle: null,
    });
  }
}
