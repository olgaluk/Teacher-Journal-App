import { TestBed } from '@angular/core/testing';

import { SubjectInfoService } from './subject-info.service';

describe('SubjectInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectInfoService = TestBed.get(SubjectInfoService);
    expect(service).toBeTruthy();
  });
});
