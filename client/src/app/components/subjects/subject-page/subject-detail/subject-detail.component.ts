import { Component, OnInit, AfterViewChecked, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentCanDeactivate } from '../../../../guards/exit.subject-detail-page.guard';
import { Observable, SubscriptionLike } from 'rxjs';

import { SubjectInfoService } from '../../../../common/services/subjects/subject-info.service';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';
import { AcademicPerformance } from '../../../../common/entities/academicPerformance';

import { ModalContentComponent } from '../../../../shared/components/modal-content/modal-content.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';
import { MESSAGE_ABOUT_CHANGES } from '../../../../common/constants/message-about-changes';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  getInitialInfo,
  changeVisibilitySaveButton,
  addEmptyDate,
  changeDate,
  changeMark,
  saveChanges,
  reset,
  updateDataSaved,
} from '../../../../redux/store/subjects/subject-detail/subject-detail.actions';

import {
  selectSelectedSubject,
  selectSelectedTeacher,
  selectStudentListBySubject,
  selectDates,
  selectTeachersFromOtherSubjects,
  selectVisibilitySaveButton,
  selectDataSaved,
} from '../../../../redux/store/subjects/subject-detail/subject-detail.selectors';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  providers: [
    SubjectInfoService,
  ],
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, AfterViewChecked, ComponentCanDeactivate, OnDestroy {
  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  @ViewChild(NotificationSelfClosingComponent, { static: false })
  private notification: NotificationSelfClosingComponent;

  bsModalRef: BsModalRef;
  subscription: SubscriptionLike;

  teacherId: string;
  newTeacherId: string;
  subjectName: string;
  messageAboutChanges: string = MESSAGE_ABOUT_CHANGES;

  teacher$: Observable<Teacher>;
  subject$: Observable<Subject>;
  students$: Observable<Student[]>;
  dates$: Observable<string[]>;
  teachersFromOtherSubjects$: Observable<Teacher[]>;
  visibilitySaveButton: Observable<boolean>;

  saved: boolean = true;
  newDataSaved: Observable<boolean>;

  teacherTitle: string;
  itemSelected: string = "";

  constructor(
    private _store: Store<IAppState>,
    private _subjectInfoService: SubjectInfoService,
    private modalService: BsModalService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.teacherId = _activateRoute.snapshot.params['teacherId'];
    this.subjectName = _activateRoute.snapshot.params['subjectName'];

    this.teacher$ = _store.pipe(select(selectSelectedTeacher));
    this.subject$ = _store.pipe(select(selectSelectedSubject));
    this.students$ = _store.pipe(select(selectStudentListBySubject));
    this.dates$ = _store.pipe(select(selectDates));
    this.teachersFromOtherSubjects$ = _store.pipe(select(selectTeachersFromOtherSubjects));
    this.visibilitySaveButton = _store.pipe(select(selectVisibilitySaveButton));
    this.newDataSaved = _store.pipe(select(selectDataSaved));
  }

  ngOnInit(): void {
    this.getInitialInfo(this.subjectName, this.teacherId);
    this.subscription = this.newDataSaved.subscribe(
      ((saved: boolean) => {
        if (saved) {
          this.notification.openNotification();
          this._router.navigate([`subjects/${this.subjectName}/${this.newTeacherId ? this.newTeacherId : this.teacherId}`]);
        }
      })
    );
  }

  getInitialInfo(
    subjectName: string,
    teacherId: string,
  ): void {
    this._store.dispatch(getInitialInfo({
      subjectName,
      teacherId,
    }));
  }

  ngAfterViewChecked(): void {
    if (this.bsModalRef &&
      this.itemSelected !== this.bsModalRef.content.itemSelected &&
      this.bsModalRef.content.itemSelected) {
      Promise.resolve(null).then((value) => {
        let teacherSelected = this.bsModalRef.content.itemSelected;
        this.itemSelected = teacherSelected;
        this.teacherTitle = teacherSelected.split(" (id:")[0];
        let newTeacherId = teacherSelected.split(" (id: ")[1];
        this.newTeacherId = newTeacherId.split(")")[0];
        this._store.dispatch(changeVisibilitySaveButton({ visibility: true }));
        this.saved = false;
        this._store.dispatch(updateDataSaved({ save: false }));
      })
    }
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.saved) {
      return confirm(this.messageAboutChanges);
    } else {
      return true;
    }
  }

  getMark(
    date: string,
    academicPerformance: AcademicPerformance[],
    subjectId: string,
  ): number | null {
    return this._subjectInfoService
      .getMark(date, academicPerformance, this.teacherId, subjectId);
  }

  addColumn(): void {
    this.saved = false;
    this._store.dispatch(updateDataSaved({ save: false }));
    this._store.dispatch(addEmptyDate());
  }

  onChangedDate(newDate: string, count: number): void {
    if (newDate) {
      this.saved = false;
      this._store.dispatch(updateDataSaved({ save: false }));
      this._store.dispatch(changeDate({ newDate, count }));
    }
  }

  onChangeMark(inputMark: string, date: string, studentId: string): void {
    let newMark: number;
    inputMark ? newMark = +inputMark : newMark = null;

    this._store.dispatch(changeMark({
      markValue: newMark,
      date,
      studentId,
    }));
    this.saved = false;
    this._store.dispatch(updateDataSaved({ save: false }));
  }

  openModalWithComponent(): void {
    this.teachersFromOtherSubjects$
      .subscribe(
        (teachers: Teacher[]) => {
          const listNameTeachers = teachers
            .map(teacher => `${teacher.name} ${teacher.lastName} (id: ${teacher.id})`);
          const initialState = {
            list: listNameTeachers,
            title: 'Choose a new teacher:',
            itemSelected: ''
          };
          this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
          this.bsModalRef.content.closeBtnName = 'Close';
        })
      .unsubscribe();
  }

  saveChanges($event): void {
    const dates = $event.target.value.split(',');
    if (dates.includes('')) {
      this.templateModalComponent.openModal();
    } else {
      this.saved = true;
      this._store.dispatch(saveChanges({
        teacherId: this.teacherId,
        newTeacherId: this.newTeacherId,
      }));
      if (this.newTeacherId && this.newTeacherId !== this.teacherId) {
        this.teacherId = this.newTeacherId;
        this.newTeacherId = '';
      };
    }
  }

  ngOnDestroy(): void {
    this._store.dispatch(reset());
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
