import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Student } from '../../../../common/entities/student';

import {
  GetStudentsByName
} from '../../../../redux/store/actions/student.actions';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';
import {
  selectStudentList,
  selectSearchedStudents
} from '../../../../redux/store/selectors/student.selectors';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  students$: Observable<Student[]>;

  constructor(
    private _store: Store<IAppState>
  ) {
    this.students$ = _store.pipe(select(selectStudentList));
  }

  searchStudents(name: string) {
    const studentsName = name.trim();
    this._store.dispatch(new GetStudentsByName(studentsName));
    this.students$ = this._store.pipe(select(selectSearchedStudents));
  }
}
