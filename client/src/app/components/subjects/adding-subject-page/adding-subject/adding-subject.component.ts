import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  updateSubjectName,
  updateCabinet,
  updateDescription,
  updateSelectedTeachersId,
  getTeacherList,
  addNewSubject,
  reset,
} from '../../../../redux/store/subjects/adding-subject/adding-subject.actions';

import {
  selectSubjectName,
  selectCabinet,
  selectDescription,
  selectTeacherList,
  selectSubjectInfo,
  selectCabinetInfo,
  selectValuesСorrectness,
  selectDataSaved,
} from '../../../../redux/store/subjects/adding-subject/adding-subject.selectors';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';

import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-adding-subject',
  templateUrl: './adding-subject.component.html',
  styleUrls: ['./adding-subject.component.scss']
})
export class AddingSubjectComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  @ViewChild(NotificationSelfClosingComponent, { static: false })
  private notification: NotificationSelfClosingComponent;

  subscription: SubscriptionLike;

  subjectName$: Observable<string>;
  cabinet$: Observable<number | null>;
  description$: Observable<string>;
  teacherList$: Observable<Teacher[]>;

  subjectInfo$: Observable<string>;
  cabinetInfo$: Observable<string>;

  newDataSaved$: Observable<boolean>;
  correctness$: Observable<boolean>;

  constructor(
    private _router: Router,
    private _store: Store<IAppState>
  ) {
    this.subjectName$ = _store.pipe(select(selectSubjectName));
    this.cabinet$ = _store.pipe(select(selectCabinet));
    this.description$ = _store.pipe(select(selectDescription));
    this.teacherList$ = _store.pipe(select(selectTeacherList));
    this.subjectInfo$ = _store.pipe(select(selectSubjectInfo));
    this.cabinetInfo$ = _store.pipe(select(selectCabinetInfo));
    this.newDataSaved$ = _store.pipe(select(selectDataSaved));
    this.correctness$ = _store.pipe(select(selectValuesСorrectness));
  }

  ngOnInit(): void {
    this.getTeachers();
    this.subscription = this.newDataSaved$.subscribe(
      ((saved: boolean) => {
        if (saved) {
          this.notification.openNotification();
          setTimeout(() => this._router.navigate(['/subjects']), 4000);
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.templateModalComponent.openModal();
  }

  getTeachers(): void {
    this._store.dispatch(getTeacherList());
  }

  changeItemValue(valueItem: any, itemName: string) {
    if (itemName === "subject") {
      if (valueItem) valueItem.toLowerCase();
      this._store.dispatch(updateSubjectName({ subjectName: valueItem }));
    }
    if (itemName === "cabinet") {
      this._store.dispatch(updateCabinet({ cabinet: +valueItem }));
    }
    if (itemName === "description") {
      this._store.dispatch(updateDescription({ description: valueItem }));
    }
  }

  onChangeTeacherList(teachersID: string[]): void {
    let newTeachersID: string[];
    teachersID ? newTeachersID = teachersID : newTeachersID = [];
    this._store.dispatch(updateSelectedTeachersId({ selectedTeachersId: newTeachersID }));
  }

  addNewSubject(): void {
    this._store.dispatch(addNewSubject());
  }

  ngOnDestroy(): void {
    this._store.dispatch(reset());
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
