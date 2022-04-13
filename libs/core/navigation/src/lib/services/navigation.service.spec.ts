import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NAVIGATION_PATHS } from '../interfaces/navigation.interface';
import { PATHS_STUB } from '../interfaces/navigation.stub';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NavigationService, PATHS_STUB],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(NavigationService);
  });

  it('should return service path', () => {
    expect(service.getRoute(NAVIGATION_PATHS.support)).toEqual([
      '/',
      NAVIGATION_PATHS.support,
    ]);
  });
});
