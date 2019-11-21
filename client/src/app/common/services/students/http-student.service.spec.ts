import { TestBed } from '@angular/core/testing';

import { HttpStudentService } from './http-student.service';

describe('HttpStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpStudentService = TestBed.get(HttpStudentService);
    expect(service).toBeTruthy();
  });
});
