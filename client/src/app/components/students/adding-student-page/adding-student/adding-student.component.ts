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

  name$: Observable<string>;
  lastName$: Observable<string>;
  age$: Observable<number | null>;
  address$: Observable<string>;

  nameInfo$: Observable<string>;
  lastNameInfo$: Observable<string>;
  ageInfo$: Observable<string>;
  addressInfo$: Observable<string>;

  newDataSaved$: Observable<boolean>;
  correctness$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<IAppState>
  ) {
    this.name$ = store.pipe(select(selectName));
    this.lastName$ = store.pipe(select(selectLastName));
    this.age$ = store.pipe(select(selectAge));
    this.address$ = store.pipe(select(selectAddress));
    this.nameInfo$ = store.pipe(select(selectNameInfo));
    this.lastNameInfo$ = store.pipe(select(selectLastNameInfo));
    this.ageInfo$ = store.pipe(select(selectAgeInfo));
    this.addressInfo$ = store.pipe(select(selectAddressInfo));
    this.newDataSaved$ = store.pipe(select(selectDataSaved));
    this.correctness$ = store.pipe(select(selectValuesСorrectness));
  }

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
