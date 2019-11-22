import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from '../redux/store/state/app.state';
import { GetStudents } from '../redux/store/actions/student.actions';
import { GetSubjects } from '../redux/store/actions/subject.actions';
import { GetTeachers } from '../redux/store/actions/teacher.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Teacher Journal';
  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this._store.dispatch(new GetStudents());
    this._store.dispatch(new GetSubjects());
    this._store.dispatch(new GetTeachers());
  }
}
