import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { GetSubjects, SaveSelectedSubject } from '../../../../redux/store/actions/subject.actions';
import { GetTeachersBySubject } from '../../../../redux/store/actions/teacher.actions';
import { IAppState } from '../../../../redux/store/state/app.state';
import { selectSubjectList } from '../../../../redux/store/selectors/subject.selectors';

import { Subject } from '../../../../common/entities/subject';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit {
  subjects$: Observable<Subject[]>;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router
  ) {
    this.subjects$ = _store.pipe(select(selectSubjectList));
  }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this._store.dispatch(new GetSubjects());
  }

  navigateToSubject(selectedSubject: Subject) {
    this._store.dispatch(new SaveSelectedSubject(selectedSubject));
    this._store.dispatch(new GetTeachersBySubject(selectedSubject.teachersID));
    this._router.navigate(['subjects', selectedSubject.name]);
  }
}
