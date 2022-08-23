import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mock, when } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';

import { NAVIGATION_PATHS } from '../interfaces/navigation.interface';
import { PATHS_STUB } from '../interfaces/navigation.stub';
import { NavigationService } from '../services/navigation.service';
import { NavigationPathPipe } from './navigation-path.pipe';

describe('NavigationPathPipe', () => {
  let pipe: NavigationPathPipe;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationService);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PATHS_STUB, providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    pipe = new NavigationPathPipe(TestBed.inject(NavigationService));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return path', () => {
    when(navigationServiceMock.getRoutePath(NAVIGATION_PATHS.dashboard, undefined)).thenReturn('/');

    expect(pipe.transform(NAVIGATION_PATHS.dashboard)).toEqual('/');
  });
});
