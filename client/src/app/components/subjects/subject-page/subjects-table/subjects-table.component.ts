import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/state/app.state';
import { selectSubjectList } from '../../../../redux/store/selectors/subject.selectors';

import { Subject } from '../../../../common/entities/subject';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent {
  subjects$: Observable<Subject[]>;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router
  ) {
    this.subjects$ = this._store.pipe(select(selectSubjectList));
  }

  navigateToSubject(selectedSubject: Subject) {
    this._router.navigate(['subjects', selectedSubject.name]);
  }
}
