import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { IFoodCategoryData } from '../interfaces/food.interface';
import {
  loadFoodsCategories,
} from '../store/foods.actions';
import { getFoodsCategories } from '../store/foods.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  constructor(
    private store: Store<IAppState>,
  ) {}

  foodCategories$!: Observable<IFoodCategoryData[]>;

  ngOnInit(): void {
    this.store.dispatch(loadFoodsCategories());
    this.foodCategories$ = this.store.select(getFoodsCategories);
  }
}
