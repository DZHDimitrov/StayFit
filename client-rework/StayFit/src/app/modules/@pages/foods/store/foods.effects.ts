import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';
import { transliterate } from 'src/app/modules/@core/utility/text-transilerator';
import {
  loadFoodsCategories,
  loadFoodsCategoriesSuccess,
  loadSearchedFood,
  loadSearchedFoodSuccess,
} from './foods.actions';

@Injectable()
export class FoodsEffects {
  constructor(private actions$: Actions, private service: FoodsService) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodsCategories),
      switchMap((action) => {
        return this.service.listCategories().pipe(
          map((res) => {
            return loadFoodsCategoriesSuccess({
              foodCategories: res.data.map((category) => {
                return {
                  ...category,
                  searchName: category.name
                    .split(' ')
                    .map((word) => {
                      return transliterate(word.toLowerCase());
                    })
                    .join('-'),
                };
              }),
            });
          })
        );
      })
    );
  });

  loadSearchedFood$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSearchedFood),
      switchMap((action) => {
        return this.service.listSearchedFood(action.searchedFood).pipe(
          map((res) => {
            return loadSearchedFoodSuccess({
              foods: res.data?.map((food) => {
                return {
                  id: food.id,
                  foodNameId: food.foodNameId,
                  searchName: [
                    food.category.split(' ')[0].toLowerCase(),
                    '-',
                    food.name.toLocaleLowerCase(),
                    '-',
                    food.description.toLowerCase(),
                  ].join(' '),
                };
              }),
            });
          })
        );
      })
    );
  });
}
