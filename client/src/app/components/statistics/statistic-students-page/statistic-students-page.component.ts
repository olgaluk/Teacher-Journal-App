import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../redux/store/app.state';

import {
  getStudentList,
  reset,
} from '../../../redux/store/students/students-table/students-table.actions';

import {
  selectStudentList
} from '../../../redux/store/students/students-table/students-table.selectors';

import { Student } from '../../../common/entities/student';

@Component({
  selector: 'app-statistic-students-page',
  templateUrl: './statistic-students-page.component.html',
  styleUrls: ['./statistic-students-page.component.scss']
})
export class StatisticStudentsPageComponent implements OnInit, OnDestroy {
  visibilityRatingButton: boolean = false;
  students$: Observable<Student[]> = this.store.pipe(select(selectStudentList));

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.store.dispatch(getStudentList());
  }

  changeVisibilityRating() {
    this.visibilityRatingButton = !this.visibilityRatingButton;
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }
}
