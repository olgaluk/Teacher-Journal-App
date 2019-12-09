import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { EFFECTS } from './redux/store/app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { appReducers } from './redux/store/app.reducers';
import { environment } from '../environments/environment';

import { HttpStudentService } from './common/services/students/http-student.service';
import { HttpSubjectService } from './common/services/subjects/http-subject.service';
import { HttpTeacherService } from './common/services/teachers/http-teacher.service';

import { SubjectsModule } from './components/subjects/subjects.module';
import { StudentsModule } from './components/students/students.module';
import { StatisticsModule } from './components/statistics/statistics.module';
import { NotFoundPageModule } from './components/not-found/not-found-page.module';
import { SharedModule } from './shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { ExportComponent } from './components/export/export.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ExportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(EFFECTS),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SharedModule,
    SubjectsModule,
    StudentsModule,
    StatisticsModule,
    NotFoundPageModule,
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
