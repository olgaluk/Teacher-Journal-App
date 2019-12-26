import { Component, OnInit, AfterViewChecked, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentCanDeactivate } from '../../../../guards/exit.subject-detail-page.guard';
import { Observable, SubscriptionLike } from 'rxjs';
import { map } from 'rxjs/operators';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';

import { ModalContentComponent } from '../../../../shared/components/modal-content/modal-content.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';
import { errorMessages } from '../../../../common/constants/errorMessages';
import { paths } from '../../../../common/constants/paths';

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
  updateSelectedTeacher,
} from '../../../../redux/store/subjects/subject-detail/subject-detail.actions';

import {
  selectSelectedSubject,
  selectSelectedTeacher,
  selectStudentListBySubject,
  selectTeachersFromOtherSubjects,
  selectVisibilitySaveButton,
  selectDataSaved,
} from '../../../../redux/store/subjects/subject-detail/subject-detail.selectors';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
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
  messageAboutChanges: string = errorMessages.savingChanges;
  path: string = `/${paths.subjectsTable}`;

  teacher$: Observable<Teacher> = this.store.pipe(select(selectSelectedTeacher));
  subject$: Observable<Subject> = this.store.pipe(select(selectSelectedSubject));
  students$: Observable<Student[]> = this.store.pipe(select(selectStudentListBySubject));
  dates$: Observable<string[]>;
  teachersFromOtherSubjects$: Observable<Teacher[]> = this.store.pipe(select(selectTeachersFromOtherSubjects));
  visibilitySaveButton$: Observable<boolean> = this.store.pipe(select(selectVisibilitySaveButton));
  dataSaved$: Observable<boolean> = this.store.pipe(select(selectDataSaved));

  saved: boolean = true;

  constructor(
    private store: Store<IAppState>,
    private modalService: BsModalService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.teacherId = activateRoute.snapshot.params['teacherId'];
    this.subjectName = activateRoute.snapshot.params['subjectName'];
  }

  ngOnInit(): void {
    this.getInitialInfo(this.subjectName, this.teacherId);
    this.subscription = this.dataSaved$.subscribe(
      ((saved: boolean) => {
        if (saved) {
          this.notification.openNotification();
          if (this.newTeacherId) {
            this.router.navigate([`subjects/${this.subjectName}/${this.newTeacherId}`]);
            this.teacherId = this.newTeacherId;
            this.newTeacherId = '';
            this.bsModalRef.content.itemSelected = '';
          }          
        }
      })
    );

    this.getDates();
  }

  private getInitialInfo(
    subjectName: string,
    teacherId: string,
  ): void {
    this.store.dispatch(getInitialInfo({
      subjectName,
      teacherId,
    }));
  }

  ngAfterViewChecked(): void {
    if (this.bsModalRef &&
      this.bsModalRef.content.itemSelected &&
      this.newTeacherId !== this.bsModalRef.content.itemSelected) {
      Promise.resolve(null).then((value) => {
        this.newTeacherId = this.bsModalRef.content.itemSelected;
        this.store.dispatch(updateSelectedTeacher({ oldTeacherId: this.teacherId, newTeacherId: this.newTeacherId }));
        this.store.dispatch(changeVisibilitySaveButton({ visibility: true }));        
        this.saved = false;
        this.store.dispatch(updateDataSaved({ save: false }));
      })
    }
  }

  canDeactivate(): boolean {
    if (!this.saved) {
      return confirm(this.messageAboutChanges);
    } else {
      return true;
    }
  }

  private getDates(): void {
    this.dates$ = this.students$.pipe(map((students: Student[]) => {
      if (students) {
        let dates: string[] = [];
        students
          .forEach((student: Student) => {
            const marks = student.academicPerformance[this.subjectName].marks;
            const currentDates: string[] = Object.keys(marks);
            dates = dates.concat(currentDates);
          });
        dates = Array.from(new Set(dates));
        if (dates.includes('')) {
          dates.splice(dates.indexOf(''), 1);
          dates = dates
            .map(date => (new Date(date)).getTime())
            .sort((a, b) => a - b)
            .map(date => (new Date(date)).toDateString());
          dates.push('');
        } else {
          dates = dates
            .map(date => (new Date(date)).getTime())
            .sort((a, b) => a - b)
            .map(date => (new Date(date)).toDateString());
        }
        return dates;
      }
    }));
  }

  addColumn(): void {
    this.saved = false;
    this.store.dispatch(updateDataSaved({ save: false }));
    this.store.dispatch(addEmptyDate());
  }

  onChangedDate(newDate: string, oldDate: string): void {
    if (newDate) {
      this.saved = false;
      this.store.dispatch(updateDataSaved({ save: false }));
      this.store.dispatch(changeDate({ newDate, oldDate }));
    }
  }

  onChangeMark(inputMark: string, date: string, studentId: string): void {
    this.store.dispatch(changeMark({
      markValue: inputMark ? +inputMark : null,
      date,
      studentId,
    }));
    this.saved = false;
    this.store.dispatch(updateDataSaved({ save: false }));
  }

  openModalWithComponent(): void {
    this.teachersFromOtherSubjects$
      .subscribe(
        (teachers: Teacher[]) => {
          const initialState = {
            list: teachers,
            title: 'Choose a new teacher:',
            itemSelected: ''
          };
          this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
          this.bsModalRef.content.closeBtnName = 'Close';
        })
      .unsubscribe();
  }

  saveChanges($event: any): void {
    const dates = $event.target.value.split(',');
    if (dates.includes('')) {
      this.templateModalComponent.openModal();
    } else {
      this.saved = true;
      this.store.dispatch(saveChanges({
        subjectName: this.subjectName,
        teacherId: this.teacherId,
      }));
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
