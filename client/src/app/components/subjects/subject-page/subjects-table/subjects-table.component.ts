import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';
import { getSubjectList, reset } from '../../../../redux/store/subjects/subjects-table/subjects-table.actions';
import { selectSubjectList } from '../../../../redux/store/subjects/subjects-table/subjects-table.selectors';

import { Subject } from '../../../../common/entities/subject';

import { paths } from '../../../../common/constants/paths';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit, OnDestroy {
  path: string = `/${paths.addingSubject}`;
  subjects$: Observable<Subject[]> = this.store.pipe(select(selectSubjectList));

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getSubjectList());
  }

  navigateToSubject(subjectName: string) {
    this.router.navigate(['subjects', subjectName]);
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }
}
