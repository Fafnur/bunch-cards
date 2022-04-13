import { Pipe, PipeTransform } from '@angular/core';

// import { ApiService } from '@banshop/core/api/service';
import { NavigationService } from '../services/navigation.service';

@Pipe({
  name: 'externalPath',
})
export class NavigationExternalPathPipe implements PipeTransform {
  // , private readonly apiService: ApiService
  constructor(private readonly navigationService: NavigationService) {}

  transform(path: string, params?: Record<string, string | number>): string {
    const url = this.navigationService.getRoutePath(path, params);
    return url; //this.apiService.makeUrl(url);
  }
}
