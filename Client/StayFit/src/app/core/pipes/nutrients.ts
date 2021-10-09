import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: 'nutrientFormatter'})
export class NutrientFormatter implements PipeTransform {
    transform(value: any, ...args: any[]) {
        let currentValue = value;
        if ([...value].includes('(')) {
            currentValue = [...value].slice(0,[...value].indexOf('(')).join('');
        }
        return currentValue;
    }
}