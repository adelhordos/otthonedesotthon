import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    let formattedValue = '';
    const numberString = value.toString();
    const numLength = numberString.length;

    for (let i = 0; i < numLength; i++) {
      formattedValue += numberString[i];

      if ((numLength - i - 1) % 3 === 0 && i !== numLength - 1) {
        formattedValue += ' ';
      }
    }

    return formattedValue;
  }

}
