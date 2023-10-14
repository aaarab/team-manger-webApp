import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
  standalone: true,
})
export class IncludesPipe implements PipeTransform {

  transform(values: (string | number)[], value: any ): boolean {
    return values.includes(value);
  }

}
