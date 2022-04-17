export interface IKnowledge {
  title: string;
  categoryNames: string[];
  readingPreviewsWithCategory: IReadingPreviewsWithCategory[];
}

export interface IReadingPreviewsWithCategory {
  categoryId: number;
  name: string;
  previews: IReadingPreview[];
}

export interface IReadingPreview {
  id: number;
  name: string;
  imageUrl: string;
  path?: string;
}

export interface IMainCategoryWithPreviews {
  title: string;
  categoryNames: string[];
  previews: IReadingPreview[];
  hasSubGroups: boolean;
  path?: string;
}

export interface ISubCategoryWithPreviews {
  title: string;
  categoryName: string[];
  previews: IReadingPreview[];
  path?: string;
}
