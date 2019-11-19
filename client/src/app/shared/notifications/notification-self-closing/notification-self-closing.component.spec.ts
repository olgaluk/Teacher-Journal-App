import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSelfClosingComponent } from './notification-self-closing.component';

describe('NotificationSelfClosingComponent', () => {
  let component: NotificationSelfClosingComponent;
  let fixture: ComponentFixture<NotificationSelfClosingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSelfClosingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSelfClosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
