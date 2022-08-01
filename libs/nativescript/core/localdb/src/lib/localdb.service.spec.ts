import { TestBed } from '@angular/core/testing';

import { NativescriptLocalDBService } from './localdb.service';

/**
 * TODO: Add tests
 */
describe('NativescriptLocalDBService', () => {
  let service: NativescriptLocalDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativescriptLocalDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
