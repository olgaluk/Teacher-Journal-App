import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectsTableService } from '../../../../common/services/subjects/subjects-table.service';

import { Subject } from '../../../../common/entities/subject';

import { GetSubjects } from '../../../../redux/store/actions/subject.actions';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/state/app.state';
import { selectSubjectList } from '../../../../redux/store/selectors/subject.selectors';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit {
  subjects$: Observable<Subject[]>;

  constructor(
    private subjectsTableService: SubjectsTableService,
    private _store: Store<IAppState>
  ) {
    this.subjects$ = _store.pipe(select(selectSubjectList));
  }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this._store.dispatch(new GetSubjects());
  }
}
