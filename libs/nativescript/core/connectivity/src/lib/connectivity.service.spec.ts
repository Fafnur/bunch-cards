import { TestBed } from '@angular/core/testing';

import { NativescriptConnectivityService } from './connectivity.service';

/**
 * TODO: Add tests
 */
describe('NativescriptConnectivityService', () => {
  let service: NativescriptConnectivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativescriptConnectivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
