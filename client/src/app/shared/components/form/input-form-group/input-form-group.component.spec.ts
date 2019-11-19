import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormGroupComponent } from './input-form-group.component';

describe('InputFormGroupComponent', () => {
  let component: InputFormGroupComponent;
  let fixture: ComponentFixture<InputFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
