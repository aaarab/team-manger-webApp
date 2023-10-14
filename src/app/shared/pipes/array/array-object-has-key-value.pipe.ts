import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayObjectHasKeyValue',
  standalone: true,
})
export class ArrayObjectHasKeyValuePipe implements PipeTransform {

  transform<T>(values: T[], key: keyof T, value: any ): boolean {
    return values.some(el => el[key] === value);
  }

}
