import { Pipe, PipeTransform } from '@angular/core';

import { ApiService } from '@bunch/core/api';

import { NavigationService } from '../services/navigation.service';

@Pipe({
  name: 'externalPath',
})
export class NavigationExternalPathPipe implements PipeTransform {
  constructor(private readonly navigationService: NavigationService, private readonly apiService: ApiService) {}

  transform(path: string, params?: Record<string, string | number>): string {
    return this.apiService.makeUrl(this.navigationService.getRoutePath(path, params));
  }
}
