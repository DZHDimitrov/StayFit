import { Injectable } from '@angular/core';
import {
  loadCatalogueByMainCategory,
  loadCatalogueBySubCategory,
  loadCategoriesLatestPreviews,
} from '../store/pages.actions';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  constructor() {}

  catalogueDispatcher(root: string, route: string) {
    const [mainCategory, subCategory]: any = route.split('/').filter(x=> x !== root && x !== '');
    if (mainCategory && subCategory) {
      return loadCatalogueBySubCategory({
        mainCategory: mainCategory,
        subCategory: subCategory,
      });
    } else if (mainCategory){
      return loadCatalogueByMainCategory({
        category: mainCategory,
      });
    }
    return loadCategoriesLatestPreviews();
  }
}
