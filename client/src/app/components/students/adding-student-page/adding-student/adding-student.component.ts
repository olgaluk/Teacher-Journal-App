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
    private _router: Router,
    private _store: Store<IAppState>
  ) {
    this.name$ = _store.pipe(select(selectName));
    this.lastName$ = _store.pipe(select(selectLastName));
    this.age$ = _store.pipe(select(selectAge));
    this.address$ = _store.pipe(select(selectAddress));
    this.nameInfo$ = _store.pipe(select(selectNameInfo));
    this.lastNameInfo$ = _store.pipe(select(selectLastNameInfo));
    this.ageInfo$ = _store.pipe(select(selectAgeInfo));
    this.addressInfo$ = _store.pipe(select(selectAddressInfo));
    this.newDataSaved$ = _store.pipe(select(selectDataSaved));
    this.correctness$ = _store.pipe(select(selectValuesСorrectness));
  }

  ngOnInit(): void {
    this.subscription = this.newDataSaved$.subscribe(
      ((saved: boolean) => {
        if (saved) {
          this.notification.openNotification();
          setTimeout(() => this._router.navigate(['/students']), 4000);
        }
      })
    );
  }

  changeItemValue(valueItem: any, itemName: string) {
    if (itemName === "name") {
      this._store.dispatch(updateName({ name: valueItem }));
    }
    if (itemName === "lastName") {
      this._store.dispatch(updateLastName({ lastName: valueItem }));
    }
    if (itemName === "age") {
      this._store.dispatch(updateAge({ age: +valueItem }));
    }
    if (itemName === "address") {
      this._store.dispatch(updateAddress({ address: valueItem.trim() }));
    }
  }

  addNewStudent($event: any): void {
    if ($event.target.value === 'true') {
      this._store.dispatch(addNewStudent());
    } else {
      this.templateModalComponent.openModal();
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
