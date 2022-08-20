import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NAVIGATION_PATHS } from '../interfaces/navigation.interface';
import { PATHS_STUB } from '../interfaces/navigation.stub';
import { NavigationService } from './navigation.service';
import { NavigationServiceStub } from './navigation.service.stub';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NavigationServiceStub, PATHS_STUB],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(NavigationServiceStub);
  });

  it('should return service path', () => {
    expect(service.getRoute(NAVIGATION_PATHS.serverError)).toEqual(['/', NAVIGATION_PATHS.serverError]);
  });
});
