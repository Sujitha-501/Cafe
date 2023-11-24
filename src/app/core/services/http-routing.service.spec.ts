import { TestBed } from '@angular/core/testing';

import { HttpRoutingService } from './http-routing.service';

describe('HttpRoutingService', () => {
  let service: HttpRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
