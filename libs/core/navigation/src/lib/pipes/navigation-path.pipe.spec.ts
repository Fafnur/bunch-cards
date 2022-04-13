import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NAVIGATION_PATHS } from '../interfaces/navigation.interface';
import { PATHS_STUB } from '../interfaces/navigation.stub';
import { NavigationService } from '../services/navigation.service';
import { NavigationPathPipe } from './navigation-path.pipe';

describe('NavigationPathPipe', () => {
  let pipe: NavigationPathPipe;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PATHS_STUB],
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new NavigationPathPipe(TestBed.inject(NavigationService));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return path', () => {
    expect(pipe.transform(NAVIGATION_PATHS.home)).toEqual('/');
  });
});
