import { TestBed } from '@angular/core/testing';

import { HttpSubjectService } from './http-subject.service';

describe('HttpSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpSubjectService = TestBed.get(HttpSubjectService);
    expect(service).toBeTruthy();
  });
});
