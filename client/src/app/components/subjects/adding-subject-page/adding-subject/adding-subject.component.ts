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
import { paths } from '../../../../common/constants/paths';

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
  path: string = paths.subjectsTable;

  subjectName$: Observable<string> = this.store.pipe(select(selectSubjectName));
  cabinet$: Observable<number | null> = this.store.pipe(select(selectCabinet));
  description$: Observable<string> = this.store.pipe(select(selectDescription));
  teacherList$: Observable<Teacher[]> = this.store.pipe(select(selectTeacherList));

  subjectInfo$: Observable<string> = this.store.pipe(select(selectSubjectInfo));
  cabinetInfo$: Observable<string> = this.store.pipe(select(selectCabinetInfo));

  newDataSaved$: Observable<boolean> = this.store.pipe(select(selectDataSaved));
  correctness$: Observable<boolean> = this.store.pipe(select(selectValuesСorrectness));

  constructor(
    private router: Router,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.getTeachers();
    this.subscription = this.newDataSaved$.subscribe(
      ((saved: boolean) => {
        if (saved) {
          this.notification.openNotification();
          setTimeout(() => this.router.navigate(['/subjects']), 4000);
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.templateModalComponent.openModal();
  }

  getTeachers(): void {
    this.store.dispatch(getTeacherList());
  }

  changeItemValue(valueItem: any, itemName: string) {
    if (itemName === "subject") {
      if (valueItem) valueItem.toLowerCase();
      this.store.dispatch(updateSubjectName({ subjectName: valueItem }));
    }
    if (itemName === "cabinet") {
      this.store.dispatch(updateCabinet({ cabinet: +valueItem }));
    }
    if (itemName === "description") {
      this.store.dispatch(updateDescription({ description: valueItem }));
    }
  }

  onChangeTeacherList(teachersID: string[]): void {
    let newTeachersID: string[];
    teachersID ? newTeachersID = teachersID : newTeachersID = [];
    this.store.dispatch(updateSelectedTeachersId({ selectedTeachersId: newTeachersID }));
  }

  addNewSubject(): void {
    this.store.dispatch(addNewSubject());
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
