import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';

import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  updateDataSaved,
  addNewStudent,
} from '../../../../redux/store/students/adding-student/adding-student.actions';

import {
  selectDataSaved,
} from '../../../../redux/store/students/adding-student/adding-student.selectors';

import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';

import { paths } from '../../../../common/constants/paths';

@Component({
  selector: 'app-adding-student',
  templateUrl: './adding-student.component.html',
  styleUrls: ['./adding-student.component.scss']
})
export class AddingStudentComponent implements OnInit, OnDestroy {
  @ViewChild(NotificationSelfClosingComponent, { static: false })
  private notification: NotificationSelfClosingComponent;

  studentForm: FormGroup;

  subscription: SubscriptionLike;
  path: string = `/${paths.studentsTable}`;
  newDataSaved$: Observable<boolean> = this.store.pipe(select(selectDataSaved));

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscription = this.newDataSaved$.subscribe(
      ((saved: boolean) => {
        if (saved) {
          this.notification.openNotification();
          setTimeout(() => this.router.navigate(['/students']), 4000);
        }
      })
    );

    this.initForm();
  }

  private initForm(): void {
    this.studentForm = this.formBuilder.group({
      name: this.formBuilder.group({
        inputValue: [
          null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(15)]
        ]
      }),
      lastName: this.formBuilder.group({
        inputValue: [
          null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(15)]
        ]
      }),
      age: this.formBuilder.group({
        inputValue: [
          null,
          [Validators.required, Validators.min(15), Validators.max(30)]
        ]
      }),
      address: this.formBuilder.group({
        inputValue: [
          null,
          [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
        ]
      }),
    });
  }

  addNewStudent(): void {
    const { name, lastName, age, address } = this.studentForm.value;

    this.store.dispatch(addNewStudent({
      name: name.inputValue,
      lastName: lastName.inputValue,
      age: age.inputValue,
      address: address.inputValue
    }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(updateDataSaved({ dataSaved: false }));
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
