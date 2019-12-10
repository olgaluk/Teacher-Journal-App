import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  updateName,
  updateLastName,
  updateAge,
  updateAddress,
  reset,
  addNewStudent,
} from '../../../../redux/store/students/adding-student/adding-student.actions';

import {
  selectName,
  selectLastName,
  selectAge,
  selectAddress,
  selectNameInfo,
  selectLastNameInfo,
  selectAgeInfo,
  selectAddressInfo,
  selectDataSaved,
  selectValuesСorrectness,
} from '../../../../redux/store/students/adding-student/adding-student.selectors';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';

@Component({
  selector: 'app-adding-student',
  templateUrl: './adding-student.component.html',
  styleUrls: ['./adding-student.component.scss']
})
export class AddingStudentComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  @ViewChild(NotificationSelfClosingComponent, { static: false })
  private notification: NotificationSelfClosingComponent;

  subscription: SubscriptionLike;

  name$: Observable<string> = this.store.pipe(select(selectName));
  lastName$: Observable<string> = this.store.pipe(select(selectLastName));
  age$: Observable<number | null> = this.store.pipe(select(selectAge));
  address$: Observable<string> = this.store.pipe(select(selectAddress));

  nameInfo$: Observable<string> = this.store.pipe(select(selectNameInfo));
  lastNameInfo$: Observable<string> = this.store.pipe(select(selectLastNameInfo));
  ageInfo$: Observable<string> = this.store.pipe(select(selectAgeInfo));
  addressInfo$: Observable<string> = this.store.pipe(select(selectAddressInfo));

  newDataSaved$: Observable<boolean> = this.store.pipe(select(selectDataSaved));
  correctness$: Observable<boolean> = this.store.pipe(select(selectValuesСorrectness));

  constructor(
    private router: Router,
    private store: Store<IAppState>
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
  }

  changeItemValue(valueItem: any, itemName: string) {
    if (itemName === "name") {
      this.store.dispatch(updateName({ name: valueItem }));
    }
    if (itemName === "lastName") {
      this.store.dispatch(updateLastName({ lastName: valueItem }));
    }
    if (itemName === "age") {
      this.store.dispatch(updateAge({ age: +valueItem }));
    }
    if (itemName === "address") {
      this.store.dispatch(updateAddress({ address: valueItem.trim() }));
    }
  }

  addNewStudent($event: any): void {
    if ($event.target.value === 'true') {
      this.store.dispatch(addNewStudent());
    } else {
      this.templateModalComponent.openModal();
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
