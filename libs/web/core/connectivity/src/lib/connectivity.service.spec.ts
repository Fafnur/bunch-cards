import { TestBed } from '@angular/core/testing';

import { WebConnectivityService } from './connectivity.service';

/**
 * TODO: Add tests
 */
describe('WebConnectivityService', () => {
  let service: WebConnectivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebConnectivityService],
    });
    service = TestBed.inject(WebConnectivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
