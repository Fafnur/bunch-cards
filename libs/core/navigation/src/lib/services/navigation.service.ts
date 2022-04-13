import { Inject, Injectable } from '@angular/core';

import { NavigationPaths, PATHS } from '../interfaces/navigation.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(@Inject(PATHS) private readonly paths: NavigationPaths) {}

  getPaths(): NavigationPaths {
    return this.paths;
  }

  getRoute(
    navigationPath: string,
    params: Record<string, string | number> = {}
  ): (string | number)[] {
    const segments = navigationPath.split('/').filter((value) => value?.length);
    const routeWithParams: (string | number)[] = ['/'];

    for (const segment of segments) {
      if (segment.charAt(0) === ':') {
        const paramName = segment.slice(1);
        if (params && params[paramName]) {
          routeWithParams.push(params[paramName]);
        } else {
          routeWithParams.push(paramName);
        }
      } else {
        routeWithParams.push(segment);
      }
    }

    return routeWithParams;
  }

  getRoutePath(
    navigationPath: string,
    params?: Record<string, string | number>
  ): string {
    const route = this.getRoute(navigationPath, params);

    return route.length > 1 ? `/${route.slice(1).join('/')}` : `${route[0]}`;
  }
}
