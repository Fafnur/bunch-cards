import { Pipe, PipeTransform } from '@angular/core';

import { NavigationService } from '../services/navigation.service';

@Pipe({
  name: 'path',
})
export class NavigationPathPipe implements PipeTransform {
  constructor(private readonly navigationService: NavigationService) {}

  transform(path: string, params?: Record<string, string | number>): string {
    return this.navigationService.getRoutePath(path, params);
  }
}
