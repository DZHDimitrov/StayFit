import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/state/app.state';

import { getMeasurements } from '../store/progress.selectors';

import { filter } from 'rxjs/operators';

import { deleteMeasurement, loadMeasurements } from '../store/progress.actions';

import { ChartService } from '../services/chart.service';

import { BodyPartDisplay } from '../enums/BodyPartDisplay.enum';

import { Measurement } from '../models/measurement.model';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private chartService: ChartService,
    private titleService: Title
  ) {
    this.initSelectionOptions();
    this.titleService.setTitle('Измервания и прогрес');
  }

  measurements: Measurement[] = [];
  measurementsUntilNow!: any;
  selectionOptions!: any[];
  selected: string = 'Weight';

  ngOnInit(): void {
    this.store.dispatch(loadMeasurements());

    this.store
      .select(getMeasurements)
      .pipe(filter((m) => m !== null))
      .subscribe((m) => {
        this.measurements = m ?? [];
        this.selectType(this.selected);
      });
  }

  selectType(bodyPart: string) {
    const measurements = this.chartService.filterMeasurements(
      this.measurements,
      bodyPart
    );

    if (measurements.length > 0) {
      const chartOptions = this.chartService.getChartOptions({ measurements });
      Highcharts.chart('container', chartOptions);
    } else {
      Highcharts.chart('container', {}).destroy();
    }
  }

  deleteMeasurement(measurementId) {
    if(!window.confirm("Сигурни ли сте, че искате та изтриете това измерване?")) {
      return;
    }
    this.store.dispatch(deleteMeasurement({ measurementId }));
  }

  initSelectionOptions() {
    this.selectionOptions = Object.entries(BodyPartDisplay).reduce(
      (acc: any, el) => {
        acc.push({
          name: el[1],
          value: el[0],
        });
        return acc;
      },
      []
    );
  }
}
