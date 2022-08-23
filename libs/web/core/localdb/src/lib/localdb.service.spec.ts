import { TestBed } from '@angular/core/testing';

import { WebLocalDBService } from './localdb.service';

/**
 * TODO: Add tests
 */
describe('WebLocalDBService', () => {
  let service: WebLocalDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebLocalDBService],
    });
    service = TestBed.inject(WebLocalDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
