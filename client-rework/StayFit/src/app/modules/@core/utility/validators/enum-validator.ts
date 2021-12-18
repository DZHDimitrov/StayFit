import { ReadingCategory, ReadingSubCategory } from '../../enums/reading.category';

export const validateEnum = (text: any,): boolean => {
    return Object.values(ReadingCategory).includes(text.toLowerCase()) ? true : false;
};