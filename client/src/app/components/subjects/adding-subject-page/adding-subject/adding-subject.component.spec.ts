import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingSubjectComponent } from './adding-subject.component';

describe('AddingSubjectComponent', () => {
  let component: AddingSubjectComponent;
  let fixture: ComponentFixture<AddingSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
