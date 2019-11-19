import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingStudentComponent } from './adding-student.component';

describe('AddingStudentComponent', () => {
  let component: AddingStudentComponent;
  let fixture: ComponentFixture<AddingStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
