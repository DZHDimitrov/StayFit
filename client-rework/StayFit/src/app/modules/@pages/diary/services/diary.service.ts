import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  constructor() {}

  decrementDate(year: number,month: number): { previousMonth: number; previousYear: number } {
    month--;

    if (month == 0) {
      month = 12;
      year--;
    }

    return {
      previousMonth: month,
      previousYear: year,
    };
  }

  incrementDate(year: number,month: number): { nextMonth: number; nextYear: number } {
    month++;

    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      nextMonth: month,
      nextYear: year,
    };
  }

  getMonthAsString(month: number): string {
    if (month < 1 || month > 12) throw new Error('Input number must be in range of 1 and 12');

    const monthsObject = {
      1: 'Януари',
      2: 'Февруари',
      3: 'Март',
      4: 'Април',
      5: 'Май',
      6: 'Юни',
      7: 'Юли',
      8: 'Август',
      9: 'Септември',
      10: 'Октомври',
      11: 'Ноември',
      12: 'Декември',
    };

    return monthsObject[month];
  }
}
