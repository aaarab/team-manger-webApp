import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
  standalone: true,
})
export class IncludesPipe implements PipeTransform {

  transform<T>(values: T[], key: keyof T, value: any ): boolean {
    return values.some(el => el[key] === value);
  }

}
