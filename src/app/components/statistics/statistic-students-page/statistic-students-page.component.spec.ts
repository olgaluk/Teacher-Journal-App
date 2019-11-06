import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticStudentsPageComponent } from './statistic-students-page.component';

describe('StatisticStudentsPageComponent', () => {
  let component: StatisticStudentsPageComponent;
  let fixture: ComponentFixture<StatisticStudentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticStudentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticStudentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
