import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../common/pipes/pipes.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NotificationSelfClosingComponent } from './notifications/notification-self-closing/notification-self-closing.component';
import { ButtonAddComponent } from './components/button/button-add/button-add.component';
import { InputFormGroupComponent } from './components/form/input-form-group/input-form-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { AppDatepickerComponent } from './components/datepicker/datepicker.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ButtonAddComponent,
    InputFormGroupComponent,
    ModalComponent,
    ModalContentComponent,
    AppDatepickerComponent,
    NotificationSelfClosingComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    BsDatepickerModule,
    BreadcrumbsComponent,
    ButtonAddComponent,
    InputFormGroupComponent,
    ModalComponent,
    ModalContentComponent,
    AppDatepickerComponent,
    NotificationSelfClosingComponent,
  ],
  entryComponents: [ModalContentComponent]
})
export class SharedModule { }
