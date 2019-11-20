import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsTableService } from '../../../../common/services/students/students-table.service';

import { Student } from '../../../../common/entities/student';

import { GetStudents } from '../../../../redux/store/actions/student.actions';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/state/app.state';
import { selectStudentList } from '../../../../redux/store/selectors/student.selectors';

@Component({
  selector: 'students-table-app',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  students: Student[] = [];
  students$: Observable<Student[]>;

  constructor(
    private studentsTableService: StudentsTableService,
    private _store: Store<IAppState>
  ) {
    this.students$ = _store.pipe(select(selectStudentList));
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this._store.dispatch(new GetStudents());
  }

  searchStudents(name: string) {
    const studentsName = name.trim();
    this.students$ = this.studentsTableService.getStudentsByName(studentsName);
  }
}
