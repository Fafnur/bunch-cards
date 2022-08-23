import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mock, when } from 'ts-mockito';

import { ApiService } from '@bunch/core/api';
import { providerOf } from '@bunch/core/testing';

import { NAVIGATION_PATHS } from '../interfaces/navigation.interface';
import { PATHS_STUB } from '../interfaces/navigation.stub';
import { NavigationService } from '../services/navigation.service';
import { NavigationExternalPathPipe } from './navigation-external-path.pipe';

describe('NavigationExternalPathPipe', () => {
  let pipe: NavigationExternalPathPipe;
  let apiServiceMock: ApiService;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    apiServiceMock = mock(ApiService);
    navigationServiceMock = mock(NavigationService);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [NavigationExternalPathPipe],
      providers: [PATHS_STUB, providerOf(NavigationService, navigationServiceMock), providerOf(ApiService, apiServiceMock)],
    }).compileComponents();

    pipe = new NavigationExternalPathPipe(TestBed.inject(NavigationService), TestBed.inject(ApiService));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return external path', () => {
    when(navigationServiceMock.getRoutePath(NAVIGATION_PATHS.dashboard, undefined)).thenReturn(NAVIGATION_PATHS.dashboard);
    when(apiServiceMock.makeUrl(NAVIGATION_PATHS.dashboard)).thenReturn(`/${NAVIGATION_PATHS.dashboard}`);

    expect(pipe.transform(NAVIGATION_PATHS.dashboard)).toBe(`/${NAVIGATION_PATHS.dashboard}`);
  });
});
