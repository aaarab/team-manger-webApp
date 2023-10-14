import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findByKey',
  standalone: true,
})
export class FindByKeyPipe implements PipeTransform {

  transform<T>(value: any, options: T[], key: keyof T, field: keyof T): any {
    const match = options.find(el => el[key] === value);
    return match ? match[field] : key;
  }

}
