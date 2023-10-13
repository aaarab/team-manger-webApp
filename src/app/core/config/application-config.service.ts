import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {

  constructor() { }

  private endpointPrefix = '';

  setEndpointPrefix(endpointPrefix: string): void {
    this.endpointPrefix = endpointPrefix;
  }

  getEndpointFor(api: string, microservice?: string): string {
    if (microservice) {
      return `${this.endpointPrefix}/${microservice}/${api}`;
    }
    return `${this.endpointPrefix}/${api}`;
  }
}
