import { TestBed } from '@angular/core/testing';

import { SubjectsTableService } from './subjects-table.service';

describe('SubjectsTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectsTableService = TestBed.get(SubjectsTableService);
    expect(service).toBeTruthy();
  });
});
