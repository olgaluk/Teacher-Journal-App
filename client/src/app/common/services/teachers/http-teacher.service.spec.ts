import { TestBed } from '@angular/core/testing';

import { HttpTeacherService } from './http-teacher.service';

describe('HttpTeacherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpTeacherService = TestBed.get(HttpTeacherService);
    expect(service).toBeTruthy();
  });
});
