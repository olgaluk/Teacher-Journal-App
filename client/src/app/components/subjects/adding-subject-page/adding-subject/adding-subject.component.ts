import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';

import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  getTeacherList,
  addNewSubject,
  reset,
} from '../../../../redux/store/subjects/adding-subject/adding-subject.actions';

import {
  selectTeacherList,
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

  subjectForm: FormGroup;

  subscription: SubscriptionLike;
  path: string = `/${paths.subjectsTable}`;

  teacherList$: Observable<Teacher[]> = this.store.pipe(select(selectTeacherList));
  newDataSaved$: Observable<boolean> = this.store.pipe(select(selectDataSaved));

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private formBuilder: FormBuilder
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

    this.initForm();
  }

  private initForm(): void {
    this.subjectForm = this.formBuilder.group({
      subjectName: this.formBuilder.group({
        inputValue: [
          null,
          [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
        ]
      }),
      cabinet: this.formBuilder.group({
        inputValue: [
          null,
          [Validators.required, Validators.min(0), Validators.max(30)]
        ]
      }),
      description: this.formBuilder.group({
        inputValue: ''
      }),
      selectedTeachers: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.templateModalComponent.openModal();
  }

  getTeachers(): void {
    this.store.dispatch(getTeacherList());
  }

  addNewSubject(): void {
    const { subjectName, cabinet, description, selectedTeachers } = this.subjectForm.value;

    this.store.dispatch(addNewSubject({
      subjectName: subjectName.inputValue,
      cabinet: +cabinet.inputValue,
      selectedTeachers,
      description: description.inputValue,
    }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
