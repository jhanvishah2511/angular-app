import { TestBed } from '@angular/core/testing';

import { FormMultiService } from './form-multi.service';

describe('FormMultiService', () => {
  let service: FormMultiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMultiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
