import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '@bunch/core/api';

import { NAVIGATION_PATHS } from '../interfaces/navigation.interface';
import { PATHS_STUB } from '../interfaces/navigation.stub';
import { NavigationService } from '../services/navigation.service';
import { NavigationExternalPathPipe } from './navigation-external-path.pipe';

describe('NavigationExternalPathPipe', () => {
  let pipe: NavigationExternalPathPipe;
  let apiService: ApiService;
  let navigationService: NavigationService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PATHS_STUB],
    }).compileComponents();
  }));

  beforeEach(() => {
    // apiService = TestBed.inject(ApiService);
    navigationService = TestBed.inject(NavigationService);
    pipe = new NavigationExternalPathPipe(navigationService, apiService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return external path', () => {
    expect(pipe.transform(NAVIGATION_PATHS.dashboard)).toBe(`/${NAVIGATION_PATHS.dashboard}`);
  });
});
