import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFormGroupComponent } from './select-form-group.component';

describe('SelectFormGroupComponent', () => {
  let component: SelectFormGroupComponent;
  let fixture: ComponentFixture<SelectFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
