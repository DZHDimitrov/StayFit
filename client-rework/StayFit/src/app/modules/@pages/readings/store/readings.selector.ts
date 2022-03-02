import { createFeatureSelector, createSelector } from '@ngrx/store';

import { cyrillicToLatin } from 'src/app/modules/@core/utility/text-transilerator';

import { IReadingsState } from './readings.state';

export const READINGS_STATE_NAME = 'readings';

const getReadingsState =
  createFeatureSelector<IReadingsState>(READINGS_STATE_NAME);

export const getKnowledge = createSelector(getReadingsState, (state) => {
  const currentKnowledge = JSON.parse(JSON.stringify(state.knowledge));

  const readingPreviewsWithCategory =
    currentKnowledge.readingPreviewsWithCategory.map((rc) => {
      return {
        ...rc,
        path: cyrillicToLatin(rc.name.toLowerCase()),
        previews: rc.previews.map((p) => {
          return {
            ...p,
            path: cyrillicToLatin(p.name.toLowerCase()),
          };
        }),
      };
    });

  return {
    ...currentKnowledge,
    readingPreviewsWithCategory,
  };
});

export const getMainCategoryWithPreviews = createSelector(
  getReadingsState,
  (state) => {
    let currentMainCategory:any = null;
    
    if (state.mainCategoryWithPreviews){
      currentMainCategory = JSON.parse(
        JSON.stringify(state.mainCategoryWithPreviews)
      );
    }


    const previews = currentMainCategory?.previews?.map((p) => {
      return {
        ...p,
        path: cyrillicToLatin(p.name.toLowerCase()),
      };
    });

    return {
      ...currentMainCategory ?? [],
      previews,
    };
  }
);

export const getReadingById = createSelector(getReadingsState, (state) => {
  return state.currentReading;
});

export const getSubCategoryWithPreviews = createSelector(
  getReadingsState,
  (state) => {
    return state.subCategoryWithPreviews;
  }
);

export const getMainCategories = createSelector(getReadingsState, (state) => {
  return state.mainCategories;
});

export const getSubCategories = createSelector(getReadingsState, (state) => {
  return state.subCategories;
});
