import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  getStudentList,
  getStudentsByName,
  reset,
} from '../../../../redux/store/students/students-table/students-table.actions';

import {
  selectStudentList
} from '../../../../redux/store/students/students-table/students-table.selectors';

import { Student } from '../../../../common/entities/student';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit, OnDestroy {
  students$: Observable<Student[]>;

  constructor(
    private store: Store<IAppState>
  ) {
    this.students$ = store.pipe(select(selectStudentList));
  }

  ngOnInit(): void {
    this.store.dispatch(getStudentList());
  }

  searchStudents(name: string) {
    const inputName = name.trim();
    this.store.dispatch(getStudentsByName({ inputName }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }
}
