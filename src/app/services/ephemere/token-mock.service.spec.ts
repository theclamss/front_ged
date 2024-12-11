import { TestBed } from '@angular/core/testing';

import { TokenMockServiceService } from './token-mock.service';

describe('TokenMockServiceService', () => {
  let service: TokenMockServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenMockServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
