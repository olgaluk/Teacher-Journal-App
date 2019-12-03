import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';

import { NavComponent } from './components/panel/nav.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './common/http-interceptors/index';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducers } from './redux/store/reducers/app.reducers';
import { environment } from '../environments/environment';
import { StudentEffects } from './redux/store/effects/student.effects';
import { SubjectEffects } from './redux/store/effects/subject.effects';
import { TeacherEffects } from './redux/store/effects/teacher.effects';
import { SubjectDetailEffects } from './redux/store/subjects/subject-detail/subject-detail.effects';
import { SubjectsTableEffects } from './redux/store/subjects/subjects-table/subjects-table.effects';
import { HttpStudentService } from './common/services/students/http-student.service';
import { HttpSubjectService } from './common/services/subjects/http-subject.service';
import { HttpTeacherService } from './common/services/teachers/http-teacher.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      StudentEffects,
      SubjectEffects,
      TeacherEffects,
      SubjectDetailEffects,
      SubjectsTableEffects,
    ]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    httpInterceptorProviders,
    HttpStudentService,
    HttpSubjectService,
    HttpTeacherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
