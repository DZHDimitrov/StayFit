import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReadingsService } from 'src/app/modules/@core/backend/services/readings.service';
import { Readings } from 'src/app/modules/@core/enums/reading.category';
import { IAppState } from 'src/app/state/app.state';
import { loadGroupContent } from '../../store/pages.actions';
import { getCatalogue } from '../../store/pages.selector';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ReadingsService,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((x) => {
      this.store.dispatch(loadGroupContent({ group: x.mainCategory }));
    });
    this.store.select(getCatalogue).subscribe(console.log);
  }
}
