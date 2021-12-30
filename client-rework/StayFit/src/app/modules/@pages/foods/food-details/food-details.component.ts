import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';
import { IAppState } from 'src/app/state/app.state';
import { loadFoodById } from '../store/foods.actions';
import { getFoodDetails } from '../store/foods.selector';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent implements OnInit {

  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadFoodById({id:1}))
    this.store.select(getFoodDetails).subscribe(console.log)
  }
}
